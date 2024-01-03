from . import sqlite3, Error, os

def conn_db():
    try:
        with sqlite3.connect(os.path.join(".", "data", "storage", "storage.db")) as conn:
            return conn
    except Error as e:
        print(f"Error: {e}")