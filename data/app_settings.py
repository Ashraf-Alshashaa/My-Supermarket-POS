import json
import os

FILE_PATH = os.path.join(".", "data", "storage", "app_settings.json")
class AppSettings:
    
    def __init__(self):
        self.app_settings = self.get_all()

    def get_all(self):
        if os.path.exists(FILE_PATH):
            with open(FILE_PATH, "r") as settings_file:
                return json.load(settings_file).get('settings', {})
        else:
            return {}

    def add(self, settings):
        for key, value in settings.items():
            self.app_settings[key] = value
        data = {"settings": self.app_settings}
        with open(FILE_PATH, "w+") as settings_file:
            json.dump(data, settings_file)

    def get_one(self, setting_name):
        return self.app_settings.get(setting_name, {})