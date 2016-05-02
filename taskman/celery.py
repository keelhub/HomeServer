import os
from celery import Celery
from django.apps import AppConfig
from django.conf import settings


# If this module is not running under Django, that means it is running directly
# under celeryd. Celery needs the DJANGO_SETTINGS_MODULE configured. We
# pull this directly from a user-provided celery_config module
if not settings.configured:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'HomeServer.settings')

app = Celery('HomeServer')


class CeleryConfig(AppConfig):
    name = 'taskman'
    verbose_name = 'Celery Config'

    def ready(self):
        # Using a string here means the worker will not have to
        # pickle the object when using Windows.
        app.config_from_object('django.conf:settings')
        app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))
