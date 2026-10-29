# Backend App (Express.js REST API)

Jednostavan REST API za zadatke. Podaci se drze u memoriji, pa se resetiraju pri svakom restartu servera.

## Endpointi

| Metoda | Putanja          | Opis                                |
| ------ | ---------------- | ----------------------------------- |
| GET    | `/api/health`    | Status servera                      |
| GET    | `/api/tasks`     | Svi zadaci                          |
| GET    | `/api/tasks/:id` | Jedan zadatak                       |
| POST   | `/api/tasks`     | Novi zadatak, body `{ "text": "" }` |
| PATCH  | `/api/tasks/:id` | Izmjena, body `{ "done": true }`    |
| DELETE | `/api/tasks/:id` | Brisanje zadatka                    |
| DELETE | `/api/tasks`     | Brisanje svih zavrsenih zadataka    |

## Lokalno

```bash
npm install
npm run dev   # http://localhost:3000
```

## Deploy na Render.com (Web Service)

| Postavka          | Vrijednost                   |
| ----------------- | ---------------------------- |
| Root Directory    | `vjezbe/vjezbe1/backend_app` |
| Runtime           | Node                         |
| Build Command     | `npm install`                |
| Start Command     | `npm start`                  |
| Health Check Path | `/api/health`                |

Environment varijable (opcionalno):

| Kljuc          | Vrijednost                                                     |
| -------------- | -------------------------------------------------------------- |
| `NODE_VERSION` | `22`                                                           |
| `CORS_ORIGIN`  | URL frontenda, npr. `https://rs-vjezba1-frontend.onrender.com` |
