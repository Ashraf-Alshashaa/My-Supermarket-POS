import json
import os
from .db import conn_db, insert, fetch, UPDATE_SETTING, SELECT_SETTINGS
class AppSettings:
    
    def __init__(self):
        self.app_settings = self.get_all()

    def get_all(self):
        with conn_db() as conn:
             data = fetch(conn, SELECT_SETTINGS)
             return json.loads(data)

    def add(self, settings):
        with conn_db() as conn:
            for key in settings.keys():
              insert(conn, UPDATE_SETTING, [ settings[key], key])
            self.app_settings = self.get_all()
            return self.app_settings

    def get_one(self, setting_name):
         for setting in self.app_settings:
            if setting_name == setting["name"]:
              return setting["value"]