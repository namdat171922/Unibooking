# StyleMatch

## Local MongoDB

The backend connects to MongoDB using `backend/.env`:

```env
MONGO_URL="mongodb://localhost:27017"
DB_NAME="stylematch"
```

Start MongoDB locally before starting the backend. If Docker is available:

```powershell
docker compose up -d mongodb
```

Then start the backend from `backend`:

```powershell
python -m uvicorn server:app --host 0.0.0.0 --port 8000 --reload
```

The health endpoint reports database status at:

```text
http://localhost:8000/health
```
