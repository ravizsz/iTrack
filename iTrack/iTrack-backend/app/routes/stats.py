import random
import time

from fastapi import APIRouter

from app.data.targets import GLOBAL_STATS

router = APIRouter(prefix="/api")


@router.get("/stats")
async def get_stats():
    return {
        "stats": GLOBAL_STATS,
        "system_load": round(random.uniform(40, 85), 1),
        "cpu_usage": round(random.uniform(30, 70), 1),
        "memory_usage": round(random.uniform(50, 80), 1),
        "network_throughput": f"{round(random.uniform(100, 900), 1)} Mbps",
        "timestamp": time.time(),
    }
