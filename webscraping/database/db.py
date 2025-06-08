import psycopg2
from dotenv import load_dotenv
import os

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

def normalize_int(value):
    try:
        return int(value)
    except (ValueError, TypeError):
        return -1

def updateDB(all_contestants, returning_contestants, seasons, clear_tables=True):
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        print("✅ Connected to PostgreSQL successfully!")

        if clear_tables:
            cur.execute("TRUNCATE TABLE returning_contestants RESTART IDENTITY CASCADE;")
            print("🧹 Cleared returning_contestants table.")

        print("Updating database...")
        
        print("Seasons...")
        # Insert seasons
        for s in seasons:
            cur.execute("""
                INSERT INTO seasons (season_number, season_name, logo_url)
                VALUES (%s, %s, %s)
                ON CONFLICT (season_number) DO NOTHING;
            """, (s.season_number, s.season_name, s.logo_url))
            
        print("✅ Seasons updated successfully!")
        

        # Map season name to number for contestant foreign key
        season_name_to_number = {s.season_name: s.season_number for s in seasons}

        print("Inserting contestants ")
        # Insert contestants
        for c in all_contestants:
            season_number = season_name_to_number.get(c.season, None)
            cur.execute("""
                INSERT INTO contestants (
                    name, img_url, birthday, age, location_from, season_number, position,
                    days_lasted, votes_against, tribe_wins, ind_wins, total_wins
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                c.name,
                c.img_url,
                c.birthday,
                normalize_int(c.age),
                c.location_from,
                season_number,
                c.position,
                normalize_int(c.days_lasted),
                normalize_int(c.votes_against),
                normalize_int(c.tribe_wins),
                normalize_int(c.ind_wins),
                normalize_int(c.total_wins)
            ))
        print("✅ Contestants updated successfully!")
        print("Contestants...")

        # Insert returning contestants
        for rc in returning_contestants:
            cur.execute("""
                INSERT INTO returning_contestants (
                    name, img_url, age, seasons, tribe_wins, individual_wins, days_lasted, votes_against
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                rc.name,
                rc.img_url,
                normalize_int(rc.age),
                ", ".join(rc.seasons),
                normalize_int(rc.tribe_wins),
                normalize_int(rc.individual_wins),
                normalize_int(rc.days_lasted),
                normalize_int(rc.votes_against)
            ))
        print("✅ Returning contestants updated successfully!")

        conn.commit()
        cur.close()
        conn.close()
        print("✅ Database update completed successfully!")
    except Exception as e:
        print("❌ Failed to update database:", e)
