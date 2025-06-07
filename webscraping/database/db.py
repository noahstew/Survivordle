import psycopg2
from dotenv import load_dotenv
import os

# Load environment variables from .env
load_dotenv()

# Get the database URL from the environment
DATABASE_URL = os.getenv("DATABASE_URL")

# Connecting to the database
try:
    conn = psycopg2.connect(DATABASE_URL)
    print("✅ Connected to PostgreSQL successfully!")

    # Optional: Create a cursor
    cur = conn.cursor()

    # Example query (just to test)
    cur.execute("SELECT version();")
    db_version = cur.fetchone()
    print("PostgreSQL version:", db_version)

    # Clean up
    cur.close()
    conn.close()

except Exception as e:
    print("❌ Failed to connect to PostgreSQL:", e)
