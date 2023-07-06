from django.core.paginator import Paginator
from django.db.models import Sum
from django.forms import model_to_dict

from zjchain.http_helper import JsonHttpResponse
from zjchain.models import ZjcCkBlockTable, ZjcCkTransactionTable, BlockFilter
from zjchain.utils import fromtimestamp


def get_block(request):
    block_hash = request.GET.get('block_hash')
    if not block_hash: block_hash = '0000'

    try:
        block = ZjcCkBlockTable.objects.get(hash=block_hash)
        txs = ZjcCkTransactionTable.objects.filter(hash=block_hash)
        gas_used_sum = txs.aggregate(Sum('gas_used'))
        block = model_to_dict(block)
        txList = []
        block['gas_used_sum'] = gas_used_sum['gas_used__sum']
        for t in txs:
            txList.append(model_to_dict(t))
        block['transactions'] = txList
    except Exception as ex:
        return JsonHttpResponse({'status': 1, 'msg': str(ex)})
    return JsonHttpResponse({'status': 1, 'msg': 'ok', 'total': 1, 'data': block})


def block_list(request):
    limit = request.GET.get('limit')
    if limit is None: limit = 10
    page = request.GET.get('page')
    if page is None: page = 1

    set = ZjcCkBlockTable.objects.all().order_by('-timestamp')
    set = BlockFilter(request.GET, queryset=set)
    paginator = Paginator(set.qs, limit)
    set = paginator.get_page(page)

    # set = serializers.serialize("json", set.object_list)
    # set = json.loads(set)
    list = []
    for s in set.object_list:
        s.timestamp = fromtimestamp(s.timestamp)
        list.append(model_to_dict(s))

    return JsonHttpResponse({'status': 1, 'msg': "ok", 'total': paginator.count, 'dataList': list})