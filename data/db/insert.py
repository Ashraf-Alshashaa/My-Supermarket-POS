from . import Error

def insert(conn, query, data):
    try:
        with conn:
            cursor = conn.cursor()
            cursor.execute(query, data)
            print("done")
    except Error as e:
        print(f"Error: {e}")