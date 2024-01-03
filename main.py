import eel
import logic.products_controllers
import logic.app_settings_controllers
from data.db.connection import conn_db

conn_db()

eel.init('view')
eel.start('index.html')