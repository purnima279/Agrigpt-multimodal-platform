from collections.abc import AsyncGenerator

import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.pool import StaticPool

from app.core.database import Base, get_db
from app.main import app

# Tests run against an in-memory SQLite DB so no real Postgres is required.
# (The app itself always targets Postgres via DATABASE_URL; this is test-only.)
TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"

engine = create_async_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestSessionLocal = async_sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)


@pytest_asyncio.fixture(autouse=True)
async def setup_db() -> AsyncGenerator[None, None]:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


async def override_get_db() -> AsyncGenerator[AsyncSession, None]:
    async with TestSessionLocal() as session:
        yield session


app.dependency_overrides[get_db] = override_get_db


@pytest_asyncio.fixture
async def client() -> AsyncGenerator[AsyncClient, None]:
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


@pytest_asyncio.fixture
async def seeded_crops() -> AsyncGenerator[list, None]:
    """Inserts a small set of crops directly into the test DB for crop/recommendation tests."""
    from app.models.crop import Crop

    crops_data = [
        dict(
            name="Wheat", category="cereal", suitable_soil_types="loamy,clay loam",
            min_ph=6.0, max_ph=7.5, water_requirement="medium", growing_duration_days=120,
            temperature_min=10, temperature_max=25, rainfall_min=300, rainfall_max=900,
            nitrogen_requirement_kg_ha=120, phosphorus_requirement_kg_ha=60, potassium_requirement_kg_ha=40,
        ),
        dict(
            name="Rice", category="cereal", suitable_soil_types="clay,clay loam",
            min_ph=5.5, max_ph=6.5, water_requirement="high", growing_duration_days=130,
            temperature_min=20, temperature_max=35, rainfall_min=1000, rainfall_max=2000,
            nitrogen_requirement_kg_ha=100, phosphorus_requirement_kg_ha=50, potassium_requirement_kg_ha=50,
        ),
        dict(
            name="Chickpea", category="pulse", suitable_soil_types="loamy,sandy loam",
            min_ph=6.0, max_ph=7.5, water_requirement="low", growing_duration_days=100,
            temperature_min=10, temperature_max=30, rainfall_min=300, rainfall_max=650,
            nitrogen_requirement_kg_ha=20, phosphorus_requirement_kg_ha=40, potassium_requirement_kg_ha=20,
        ),
    ]

    async with TestSessionLocal() as session:
        objs = [Crop(**data) for data in crops_data]
        session.add_all(objs)
        await session.commit()
        for obj in objs:
            await session.refresh(obj)
        yield objs


@pytest_asyncio.fixture
async def seeded_diseases(seeded_crops) -> AsyncGenerator[list, None]:
    """Inserts common crop diseases linked to seeded crops."""
    from app.models.disease import CropDisease

    wheat = next(c for c in seeded_crops if c.name == "Wheat")
    rice = next(c for c in seeded_crops if c.name == "Rice")

    diseases_data = [
        dict(
            crop_id=wheat.id,
            name="Wheat Rust",
            symptoms="orange, reddish, brown, yellow pustules powdery spots on leaves and stems",
            likely_causes="fungal infection, favored by humid mild weather",
            basic_solution="Use rust-resistant varieties; apply a recommended fungicide early; remove volunteer plants.",
            severity="high",
        ),
        dict(
            crop_id=rice.id,
            name="Rice Blast",
            symptoms="diamond shaped gray lesions spots on leaves, neck rot, wilting",
            likely_causes="fungal infection, spread by wind and rain, worsened by excess nitrogen",
            basic_solution="Avoid excess nitrogen; use resistant varieties; apply fungicide if severe.",
            severity="high",
        ),
    ]

    async with TestSessionLocal() as session:
        objs = [CropDisease(**data) for data in diseases_data]
        session.add_all(objs)
        await session.commit()
        for obj in objs:
            await session.refresh(obj)
        yield objs

