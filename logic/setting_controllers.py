import eel
from data.app_settings import App_Settings

app_settings = App_Settings()

@eel.expose
def add_sittings(settings):
    app_settings.add(settings)

@eel.expose
def get_sittings(settings):
    app_settings.get_settings()