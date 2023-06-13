import os
import django
from clickhouse_driver import Client
from infi.clickhouse_orm import Database

from zjchain.models import ZjcCkBlockTable

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'noah.settings.test')
django.setup()
from django.test import TestCase
from zjchain import models
from django.conf import settings
from django.test.utils import get_runner


class CKTests(TestCase):
    databases = {"default", "clickhouse"}
    def testCreateModelFormTable(self):
        print(models.ZjcCkAccountKeyValueTable().table_name())
        db = Database('default', db_url=settings.CK_URL, username='default', password='')
        persons = ZjcCkBlockTable.objects_in(db)
        for p in persons:
            print(p.hash)


    def test_block_detail_html(self):
        arr = ['shard_id', 'pool_index', 'height', 'prehash', 'hash', 'version', 'vss', 'elect_height', 'bitmap',
               'timestamp', 'timeblock_height', 'bls_agg_sign_x', 'bls_agg_sign_y', 'commit_bitmap', 'tx_size', 'date',
               'id']

        for t in arr:
            str = '''<div class="form-group row"> 
    <label for="inputEmail3" class="col-sm-2 col-form-label"> {0} </label>
    <div class="col-sm-10">
        <input type="text" class="form-control" disabled id="block_detail_{0}" placeholder="">
    </div>
</div>'''
            str = str.format( t)
            print(str)
            print()

    def test_block_detail_js(self):
        arr = ['shard_id', 'pool_index', 'height', 'prehash', 'hash', 'version', 'vss', 'elect_height', 'bitmap',
               'timestamp', 'timeblock_height', 'bls_agg_sign_x', 'bls_agg_sign_y', 'commit_bitmap', 'tx_size', 'date',
               'id']

        for t in arr:
            str = '''$("#block_detail_{0}").val(response.value['{0}']);'''
            str = str.format(t)
            print(str)


