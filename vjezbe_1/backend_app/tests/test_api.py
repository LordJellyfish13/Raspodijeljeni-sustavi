from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_cars_are_listed_oldest_first():
    response = client.get("/api/cars")

    assert response.status_code == 200
    years = [car["year_start"] for car in response.json()]
    assert years == sorted(years)


def test_car_ids_are_unique():
    ids = [car["id"] for car in client.get("/api/cars").json()]

    assert len(ids) == len(set(ids))


def test_get_one_car():
    response = client.get("/api/cars/ek9")

    assert response.status_code == 200
    assert response.json()["engine"] == "1.6 L B16B inline-4"


def test_unknown_car_returns_404():
    response = client.get("/api/cars/not-a-honda")

    assert response.status_code == 404
    assert response.json() == {"detail": "No car with id 'not-a-honda'"}


def test_cors_allows_the_frontend():
    response = client.get("/api/cars", headers={"Origin": "http://localhost:5173"})

    assert response.headers["access-control-allow-origin"] == "http://localhost:5173"


def test_cors_ignores_other_sites():
    response = client.get("/api/cars", headers={"Origin": "https://example.com"})

    assert "access-control-allow-origin" not in response.headers
