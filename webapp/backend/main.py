from fastapi import FastAPI
from redis_config import redis_client, set_cache, get_cache, delete_cache
from pydantic import BaseModel


# Create FastAPI app
app = FastAPI(title="PVDX Mission Control Backend", version="1.0.0")

class CacheItem(BaseModel):
    """Place holder, structure data for the cache later on"""
    key: str
    value: str
    expire_seconds: int = 3600

@app.get("/")
async def root():
    """Root endpoint."""
    return {"message": "PVDX Mission Control Backend", "status": "running"}

@app.get("/health")
async def health_check():
    """Check health"""
    try:
        redis_client.ping()
        return {"status": "I am alive!", "redis": "connected"}
    except Exception as e:
        return {"status": "dead", "redis": f"error: {str(e)}"}

@app.post("/cache/set")
async def set_cache_endpoint(item: CacheItem):
    """Set cache item"""
    result = set_cache(item.key, item.value, item.expire_seconds)
    return {"message": f"Cache set for key '{item.key}'", "success": bool(result)}

@app.get("/cache/get/{key}")
async def get_cache_endpoint(key: str):
    """Get cache item"""
    value = get_cache(key)
    if value is None:
        return {"key": key, "value": None, "message": "Key not found"}
    return {"key": key, "value": value}

@app.delete("/cache/delete/{key}")
async def delete_cache_endpoint(key: str):
    """Delete cache item"""
    result = delete_cache(key)
    return {"message": f"Cache deleted for key '{key}'", "success": bool(result)}


def main():
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)


if __name__ == "__main__":
    main()
