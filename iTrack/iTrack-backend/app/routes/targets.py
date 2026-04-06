import time

from fastapi import APIRouter

from app.data.targets import MOCK_TARGETS

router = APIRouter(prefix="/api")


@router.get("/targets")
async def get_targets():
    targets_summary = []
    for t in MOCK_TARGETS:
        targets_summary.append({
            "id": t["id"],
            "codename": t["codename"],
            "name": t["name"],
            "threat_level": t["threat_level"],
            "status": t["status"],
            "lat": t["lat"],
            "lng": t["lng"],
            "city": t["city"],
            "last_seen": t["last_seen"],
            "connections": t["connections"],
            "data_points": t["data_points"],
        })
    return {"targets": targets_summary, "timestamp": time.time()}


@router.get("/targets/{target_id}")
async def get_target(target_id: str):
    for t in MOCK_TARGETS:
        if t["id"] == target_id:
            return {"target": t, "timestamp": time.time()}
    return {"error": "Target not found"}
