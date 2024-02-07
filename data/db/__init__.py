
import sqlite3
from sqlite3 import Error
import os

from .queries import CREATE_CATEGORIES_TABLE, CREATE_ORDERS_DETAILS_TABLE, CREATE_ORDERS_TABLE, CREATE_PRODUCTS_TABLE, SELECT_PRODUCTS, INSERT_PRODUCT, CREATE_APP_SETTINGS_TABLE, UPDATE_SETTING, SELECT_SETTINGS
from .connection import conn_db
from .create_db import create_db
from .fetch import fetch
from .insert import insert

tables = [
  CREATE_CATEGORIES_TABLE, 
  CREATE_ORDERS_DETAILS_TABLE, 
  CREATE_ORDERS_TABLE, 
  CREATE_PRODUCTS_TABLE, 
  CREATE_APP_SETTINGS_TABLE
  ]