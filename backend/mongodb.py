from motor.motor_asyncio import AsyncIOMotorClient
from pymongo.errors import PyMongoError, ServerSelectionTimeoutError


class MongoConnectionError(RuntimeError):
    pass


client: AsyncIOMotorClient | None = None
db = None


async def connect_to_mongo(mongo_url: str, db_name: str):
    global client, db

    client = AsyncIOMotorClient(
        mongo_url,
        serverSelectionTimeoutMS=5000,
        uuidRepresentation="standard",
    )

    try:
        await client.admin.command("ping")
    except ServerSelectionTimeoutError as exc:
        client.close()
        client = None
        db = None
        raise MongoConnectionError(
            f"Could not connect to MongoDB at {mongo_url}. "
            "Start MongoDB or update MONGO_URL in backend/.env."
        ) from exc
    except PyMongoError as exc:
        client.close()
        client = None
        db = None
        raise MongoConnectionError(f"MongoDB connection failed: {exc}") from exc

    db = client[db_name]
    await ensure_indexes()
    return db


async def ensure_indexes():
    if db is None:
        raise MongoConnectionError("MongoDB is not connected.")

    await db.users.create_index("email", unique=True)
    await db.businesses.create_index("id", unique=True)
    await db.businesses.create_index("slug", unique=True)
    await db.services.create_index("id", unique=True)
    await db.services.create_index("business_id")
    await db.appointments.create_index("id", unique=True)
    await db.appointments.create_index("customer_id")


def get_database():
    if db is None:
        raise MongoConnectionError("MongoDB is not connected.")
    return db


def close_mongo_connection():
    global client, db

    if client is not None:
        client.close()
    client = None
    db = None
