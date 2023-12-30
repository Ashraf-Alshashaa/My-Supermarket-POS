import json
import os

ILE_PATH = os.path.join(".", "data", "storage", "app_settings.json")
class AppSettings:
    
    def __init__(self):
        self.app_settings = self.get_all()

    def get_all(self):
        if os.path.exists(ILE_PATH):
            with open(ILE_PATH, "r") as r:
                return json.load(r).get('settings', {})
        else:
            return {}

    def add(self, settings):
        for key, value in settings.items():
            self.app_settings[key] = value
        data = {"settings": self.app_settings}
        with open(ILE_PATH, "w+") as f:
            json.dump(data, f)

    def get_one(self, setting_name):
        return self.app_settings.get(setting_name, {})