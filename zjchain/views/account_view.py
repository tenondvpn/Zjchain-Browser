# coding=utf-8
import sys

from django.core.paginator import Paginator
from django.db.models import Count
from django.forms import model_to_dict

from zjchain.http_helper import JsonHttpResponse
from zjchain.models import ZjcCkAccountTable, AccountFilter, ZjcCkAccountKeyValueTable, AccountKeyValueFilter, \
    included_keys
from zjchain.utils import fromtimestamp

sys.setrecursionlimit(10000)
from django.conf import settings
from clickhouse_driver import Client

ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)


def account_list(request):
    limit = request.GET.get('limit')
    if limit is None: limit = 10
    page = request.GET.get('page')
    if page is None: page = 1

    set = ZjcCkAccountTable.objects.all().order_by('-balance', 'id')
    set = AccountFilter(request.GET, queryset=set)
    paginator = Paginator(set.qs, limit)
    set = paginator.get_page(page)

    # set = serializers.serialize("json", set.object_list)
    # set = json.loads(set)
    list = []
    for s in set.object_list:
        list.append(model_to_dict(s))

    return JsonHttpResponse({'status': 1, 'msg': "ok", 'total': paginator.count, 'dataList': list})


def get_account(request):
    account = request.GET.get('account')
    if not account: account = '0000'

    try:
        record = ZjcCkAccountTable.objects.distinct().get(id=account)
        record = model_to_dict(record)
        contract_data_rows = ZjcCkAccountKeyValueTable.objects.filter(
            to=account,
            type=6,
            key__in=included_keys
        )

        contract_data_count = contract_data_rows.aggregate(row_count=Count('to'))['row_count']
        record['contract_data_count'] = contract_data_count
    except Exception as ex:
        return JsonHttpResponse({'status': 1, 'msg': str(ex)})
    return JsonHttpResponse({'status': 1, 'msg': 'ok', 'total': 1, 'data': record})
