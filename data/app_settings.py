import json
import os

class App_Settings:
    def __init__(self):
        if self.get_settings():
          self.app_settings = self.get_settings()
        else:
          self.app_settings = {}

    def get_settings(self):
        file_path = "./data/storage/app_settings.json"
        if os.path.exists(file_path):
            with open(file_path, "r") as r:
                return json.load(r).get('settings', {})
        else:
            return {}

    def add(self, settings):
        for key, value in settings.items():
            self.app_settings[key] = value
        data = {"settings": self.app_settings}
        file_path = "./data/storage/app_settings.json"
        with open(file_path, "w+") as f:
            json.dump(data, f)

    def get_one(self, setting_name):
        return self.app_settings.get(setting_name)