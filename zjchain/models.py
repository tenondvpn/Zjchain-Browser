import json

from django.conf import settings
from infi.clickhouse_orm import *

db = Database('default', db_url=settings.CK_URL, username='default', password='')


class BaseMode(Model):
    @classmethod
    def table_name(self):
        class_name = self.__name__  # 获取子类的类名
        snake_case_name = self._convert_to_snake_case(class_name)  # 将类名转换为蛇形命名
        return snake_case_name

    @classmethod
    def _convert_to_snake_case(self, name):
        snake_case = ""
        for char in name:
            if char.isupper():
                snake_case += "_" + char.lower()
            else:
                snake_case += char
        return snake_case.lstrip("_")

    def dict(self):

        data = self.get_child_properties()

        return data

    def get_child_properties(self):
        public_props = {}
        for key, value in self.__dict__.items():
            if not key.startswith('_'):
                public_props[key] = value
        return public_props



class PrivateKeyTable(BaseMode):
    seckey = StringField()
    ecn_prikey = StringField()
    date = UInt32Field()

    engine = ReplacingMergeTree(
        order_by=['seckey'],
        partition_key=['date']
    )


class ZjcCkAccountKeyValueTable(BaseMode):
    from_field = StringField(alias='from')  # Field renamed because it was a Python reserved word.
    to = StringField()
    type = UInt32Field()
    shard_id = UInt32Field()
    key = StringField()
    value = StringField()

    engine = ReplacingMergeTree(
        order_by=['type', 'key', 'from_field', 'to'],
        partition_key=['shard_id']
    )


class ZjcCkAccountTable(BaseMode):
    id = StringField()
    shard_id = UInt32Field()
    pool_index = UInt32Field()
    balance = UInt64Field()

    engine = ReplacingMergeTree(
        order_by=['id', 'pool_index'],
        partition_key=['shard_id']
    )


class ZjcCkBlockTable(BaseMode):
    shard_id = UInt32Field()
    pool_index = UInt32Field()
    height = UInt64Field()
    prehash = StringField()
    hash = StringField()
    version = UInt32Field()
    vss = UInt64Field()
    elect_height = UInt64Field()
    bitmap = StringField()
    timestamp = UInt64Field()
    timeblock_height = UInt64Field()
    bls_agg_sign_x = StringField()
    bls_agg_sign_y = StringField()
    commit_bitmap = StringField()
    tx_size = UInt32Field()
    date = UInt32Field()

    engine = ReplacingMergeTree(
        order_by=['pool_index', 'height'],
        partition_key=['shard_id', 'date']
    )


class ZjcCkStatisticTable(BaseMode):
    time = UInt64Field()
    all_zjc = UInt64Field()
    all_address = UInt32Field()
    all_contracts = UInt32Field()
    all_transactions = UInt32Field()
    all_nodes = UInt32Field()
    all_waiting_nodes = UInt32Field()
    date = UInt32Field()

    engine = ReplacingMergeTree(
        order_by=['time'],
        partition_key=['date']
    )


class ZjcCkTransactionTable(BaseMode):
    shard_id = UInt32Field()
    pool_index = UInt32Field()
    height = UInt64Field()
    prehash = StringField()
    hash = StringField()
    version = UInt32Field()
    vss = UInt64Field()
    elect_height = UInt64Field()
    bitmap = StringField()
    timestamp = UInt64Field()
    timeblock_height = UInt64Field()
    bls_agg_sign_x = StringField()
    bls_agg_sign_y = StringField()
    commit_bitmap = StringField()
    gid = StringField()
    from_field = StringField(alias='from')  # Field renamed because it was a Python reserved word.
    from_pubkey = StringField()
    from_sign = StringField()
    to = StringField()
    amount = UInt64Field()
    gas_limit = UInt64Field()
    gas_used = UInt64Field()
    gas_price = UInt64Field()
    balance = UInt64Field()
    to_add = UInt32Field()
    type = UInt32Field()
    attrs = StringField()
    status = UInt32Field()
    tx_hash = StringField()
    call_contract_step = UInt32Field()
    storages = StringField()
    transfers = StringField()
    date = UInt32Field()

    engine = ReplacingMergeTree(
        order_by=['pool_index', 'height', 'type', 'from_field', 'to'],
        partition_key=['shard_id', 'date']
    )
