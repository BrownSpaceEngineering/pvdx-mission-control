import sqlite3
import os
from typing import Optional

# example curl requests:
# curl -F "file=@image.jpg" http://localhost:8000/images/upload
# curl http://localhost:8000/images/1 --output retrieved.jpg
# curl -X POST http://localhost:8000/commands/send -H "Content-Type: application/json" -d '{"command": "ACTIVATE_CAMERA"}'
# curl http://localhost:8000/commands/latest?limit=5

DB_PATH = os.getenv("SQLITE_DB_PATH", "mission_control.db")

def get_connection():
    return sqlite3.connect(DB_PATH)

def init_db():
    with get_connection() as conn:
        cursor = conn.cursor()

        # images stored as blobs
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS images (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                data BLOB NOT NULL,
                timestamp TEXT DEFAULT CURRENT_TIMESTAMP
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS commands (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                command TEXT NOT NULL,
                timestamp TEXT DEFAULT CURRENT_TIMESTAMP
            )
        """)

        conn.commit()

def insert_image(name: str, data: bytes):
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO images (name, data) VALUES (?, ?)", (name, data))
        conn.commit()

def get_image_by_id(image_id: int) -> Optional[tuple]:
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, data, timestamp FROM images WHERE id = ?", (image_id,))
        return cursor.fetchone()

def insert_command(command: str):
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO commands (command) VALUES (?)", (command,))
        conn.commit()

def get_latest_commands(limit: int = 10):
    with get_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, command, timestamp FROM commands ORDER BY timestamp DESC LIMIT ?", (limit,))
        return cursor.fetchall()
