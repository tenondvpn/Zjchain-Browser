import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'noah.settings.test')
django.setup()
from django.test import TestCase
from zjchain.models import PrivateKeyTable
from django.conf import settings
from django.test.utils import get_runner





class CKTests(TestCase):

    databases = {"default", "clickhouse"}
    def testDjango(self):
        set = PrivateKeyTable.objects.all();
        for i in set:
            print(i.seckey)