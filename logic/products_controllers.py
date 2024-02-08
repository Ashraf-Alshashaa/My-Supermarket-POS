import eel
from data.products import Products

products = Products()

@eel.expose
def add_product(product):
    products.add(product)

@eel.expose
def get_products():
    return products.get_all()