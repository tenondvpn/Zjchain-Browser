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
        'HOST': '127.0.0.1',
        'PORT': '9000',
        'USER': 'default',
        'PASSWORD': '',
        'TEST': {
            'fake_transaction': True
        }
    }
}

DATABASE_ROUTERS = ['noah.settings.dbrouters.ClickHouseRouter']
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CK_HOST = '127.0.0.1'
CK_PORT = '9000'
CK_URL = 'http://localhost:8123'
