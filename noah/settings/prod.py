from .base import *

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    },
    'clickhouse': {
        'ENGINE': 'clickhouse_backend.backend',
        'NAME': 'default',
        'HOST': 'localhost',
        'USER': 'default',
        'PASSWORD': '',
        'TEST': {
            'fake_transaction': True
        }
    }
}

DATABASE_ROUTERS = ['noah.settings.dbrouters.ClickHouseRouter']
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CK_HOST = 'localhost'
CK_PORT = '9000'
CK_URL = 'http://localhost:8123'
