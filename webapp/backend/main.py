from fastapi import FastAPI, UploadFile, File, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from redis_config import redis_client, set_cache, get_cache, delete_cache, set_telemetry, get_all_telemetry
from sqlite_config import (
    init_db, insert_image, get_image_by_id,
    insert_command, get_latest_commands
)
from fastapi.responses import StreamingResponse
from contextlib import asynccontextmanager
import asyncio
import math
import random
import io
import os

_fake_uptime = 0

 #
async def _fake_telemetry_loop():
    global _fake_uptime
    while True:
        _fake_uptime += 5
        t = _fake_uptime

        # random battery
        battery = round(85 - (t / 7200) * 10 + math.sin(t / 180) * 3 + random.uniform(-0.3, 0.3), 1)
        battery = max(0.0, min(100.0, battery))

        # randome elevation time
        elevation = round(420 + math.sin(t / 600) * 15 + random.uniform(-0.2, 0.2), 2)

        # random temperature
        temperature = round(12 + math.sin(t / 300) * 28 + random.uniform(-1, 1), 1)

        # signal strength
        signal_rssi = round(-88 + random.uniform(-7, 7), 1)

        set_telemetry("battery", battery)
        set_telemetry("elevation", elevation)
        set_telemetry("temperature", temperature)
        set_telemetry("signal_rssi", signal_rssi)
        set_telemetry("uptime_seconds", t)

        await asyncio.sleep(5)

@asynccontextmanager
async def lifespan(app: FastAPI):
    task = asyncio.create_task(_fake_telemetry_loop())
    yield
    task.cancel()

app = FastAPI(title="PVDX Mission Control Backend", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

# models

class CacheItem(BaseModel):
    key: str
    value: str
    expire_seconds: int = 3600

class CommandItem(BaseModel):
    command: str

# root + health

@app.get("/")
async def root():
    return {"message": "PVDX Mission Control Backend", "status": "running"}

@app.get("/health")
async def health_check():
    health = {"status": "alive"}

    # check redis
    try:
        redis_client.ping()
        health["redis"] = "connected"
    except Exception as e:
        health["redis"] = f"error: {str(e)}"

    # check sqlite
    try:
        init_db()
        health["sqlite"] = "connected"
    except Exception as e:
        health["sqlite"] = f"error: {str(e)}"

    return health

# cache

@app.post("/cache/set")
async def set_cache_endpoint(item: CacheItem):
    result = set_cache(item.key, item.value, item.expire_seconds)
    return {"message": f"Cache set for key '{item.key}'", "success": bool(result)}

@app.get("/cache/get/{key}")
async def get_cache_endpoint(key: str):
    value = get_cache(key)
    if value is None:
        return {"key": key, "value": None, "message": "Key not found"}
    return {"key": key, "value": value}

@app.delete("/cache/delete/{key}")
async def delete_cache_endpoint(key: str):
    result = delete_cache(key)
    return {"message": f"Cache deleted for key '{key}'", "success": bool(result)}

# telemetry

@app.get("/telemetry")
async def get_telemetry():
    data = get_all_telemetry()
    stale = any(v is None for v in data.values())
    return {"telemetry": data, "stale": stale}

@app.post("/dev/seed-telemetry")
async def seed_telemetry():
    global _fake_uptime
    _fake_uptime = 0
    set_telemetry("battery", 85.0)
    set_telemetry("elevation", 420.0)
    set_telemetry("temperature", 12.0)
    set_telemetry("signal_rssi", -88.0)
    set_telemetry("uptime_seconds", 0)
    return {"message": "Telemetry seeded with initial values"}

# bitmap upload (raw bytes from canvas)

@app.post("/upload")
async def upload_bitmap(request: Request):
    data = await request.body()
    if len(data) != 16384:
        raise HTTPException(status_code=400, detail=f"Expected 16384 bytes, got {len(data)}")
    insert_image("canvas.bin", data)
    return {"message": "Bitmap uploaded", "bytes": len(data)}

# images

@app.post("/images/upload")
async def upload_image(file: UploadFile = File(...)):
    contents = await file.read()
    try:
        insert_image(file.filename, contents)
        return {"filename": file.filename, "message": "Image uploaded"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/images/{image_id}")
async def get_image(image_id: int):
    result = get_image_by_id(image_id)
    if not result:
        raise HTTPException(status_code=404, detail="Image not found")
    _, name, data, timestamp = result
    return StreamingResponse(io.BytesIO(data), media_type="application/octet-stream", headers={"Content-Disposition": f"inline; filename={name}"})

# commands

@app.post("/commands/send")
async def send_command(command_item: CommandItem):
    insert_command(command_item.command)
    return {"message": f"Command '{command_item.command}' stored"}

@app.get("/commands/latest")
async def latest_commands(limit: int = 10):
    return {"commands": get_latest_commands(limit)}

def main():
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    main()
