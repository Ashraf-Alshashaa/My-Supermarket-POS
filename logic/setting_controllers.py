import eel
from data.app_settings import App_Settings

app_settings = App_Settings()

@eel.expose
def add_settings(settings):
    app_settings.add(settings)

@eel.expose
def get_settings():
    app_settings.get_settings()

@eel.expose
def get_setting(setting):
    return app_settings.get_one(setting)