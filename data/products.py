import json
import os
from .db import conn_db, fetch, SELECT_PRODUCTS, insert, INSERT_PRODUCT
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
        try:
            with conn_db() as conn:
        
                data = [
                    product.get('barcode', ''),
                    product.get('name', ''),
                    product.get('img', ''),
                    product.get('buy_price', 0),
                    product.get('sell_price', 0),
                    product.get('tax', 0),
                    product.get('qty', 0),
                    product.get('category', '')
                ]

                insert(conn, INSERT_PRODUCT, data)

        except Exception as e:
            print(f"Error: {e}")
    