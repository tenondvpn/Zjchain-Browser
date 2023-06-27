# coding=utf-8
import json
import sys

from django.core.paginator import Paginator
from django.forms import model_to_dict
from django.http import HttpResponse

from zjchain.http_helper import JsonHttpResponse, logger
from zjchain.models import ZjcCkBlockTable, TransactionFilter, ZjcCkTransactionTable
from zjchain.utils import str2r, fromtimestamp
from django.core import serializers

sys.setrecursionlimit(10000)
import os
import datetime
import configparser
import shutil
import hashlib
import time
import binascii
import uuid
import geoip2.database
import urllib.request

from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate
from django.conf import settings
import logging
from common.util import is_admin
from clickhouse_driver import Client

ipreader = geoip2.database.Reader(
    'zjchain/resource/GeoLite2-Country.mmdb')

ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)


def transactions_list(request):
    limit = request.GET.get('limit')
    if limit is None: limit = 10
    page = request.GET.get('page')
    if page is None: page = 1

    set = ZjcCkTransactionTable.objects.all()
    set = TransactionFilter(request.GET, queryset=set)
    paginator = Paginator(set.qs, limit)
    set = paginator.get_page(page)

    # set = serializers.serialize("json", set.object_list)
    # set = json.loads(set)
    list = []
    for s in set.object_list:
        s.timestamp = fromtimestamp(s.timestamp)
        list.append(model_to_dict(s))

    return JsonHttpResponse({'status': 1, 'msg': "ok", 'total': paginator.count, 'dataList': list})


def get_transaction(request):
    tx_id = request.GET.get('id')
    if not tx_id: tx_id = '0000'

    try:
        tx = ZjcCkTransactionTable.objects.get(tx_hash=tx_id)
        tx = model_to_dict(tx)
    except Exception as ex:
        return JsonHttpResponse({'status': 1, 'msg': str(ex)})
    return JsonHttpResponse({'status': 1, 'msg': 'ok', 'total': 1, 'data': tx})
