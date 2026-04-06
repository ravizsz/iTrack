import random
import time

from fastapi import APIRouter

from app.data.targets import ACTIVITIES

router = APIRouter(prefix="/api")


@router.get("/activity-feed")
async def activity_feed():
    shuffled = ACTIVITIES.copy()
    random.shuffle(shuffled)
    return {"activities": shuffled[:8], "timestamp": time.time()}
