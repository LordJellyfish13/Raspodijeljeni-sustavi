from pydantic import BaseModel, ConfigDict


class Car(BaseModel):
    """One exhibit in the museum."""

    # Reject unknown fields so a typo in cars.json fails at startup, not silently.
    model_config = ConfigDict(extra="forbid")

    id: str
    name: str
    year_start: int
    year_end: int
    tagline: str
    summary: str
    variant: str  # The specific version the specs describe.
    engine: str
    power_hp: int
    layout: str
    length_mm: int
    image: str  # A path served by the frontend, such as /images/cars/s800.jpg, or a full URL.
