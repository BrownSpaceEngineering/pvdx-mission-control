import redis

redis_client = redis.Redis(host='localhost', port=6379, decode_responses=True)

def set_cache(key: str, value: str, expire_seconds: int = 3600):
    return redis_client.setex(key, expire_seconds, value)

def get_cache(key: str):
    return redis_client.get(key)

def delete_cache(key: str):
    return redis_client.delete(key)

# telemetry

TELEMETRY_TTL = 30  #  refresh rate in second (will probably be changed later tbh)
TELEMETRY_FIELDS = ["battery", "elevation", "temperature", "signal_rssi", "uptime_seconds"]

def set_telemetry(field: str, value: float):
    return redis_client.setex(f"telemetry:{field}", TELEMETRY_TTL, str(value))

def get_all_telemetry() -> dict:
    result = {}
    for field in TELEMETRY_FIELDS:
        val = redis_client.get(f"telemetry:{field}")
        result[field] = float(val) if val is not None else None
    return result
