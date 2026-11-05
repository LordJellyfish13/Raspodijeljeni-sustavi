from pathlib import Path

from pydantic import TypeAdapter

from app.models import Car

_CARS_FILE = Path(__file__).parent / "data" / "cars.json"

_cars = sorted(
    TypeAdapter(list[Car]).validate_json(_CARS_FILE.read_bytes()),
    key=lambda car: car.year_start,
)
_cars_by_id = {car.id: car for car in _cars}


def list_cars() -> list[Car]:
    """Return every car, oldest first."""
    return _cars


def get_car(car_id: str) -> Car | None:
    return _cars_by_id.get(car_id)
