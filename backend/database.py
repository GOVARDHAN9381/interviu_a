import os
from motor.motor_asyncio import AsyncIOMotorClient

# Provide a fallback for local dev if env var is missing
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")

class DataBase:
    client: AsyncIOMotorClient = None

db = DataBase()

async def connect_to_mongo():
    print(f"Connecting to MongoDB at {MONGO_URL}...")
    db.client = AsyncIOMotorClient(MONGO_URL)
    print("Connected to MongoDB!")

async def close_mongo_connection():
    if db.client:
        db.client.close()
        print("MongoDB connection closed.")

def get_database():
    return db.client.interviu_ai
