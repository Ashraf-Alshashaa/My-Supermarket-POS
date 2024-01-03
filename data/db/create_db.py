from sqlite3 import Error

def create_db(conn, queries):
    try:
        with conn:
            cursor = conn.cursor()

            for query in queries:
              cursor.execute(query)

            conn.commit()

    except Error as e:
        print(f"Error: {e}")