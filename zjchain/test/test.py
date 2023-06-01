import datetime
import os

from django.test import TestCase
from django.utils import timezone
from django.conf import settings
from clickhouse_driver import Client


class CKTests(TestCase):
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'noah.settings.test')
    ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
    def testCK(self):
        self.ck_client.result = ck_client0.execute(cmd)