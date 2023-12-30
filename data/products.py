import json
import os

FILE_PATH = os.path.join(".", "data", "storage", "products.json")
class Products:
    def __init__(self):
          self.products = self.get_all()

    def get_all(self):
        if os.path.exists(FILE_PATH):
            with open(FILE_PATH, "r") as products_file:
                return json.load(products_file).get('products', [])
        else:
            return []

    def add(self, product):
        self.products.append(product)
        data = {"products": self.products}
        with open(FILE_PATH, "w+") as products_file:
            json.dump(data, products_file)
        return self.products
    