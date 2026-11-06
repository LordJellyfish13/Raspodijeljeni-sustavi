import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse

from app.catalog import get_car, list_cars
from app.models import Car


def _allowed_origins() -> list[str]:
    """Read the frontend origins allowed to call this API from CORS_ORIGINS (comma-separated)."""
    raw = os.environ.get("CORS_ORIGINS", "http://localhost:5173")
    return [origin.strip().rstrip("/") for origin in raw.split(",") if origin.strip()]


app = FastAPI(
    title="The Little Honda Museum API",
    description="The collection behind the museum: iconic Honda road cars and their specs.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins(),
    allow_methods=["GET"],
)


@app.get("/", include_in_schema=False)
def root() -> RedirectResponse:
    return RedirectResponse("/docs")


@app.get("/health", tags=["meta"], summary="Report that the service is up")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/cars", tags=["cars"], summary="List every car, oldest first")
def read_cars() -> list[Car]:
    return list_cars()


@app.get(
    "/api/cars/{car_id}",
    tags=["cars"],
    summary="Get one car",
    responses={404: {"description": "No car has that id"}},
)
def read_car(car_id: str) -> Car:
    car = get_car(car_id)
    if car is None:
        raise HTTPException(status_code=404, detail=f"No car with id '{car_id}'")
    return car
