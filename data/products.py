import json
import os
from .db import conn_db, fetch, SELECT_PRODUCTS
import base64

FILE_PATH = os.path.join(".", "data", "storage", "products.json")
class Products:
    def __init__(self):
          self.products = self.get_all()

    def get_all(self):
        try:
            with conn_db() as conn:
                products = fetch(conn, SELECT_PRODUCTS)

                if products:
                    return products
                else:
                    return []
                
        except Exception as e:
            print(f"Error: {e}")
            return []

    def add(self, product):
        self.products.append(product)
        data = {"products": self.products}
        with open(FILE_PATH, "w+") as products_file:
            json.dump(data, products_file)
        return self.products
    