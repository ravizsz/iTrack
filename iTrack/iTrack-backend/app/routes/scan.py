import random
import time

from fastapi import APIRouter

from app.data.targets import MOCK_TARGETS

router = APIRouter(prefix="/api")


@router.get("/scan")
async def scan_query(q: str = ""):
    scan_types = ["PHONE", "EMAIL", "FACIAL", "VOICE", "BEHAVIORAL", "NETWORK"]
    results = []
    for scan in scan_types:
        results.append({
            "type": scan,
            "status": random.choice(["MATCH", "PARTIAL", "NO_MATCH", "SCANNING"]),
            "confidence": round(random.uniform(20, 99), 1),
            "data_sources": random.randint(2, 15),
            "time_ms": random.randint(50, 2000),
        })
    matched_target = random.choice(MOCK_TARGETS) if q else None
    return {
        "query": q or "N/A",
        "scan_results": results,
        "matched_target": {
            "id": matched_target["id"],
            "codename": matched_target["codename"],
            "name": matched_target["name"],
            "city": matched_target["city"],
            "confidence": round(random.uniform(70, 99), 1),
        } if matched_target else None,
        "timestamp": time.time(),
    }
