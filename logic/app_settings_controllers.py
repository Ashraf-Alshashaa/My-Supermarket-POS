import eel
from data.app_settings import AppSettings

app_settings = AppSettings()

@eel.expose
def add_settings(settings):
    return app_settings.add(settings)

@eel.expose
def get_settings():
    return app_settings.get_all()

@eel.expose
def get_setting(setting):
    return app_settings.get_one(setting)