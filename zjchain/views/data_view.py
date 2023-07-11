from django.core.paginator import Paginator
from django.forms import model_to_dict

from zjchain.http_helper import JsonHttpResponse
from zjchain.models import ZjcCkAccountKeyValueTable, AccountKeyValueFilter


def data_list(request):
    limit = request.GET.get('limit')
    if limit is None: limit = 10
    page = request.GET.get('page')
    if page is None: page = 1

    set = ZjcCkAccountKeyValueTable.objects.all().order_by('to')
    set = AccountKeyValueFilter(request.GET, queryset=set)
    paginator = Paginator(set.qs, limit)
    set = paginator.get_page(page)

    if request.GET.get("isContracts") is not None:
        set = set.object_list.values('from_field', 'to', 'type')
    else:
        set = set.object_list.values()

    dataList = list(set)
    return JsonHttpResponse({'status': 1, 'msg': "ok", 'total': paginator.count, 'dataList': dataList})
