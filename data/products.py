import json
import os

class Products:
    def __init__(self):
        if self.get_all():
          self.products = self.get_all()
        else:
          self.products = []

    def get_all(self):
        file_path = "./data/storage/products.json"
        if os.path.exists(file_path):
            with open(file_path, "r") as r:
                return json.load(r).get('products', [])
        else:
            return []

    def add(self, product):
        self.products.append(product)
        data = {"products": self.products}
        file_path = "./data/storage/products.json"
        with open(file_path, "w+") as f:
            json.dump(data, f)
    