CREATE_CATEGORIES_TABLE = '''
                CREATE TABLE IF NOT EXISTS categories (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL
                )
            '''

CREATE_PRODUCTS_TABLE = '''
                CREATE TABLE IF NOT EXISTS products (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    barcode INTEGER,
                    name TEXT NOT NULL,
                    img BLOB NOT NULL,
                    buy_price INTEGER NOT NULL,
                    sell_price INTEGER NOT NULL,
                    tax INTEGER NOT NULL,
                    qty INTEGER NOT NULL,
                    category INTEGER,
                    FOREIGN KEY (category) REFERENCES categories(id)
                )
            '''

CREATE_ORDERS_TABLE = '''
                CREATE TABLE IF NOT EXISTS orders (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    order_date DATE,
                    total_price REAL
                )
            '''

CREATE_ORDERS_DETAILS_TABLE = '''
                CREATE TABLE IF NOT EXISTS order_details (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    order_id INTEGER,
                    product_id INTEGER,
                    quantity INTEGER,
                    price REAL,
                    FOREIGN KEY (order_id) REFERENCES orders(id),
                    FOREIGN KEY (product_id) REFERENCES products(id)
                )
            '''

SELECT_PRODUCTS = '''SELECT * FROM products'''

INSERT_PRODUCT = '''
              INSERT INTO products (
                  barcode, name, img, buy_price, sell_price, tax, qty, category
              )
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            '''

CREATE_APP_SETTINGS_TABLE = '''
                CREATE TABLE IF NOT EXISTS app_settings (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT,
                    value TEXT
                )
            '''

UPDATE_SETTING = '''
              UPDATE app_settings SET value=? WHERE name=?
            '''
SELECT_SETTINGS = '''
              SELECT * FROM app_settings
            '''