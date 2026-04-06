from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.targets import router as targets_router
from app.routes.stats import router as stats_router
from app.routes.scan import router as scan_router
from app.routes.activity import router as activity_router

app = FastAPI()

# Disable CORS. Do not remove this for full-stack development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(targets_router)
app.include_router(stats_router)
app.include_router(scan_router)
app.include_router(activity_router)


@app.get("/healthz")
async def healthz():
    return {"status": "ok"}
