import redis


# Simple Redis connection
redis_client = redis.Redis(host='localhost', port=6379, decode_responses=True)


def set_cache(key: str, value: str, expire_seconds: int = 3600):
    """Set a simple cache value."""
    return redis_client.setex(key, expire_seconds, value)


def get_cache(key: str):
    """Get a cache value."""
    return redis_client.get(key)


def delete_cache(key: str):
    """Delete a cache value."""
    return redis_client.delete(key)
