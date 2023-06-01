from .base import *

DEBUG = True

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     },
#     'clickhouse': {
#         'ENGINE': 'clickhouse_backend.backend',
#         'NAME': 'default',
#         'HOST': '10.101.20.11',
#         'USER': 'default',
#         'PASSWORD': '',
#         'TEST': {
#             'fake_transaction': True
#         }
#     }
# }
#
# DATABASE_ROUTERS = ['dbrouters.ClickHouseRouter']
# DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CK_HOST = '10.101.20.11'
CK_PORT = '9000'

