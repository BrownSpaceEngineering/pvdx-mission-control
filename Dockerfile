# Use official Python image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install sqlite3 CLI (optional, for debugging inside container)
RUN apt-get update && apt-get install -y sqlite3 && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run app with Uvicorn
CMD ["python", "main.py"]
