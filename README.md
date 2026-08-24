# SP ADDA

Landing app: welcome video, then logos, then contact.

Production URL: **https://www.spaddaa.com** (domain: **spaddaa.com**).

## Local run

1. Start PostgreSQL: `docker compose up -d` (host port **5433**).
2. Backend (Java 17+), from `backend/`:
   - `mvn spring-boot:run`, or
   - `.\mvnw.cmd spring-boot:run` on Windows
3. Frontend: `cd frontend && npm install && npm run dev`
4. Open http://localhost:5173

The Vite dev server proxies `/api` and `/media` to `http://localhost:8080`.

## Production (free): Neon + Render + GoDaddy

The live site is **one Spring Boot process**: React build + `/api` + `/media` + Postgres. Same-origin, so the frontend keeps using `fetch("/api/brand")`.

Render’s free web service **sleeps when idle**. The first visit after idle can take 30–60 seconds.

You must create the Neon and Render accounts and add DNS in GoDaddy. The repo cannot log into those dashboards for you.

### 1. Push this repo to GitHub

Render deploys from Git. Create a GitHub repository and push this project (include `backend/src/main/resources/static/media`).

### 2. Neon (free Postgres)

1. Sign up at [https://neon.tech](https://neon.tech) and create a project (region close to India if offered).
2. Create a database (any name; Flyway creates the `brand` table).
3. From the connection dialog, copy:
   - Host, database, user, password
4. JDBC URL (add `sslmode=require`):

```text
jdbc:postgresql://YOUR_HOST/YOUR_DB?sslmode=require
```

You will paste this URL plus username and password into Render.

### 3. Render (free Docker web service)

1. Sign up at [https://render.com](https://render.com) with GitHub.
2. **New** → **Blueprint** and select this repo (`render.yaml`), **or** **New Web Service** → this repo → **Docker**.
3. Dockerfile path: `./Dockerfile` (repo root).
4. Set environment variables (do not commit these):

| Key | Value |
|---|---|
| `SPRING_DATASOURCE_URL` | Neon JDBC URL with `sslmode=require` |
| `SPRING_DATASOURCE_USERNAME` | Neon user |
| `SPRING_DATASOURCE_PASSWORD` | Neon password |

5. Health check path: `/api/health`
6. Deploy. When it is live, open `https://YOUR-SERVICE.onrender.com/api/health` — it should return `ok`.
7. **Settings → Custom Domains** → add `www.spaddaa.com` and `spaddaa.com`. Render will show the exact CNAME/A records.

### 4. GoDaddy DNS (keep email)

In GoDaddy → **spaddaa.com** → **DNS**.

**Do not change MX (or email SPF/DKIM TXT) records.** Those are for Professional Email.

Add or edit **only** website records as Render shows. Typical pattern:

| Type | Name | Value | Purpose |
|---|---|---|---|
| CNAME | `www` | `YOUR-SERVICE.onrender.com` | https://www.spaddaa.com |
| A or ALIAS | `@` | Render’s IPs / ALIAS target | https://spaddaa.com |

TTL can stay default. Wait until Render shows SSL **Issued** (often 15 minutes to a few hours).

Then open **https://www.spaddaa.com**. You should see the welcome video, then logos, then contact.

### 5. Checks

- `https://www.spaddaa.com` and `https://spaddaa.com` load the app
- `https://www.spaddaa.com/api/health` returns `ok`
- Video and logos load over HTTPS
- Phone / Instagram / YouTube links still work
- GoDaddy email still receives mail (MX unchanged)

## Docker (optional local production image)

From the repo root (Postgres must be reachable, or override datasource env vars):

```bash
docker build -t spadda .
```
