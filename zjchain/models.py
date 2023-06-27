from django.db.models import CheckConstraint, Func, Q, IntegerChoices
from django.utils import timezone

import django_filters

from clickhouse_backend import models


class BassMode:
    def dict(self):

        data = self.get_child_properties()

        return data

    def get_child_properties(self):
        public_props = {}
        for key, value in self.__dict__.items():
            if not key.startswith('_'):
                public_props[key] = value
        return public_props



class PrivateKeyTable(BassMode, models.ClickhouseModel):
    seckey = models.StringField()
    ecn_prikey = models.StringField()
    date = models.UInt32Field()

    class Meta:
        managed = False
        db_table = 'private_key_table'

        ordering = ['-seckey']
        engine = models.ReplacingMergeTree(
            order_by=['seckey'],
            partition_by='date'
        )


class ZjcCkAccountKeyValueTable(BassMode, models.ClickhouseModel):
    from_field = models.StringField(db_column='from')  # Field renamed because it was a Python reserved word.
    to = models.StringField()
    type = models.UInt32Field()
    shard_id = models.UInt32Field()
    key = models.StringField()
    value = models.StringField()

    class Meta:
        managed = False
        db_table = 'zjc_ck_account_key_value_table'

        ordering = ['type', 'key', 'from_field', 'to']
        engine = models.ReplacingMergeTree(
            order_by=['type', 'key', 'from_field', 'to'],
            partition_by='shard_id'
        )


class ZjcCkAccountTable(BassMode, models.ClickhouseModel):
    id = models.StringField(primary_key=True)
    shard_id = models.UInt32Field()
    pool_index = models.UInt32Field()
    balance = models.UInt64Field()

    class Meta:
        managed = False
        db_table = 'zjc_ck_account_table'

        ordering = ['id', 'pool_index']
        engine = models.ReplacingMergeTree(
            order_by=['id', 'pool_index'],
            partition_by='shard_id'
        )


class ZjcCkBlockTable(BassMode, models.ClickhouseModel):
    shard_id = models.UInt32Field()
    pool_index = models.UInt32Field()
    height = models.UInt64Field()
    prehash = models.StringField()
    hash = models.StringField()
    version = models.UInt32Field()
    vss = models.UInt64Field()
    elect_height = models.UInt64Field()
    bitmap = models.StringField()
    timestamp = models.UInt64Field()
    timeblock_height = models.UInt64Field()
    bls_agg_sign_x = models.StringField()
    bls_agg_sign_y = models.StringField()
    commit_bitmap = models.StringField()
    tx_size = models.UInt32Field()
    date = models.UInt32Field()

    class Meta:
        managed = False
        db_table = 'zjc_ck_block_table'

        ordering = ['pool_index', 'height']
        engine = models.ReplacingMergeTree(
            order_by=['pool_index', 'height'],
            partition_by=['shard_id', 'date']
        )


class ZjcCkStatisticTable(BassMode, models.ClickhouseModel):
    time = models.UInt64Field()
    all_zjc = models.UInt64Field()
    all_address = models.UInt32Field()
    all_contracts = models.UInt32Field()
    all_transactions = models.UInt32Field()
    all_nodes = models.UInt32Field()
    all_waiting_nodes = models.UInt32Field()
    date = models.UInt32Field()

    class Meta:
        managed = False
        db_table = 'zjc_ck_statistic_table'

        ordering = ['-time']
        engine = models.ReplacingMergeTree(
            order_by=['time'],
            partition_by='date'
        )


class ZjcCkTransactionTable(BassMode, models.ClickhouseModel):
    shard_id = models.UInt32Field()
    pool_index = models.UInt32Field()
    height = models.UInt64Field()
    prehash = models.StringField()
    hash = models.StringField()
    version = models.UInt32Field()
    vss = models.UInt64Field()
    elect_height = models.UInt64Field()
    bitmap = models.StringField()
    timestamp = models.UInt64Field()
    timeblock_height = models.UInt64Field()
    bls_agg_sign_x = models.StringField()
    bls_agg_sign_y = models.StringField()
    commit_bitmap = models.StringField()
    gid = models.StringField()
    from_field = models.StringField(db_column='from')  # Field renamed because it was a Python reserved word.
    from_pubkey = models.StringField()
    from_sign = models.StringField()
    to = models.StringField()
    amount = models.UInt64Field()
    gas_limit = models.UInt64Field()
    gas_used = models.UInt64Field()
    gas_price = models.UInt64Field()
    balance = models.UInt64Field()
    to_add = models.UInt32Field()
    type = models.UInt32Field()
    attrs = models.StringField()
    status = models.UInt32Field()
    tx_hash = models.StringField()
    call_contract_step = models.UInt32Field()
    storages = models.StringField()
    transfers = models.StringField()
    date = models.UInt32Field()

    class Meta:
        managed = False
        db_table = 'zjc_ck_transaction_table'

        ordering = ['pool_index', 'height', 'type', 'from_field', 'to']
        engine = models.ReplacingMergeTree(
            order_by=['pool_index', 'height', 'type', 'from_field', 'to'],
            partition_by=['shard_id', 'date']
        )


class TransactionFilter(django_filters.FilterSet):
    class Meta:
        model = ZjcCkTransactionTable
        fields = ['hash', 'timestamp']