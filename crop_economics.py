import uuid
from datetime import datetime

from sqlalchemy import CheckConstraint, DateTime, Float, ForeignKey, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base
from app.core.db_types import GUID


class CropEconomics(Base):
    """
    Per-hectare cost/yield/price reference data for a crop, used by
    economics_service to estimate cultivation cost, revenue and profit for
    a specific farm. One row per crop (optional - not every crop needs to
    have economics data yet).

    All figures are general, illustrative reference values (see seed script),
    not region-specific market data or a financial guarantee.
    """

    __tablename__ = "crop_economics"
    __table_args__ = (
        CheckConstraint("seed_cost_per_ha >= 0", name="ck_econ_seed_cost_nonneg"),
        CheckConstraint("fertilizer_cost_per_ha >= 0", name="ck_econ_fertilizer_cost_nonneg"),
        CheckConstraint("labor_cost_per_ha >= 0", name="ck_econ_labor_cost_nonneg"),
        CheckConstraint("irrigation_cost_per_ha >= 0", name="ck_econ_irrigation_cost_nonneg"),
        CheckConstraint("other_cost_per_ha >= 0", name="ck_econ_other_cost_nonneg"),
        CheckConstraint("expected_yield_per_ha >= 0", name="ck_econ_yield_nonneg"),
        CheckConstraint("market_price_per_unit >= 0", name="ck_econ_price_nonneg"),
    )

    id: Mapped[uuid.UUID] = mapped_column(GUID(), primary_key=True, default=uuid.uuid4)
    crop_id: Mapped[uuid.UUID] = mapped_column(
        GUID(), ForeignKey("crops.id", ondelete="CASCADE"), unique=True, nullable=False, index=True
    )

    seed_cost_per_ha: Mapped[float] = mapped_column(Float, nullable=False, default=0)
    fertilizer_cost_per_ha: Mapped[float] = mapped_column(Float, nullable=False, default=0)
    labor_cost_per_ha: Mapped[float] = mapped_column(Float, nullable=False, default=0)
    irrigation_cost_per_ha: Mapped[float] = mapped_column(Float, nullable=False, default=0)
    other_cost_per_ha: Mapped[float] = mapped_column(Float, nullable=False, default=0)

    expected_yield_per_ha: Mapped[float] = mapped_column(Float, nullable=False)
    yield_unit: Mapped[str] = mapped_column(String(30), nullable=False, default="quintal")
    market_price_per_unit: Mapped[float] = mapped_column(Float, nullable=False)
    currency: Mapped[str] = mapped_column(String(10), nullable=False, default="INR")

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    crop: Mapped["Crop"] = relationship()
