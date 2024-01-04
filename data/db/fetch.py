import json
import base64
from . import Error
import json

def fetch(conn, query, criteria=None):
    try:
        with conn:
            cursor = conn.cursor()
            if criteria:
                result = cursor.execute(query, criteria).fetchone()
            else:
                result = cursor.execute(query).fetchall()

            column_names = [description[0] for description in cursor.description]

            if result:
                formatted_results = []
                for row in result:
                    formatted_row = {column_names[i]: base64.b64encode(row[i]).decode('utf-8') if isinstance(row[i], bytes) else row[i] for i in range(len(row))}
                    formatted_results.append(formatted_row)
              
                json_products = json.dumps(formatted_results, indent=2) if formatted_results else None

                return json_products
            else:
                return None
           
    except Error as e:
        print(f"Error: {e}")
        return None
