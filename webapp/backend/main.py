from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from redis_config import redis_client, set_cache, get_cache, delete_cache
from sqlite_config import (
    init_db, insert_image, get_image_by_id,
    insert_command, get_latest_commands
)
from fastapi.responses import StreamingResponse
import io
import os

app = FastAPI(title="PVDX Mission Control Backend", version="1.0.0")

init_db()

# ----------- Models -----------

class CacheItem(BaseModel):
    key: str
    value: str
    expire_seconds: int = 3600

class CommandItem(BaseModel):
    command: str

# ----------- Root & Health -----------

@app.get("/")
async def root():
    return {"message": "PVDX Mission Control Backend", "status": "running"}

@app.get("/health")
async def health_check():
    health = {"status": "alive"}
    
    # Redis health check
    try:
        redis_client.ping()
        health["redis"] = "connected"
    except Exception as e:
        health["redis"] = f"error: {str(e)}"
    
    # SQLite health check
    try:
        init_db()
        health["sqlite"] = "connected"
    except Exception as e:
        health["sqlite"] = f"error: {str(e)}"
    
    return health

# ----------- Redis Cache Endpoints -----------

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

# ----------- SQLite Image Endpoints -----------

@app.post("/images/upload")
async def upload_image(file: UploadFile = File(...)):
    """Upload image to SQLite as BLOB."""
    contents = await file.read()
    try:
        insert_image(file.filename, contents)
        return {"filename": file.filename, "message": "Image uploaded"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/images/{image_id}")
async def get_image(image_id: int):
    """Retrieve image by ID."""
    result = get_image_by_id(image_id)
    if not result:
        raise HTTPException(status_code=404, detail="Image not found")
    _, name, data, timestamp = result
    return StreamingResponse(io.BytesIO(data), media_type="application/octet-stream", headers={"Content-Disposition": f"inline; filename={name}"})

# ----------- SQLite Command Endpoints -----------

@app.post("/commands/send")
async def send_command(command_item: CommandItem):
    """Store command in SQLite."""
    insert_command(command_item.command)
    return {"message": f"Command '{command_item.command}' stored"}

@app.get("/commands/latest")
async def latest_commands(limit: int = 10):
    """Get latest N commands."""
    return {"commands": get_latest_commands(limit)}

# ----------- App Entrypoint -----------

def main():
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    main()
