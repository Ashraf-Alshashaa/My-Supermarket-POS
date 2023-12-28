import eel
from data.products import Products

import eel
from data.products import Products

products = Products()

@eel.expose
def add_product(product):
    products.add(product)