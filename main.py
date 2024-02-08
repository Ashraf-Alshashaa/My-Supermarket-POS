import eel
import logic.products_controllers
import logic.app_settings_controllers
from data.db import conn_db, create_db, tables

conn = conn_db()
create_db(conn, tables)

eel.init('view')
eel.start('index.html')