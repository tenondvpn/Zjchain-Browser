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

    # set = serializers.serialize("json", set.object_list)
    # set = json.loads(set)
    list = []
    for s in set.object_list:
        list.append(model_to_dict(s))

    return JsonHttpResponse({'status': 1, 'msg': "ok", 'total': paginator.count, 'dataList': list})
