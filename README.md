<<<<<<< HEAD
# Blood_Donor_Club
=======
# 🩸 RoktoDao — Blood Donor Group Website

A non-profit blood donor community website. One-page React + Vite frontend, Go (Gin + GORM) API backend, MySQL database (Aiven free tier).

---

## 🧱 Stack

| Layer    | Tech                          | Free Hosting              |
|----------|-------------------------------|---------------------------|
| Frontend | React 18 + Vite               | **Vercel**                |
| API      | Go 1.21 + Gin + GORM          | **Railway**               |
| Database | MySQL 8                       | **Aiven** (1 GB free)     |

---

## 📁 Project Structure

```
blood-donor-site/
├── backend/                  # Go API
│   ├── main.go               # Entry point
│   ├── config/database.go    # MySQL connection
│   ├── models/               # Donor, BloodRequest structs
│   ├── handlers/             # HTTP handlers
│   ├── database/schema.sql   # Optional raw SQL
│   ├── .env.example
│   └── go.mod
└── frontend/                 # React + Vite
    ├── src/
    │   ├── App.jsx           # Main page (one-pager)
    │   ├── api.js            # Axios setup
    │   └── components/       # Hero, Stats, Forms, etc.
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🚀 Run Locally (Step-by-Step)

### 1. Get free MySQL on Aiven
1. Go to https://aiven.io/mysql → "Start for free" (no credit card)
2. Create a MySQL service on the free tier (region: `ap-southeast-1` for Bangladesh)
3. Wait ~2 min for provisioning
4. Click your service → copy **Host, Port, User, Password, Database name**

### 2. Run the backend

```bash
cd backend
cp .env.example .env
# Edit .env and paste your Aiven credentials

go mod tidy 
go run main.go
```

The API starts at `http://localhost:8080`. Test it:
```bash
curl http://localhost:8080/api/health
# → {"status":"ok","service":"blood-donor-api"}
```

### 3. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` — you should see the full site, and the frontend will proxy `/api/*` to your Go backend.

---

## 🌐 Deploy to Free Hosting

### Backend → Railway (free $5 credit / month)

1. Push your code to GitHub
2. Go to https://railway.app → "New Project" → "Deploy from GitHub"
3. Select the repo, set **Root Directory** to `backend`
4. Add environment variables in Railway dashboard:
   - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_SSL_MODE=true`
   - `CORS_ORIGINS` = your Vercel URL (set after frontend deploy)
5. Railway auto-detects Go and deploys. Copy the public URL: `https://xxx.up.railway.app`

### Frontend → Vercel (free)

1. Go to https://vercel.com → "New Project" → import the same repo
2. Set **Root Directory** to `frontend`, Framework: "Vite"
3. Add env var: `VITE_API_BASE` = your Railway API URL
4. Deploy. You'll get `https://xxx.vercel.app`

### Wire them up
- After Vercel deploys, go back to **Railway** → set `CORS_ORIGINS` = your Vercel URL
- That's it — your non-profit site is live.

---

## 🔌 API Reference

| Method | Endpoint                       | Description                     |
|--------|--------------------------------|---------------------------------|
| GET    | `/api/health`                  | Health check                    |
| GET    | `/api/donors?blood_group=A+`   | List donors (filterable)        |
| GET    | `/api/donors/:id`              | Get one donor                   |
| POST   | `/api/donors`                  | Register a donor                |
| PUT    | `/api/donors/:id`              | Update a donor                  |
| DELETE | `/api/donors/:id`              | Remove a donor                  |
| GET    | `/api/requests?blood_group=B+` | List open blood requests        |
| POST   | `/api/requests`                | Post a blood request            |
| PUT    | `/api/requests/:id/status`     | Update request status           |
| DELETE | `/api/requests/:id`            | Remove a request                |
| GET    | `/api/stats`                   | Dashboard counts                |

---

## 🛠 Troubleshooting

- **"connection refused"** → check `DB_HOST` and `DB_PORT` in `.env` (Aiven uses non-standard port like 21581)
- **"certificate verify failed"** → make sure `DB_SSL_MODE=true` (required by Aiven)
- **CORS error in browser** → set `CORS_ORIGINS` in backend env to your frontend URL
- **Frontend can't reach API in prod** → make sure `VITE_API_BASE` is set in Vercel env, then redeploy
- **Migration failed** → log into Aiven console and run the SQL in `backend/database/schema.sql` manually

---

## 📜 License

>>>>>>> 220368c (Initial upload from local machine)
Free to use for humanitarian / non-profit causes. No warranty.
"# Blood_donor_Club" 
