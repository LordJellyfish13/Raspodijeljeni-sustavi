# Frontend App (Vue.js + Vite)

Vue 3 aplikacija: provjera statusa API-ja, brojac klikova i to-do lista koja radi preko REST API-ja. Build generira staticni sadrzaj u `dist/` (`dist/index.html` + `dist/assets/`).

## Lokalno

```bash
npm install
npm run dev      # razvojni server (backend mora raditi na http://localhost:3000)
npm run build    # generira dist/
npm run preview  # posluzuje dist/ lokalno
```

## Deploy na Render.com (Static Site)

| Postavka          | Vrijednost                     |
| ----------------- | ------------------------------ |
| Root Directory    | `vjezbe/vjezbe1/frontend_app`  |
| Build Command     | `npm install && npm run build` |
| Publish Directory | `dist`                         |

Environment varijable:

| Kljuc          | Vrijednost                                                     |
| -------------- | -------------------------------------------------------------- |
| `VITE_API_URL` | URL backenda, npr. `https://rs-vjezba1-backend.onrender.com`   |
| `NODE_VERSION` | `22`                                                           |

`VITE_API_URL` se ugraduje u kod u trenutku builda, pa nakon promjene treba pokrenuti novi deploy
(Manual Deploy -> Clear build cache & deploy).

Pod **Redirects/Rewrites** dodaj pravilo: Source `/*`, Destination `/index.html`, Action `Rewrite`.
