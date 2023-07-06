import os
import django
import requests

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'noah.settings.test')
django.setup()
from django.test import TestCase
from zjchain.models import PrivateKeyTable, ZjcCkTransactionTable, TransactionFilter

from django.core.paginator import Paginator
class CKTests(TestCase):

    databases = {"default", "clickhouse"}
    def testDjango(self):

        set = ZjcCkTransactionTable.objects.all()
        set = TransactionFilter({}, queryset=set)
        paginator = Paginator(set, 25)
        set = paginator.get_page(1)
        for i in set:
            print(i.hash)