# Vjezba 1 - Vue.js + Express na Render.com

- [`backend_app/`](backend_app) - Express REST API (Render **Web Service**)
- [`frontend_app/`](frontend_app) - Vue 3 + Vite aplikacija (Render **Static Site**)

## Pokretanje lokalno

```bash
# terminal 1
cd backend_app && npm install && npm run dev

# terminal 2
cd frontend_app && npm install && npm run dev
```

## Deploy na Render

**Varijanta A - Blueprint (sve odjednom):** Render Dashboard -> New -> Blueprint -> odaberi repozitorij.
Render procita [`render.yaml`](../../render.yaml) iz roota repozitorija i kreira oba servisa.
Kad pita za `VITE_API_URL`, upisi `https://rs-vjezba1-backend.onrender.com`
(ili stvarni URL backenda ako je ime zauzeto, pa ponovno deployaj frontend).

**Varijanta B - rucno:** prvo kreiraj backend (Web Service), kopiraj njegov URL, zatim kreiraj
frontend (Static Site) s `VITE_API_URL` postavljenim na taj URL. Postavke su u README-ima podmapa.

> Besplatni Web Service se uspava nakon ~15 min neaktivnosti, pa prvi zahtjev moze trajati i do minute.
