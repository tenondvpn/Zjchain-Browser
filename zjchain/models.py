from django.db.models import CheckConstraint, Func, Q, IntegerChoices
from django.utils import timezone

import django_filters

from clickhouse_backend import models
from django.db.models import Q

included_keys = [
    '5f5f6b437265617465436f6e74726163744279746573436f6465',
    '5f5f6b437265617465436f6e74726163744279746573436f6465'
]
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


class AccountKeyValueFilter(django_filters.FilterSet):
    isContracts = django_filters.BooleanFilter(method='filter_is_contracts')

    def filter_is_contracts(self, queryset, name, value):
        if value:
            return queryset\
                .filter(type=6, key__in=included_keys)\
                .distinct('from_field', 'to')
        return queryset

    class Meta:
        model = ZjcCkAccountKeyValueTable
        fields = ['from_field', 'type', 'key', 'to']


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


class AccountFilter(django_filters.FilterSet):
    query = django_filters.CharFilter(method='filter_query')

    class Meta:
        model = ZjcCkAccountTable
        fields = ['id', 'shard_id', 'pool_index']

    def filter_query(self, queryset, name, value):
        return queryset.filter(Q(id__icontains=value))


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


class BlockFilter(django_filters.FilterSet):
    query = django_filters.CharFilter(method='filter_query')

    class Meta:
        model = ZjcCkBlockTable
        fields = ['hash', 'timestamp']

    def filter_query(self, queryset, name, value):
        return queryset.filter(Q(hash__icontains=value))


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
    account = django_filters.CharFilter(method='filter_contains_account')
    query = django_filters.CharFilter(method='filter_query')

    class Meta:
        model = ZjcCkTransactionTable
        fields = ['hash', 'timestamp', ]

    def filter_contains_account(self, queryset, name, value):
        return queryset.filter(
            Q(from_field__icontains=value) | Q(to__icontains=value)
        )

    def filter_query(self, queryset, name, value):
        return queryset.filter(Q(tx_hash__icontains=value))
