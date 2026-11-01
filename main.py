from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.api.v1 import multimodal
from app.core.config import settings
from app.core.exceptions import AppError, app_error_handler, unhandled_exception_handler

app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0",
    description="AgriGPT backend - Auth + Farms + Soil + Multimodal AI + 3D Simulation",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_exception_handler(AppError, app_error_handler)
app.add_exception_handler(Exception, unhandled_exception_handler)

app.include_router(api_router)
app.include_router(multimodal.root_router)


@app.get("/health", tags=["health"])
async def health_check() -> dict[str, str]:
    return {"status": "ok"}
