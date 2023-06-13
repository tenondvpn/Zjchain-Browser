# coding=utf-8
import sys

from django.forms import model_to_dict

from zjchain.models import ZjcCkBlockTable, db

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
from zjchain.http_helper import JsonHttpResponse, logger

ipreader = geoip2.database.Reader(
    'zjchain/resource/GeoLite2-Country.mmdb')

ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)


def zjchain_index(request):
    return render(request, 'zjchain_index.html', {"pipe_id": -1})


def contract(request):
    return render(request, 'contract.html', {"pipe_id": -1})


def tbc(request):
    return render(request, 'zjchain_business_school.html', {"pipe_id": -1})


def get_country(request):
    return 'CN'


def get_balance(request, account_id):
    cmd = "select shard_id, pool_index, balance from zjc_ck_account_table where id='" + account_id + "'"
    logging.error('get balance ok: <%s, %s>' % ("", cmd))
    result = ck_client.execute(cmd)
    if result is None or len(result) <= 0:
        return JsonHttpResponse({
            'status': 0, 'cmd': cmd,
            'shard_id': -1,
            'pool_index': -1,
            'country': get_country(request),
            'valid_country': 'AU,CA,CN,DE,FR,GB,HK,IN,JP,NL,SG,US,PH,KR,ID,MY,RU,PH,SA,TW,AE,BR,VN',
            'balance': 0})

    return JsonHttpResponse({
        'status': 0, 'cmd': cmd,
        'shard_id': result[0][0],
        'pool_index': result[0][1],
        'country': get_country(request),
        'valid_country': 'AU,CA,CN,DE,FR,GB,HK,IN,JP,NL,SG,US,PH,KR,ID,MY,RU,PH,SA,TW,AE,BR,VN',
        'balance': result[0][2]})


def transactions(request):
    if request.method == 'POST':
        block_hash = request.POST.get('hash')
        height = request.POST.get('height')
        shard = request.POST.get('shard')
        pool = request.POST.get('pool')
        limit = request.POST.get('limit')
        search_str = request.POST.get('search')
        if search_str is None:
            search_str = ""

        order = request.POST.get('order')
        data_type = request.POST.get('type')
        where_str = ''
        if int(shard) != -1:
            if where_str != "":
                where_str += " and shard_id = " + str(shard)
            else:
                where_str += " shard_id = " + str(shard)

        if int(pool) != -1:
            if where_str != "":
                where_str += " and pool_index = " + str(pool)
            else:
                where_str += " pool_index = " + str(pool)

        if height is None:
            height = -1

        if block_hash is None:
            block_hash = ""

        if int(height) != -1:
            if where_str != "":
                where_str += " and height = " + str(height)
            else:
                where_str += " height = " + str(height)

        if block_hash != "":
            if where_str != "":
                where_str += " and hash = " + hexStr_to_str(block_hash)
            else:
                where_str += " hash = " + hexStr_to_str(block_hash)

        if data_type is None:
            data_type = 0

        data_type = int(data_type)
        if data_type == 0:
            if search_str != "":
                if where_str != "":
                    where_str += " and "

                where_str += " gid = '" + search_str + "' or from = '" + search_str + "' or to = '" + search_str + "' or hash = '" + search_str + "' or prehash = '" + search_str + "' ";
        else:
            if search_str != "":
                if where_str != "":
                    where_str += " and "

                where_str += " hash = '" + search_str + "' or prehash = '" + search_str + "' ";

        cmd = 'SELECT shard_id, pool_index, height, type, timestamp, gid, from, to, amount, gas_limit, gas_used, gas_price FROM zjc_ck_transaction_table '
        if data_type == 1:
            cmd = 'SELECT shard_id, pool_index, height, timestamp, prehash, hash, vss, elect_height, timeblock_height, tx_size FROM zjc_ck_block_table '

        if where_str != "":
            cmd += " where " + where_str

        if order is not None:
            cmd += " " + order + " "
        else:
            cmd += " order by timestamp desc "

        if limit != "":
            cmd += " limit " + limit
        else:
            cmd += " limit 100 "

        try:

            result = ck_client.execute(cmd)
            tmp_result = []
            for item in result:
                dt_object = ""
                if data_type == 0:
                    dt_object = datetime.datetime.fromtimestamp(int(item[4] / 1000) + 8 * 3600)
                    dt_object = dt_object.strftime("%Y/%m/%d %H:%M:%S") + "." + str(item[4] % 1000)
                else:
                    dt_object = datetime.datetime.fromtimestamp(int(item[3] / 1000) + 8 * 3600)
                    dt_object = dt_object.strftime("%Y/%m/%d %H:%M:%S") + "." + str(item[3] % 1000)

                if data_type == 0:
                    tmp_result.append({
                        "Time": dt_object,
                        "Shard": item[0],
                        "Pool": item[1],
                        "Height": item[2],
                        "Type": item[3],
                        "Gid": item[5],
                        "From": item[6],
                        "To": item[7],
                        "Amount": item[8],
                        "Gas": item[10] * item[11]
                    })
                else:
                    tmp_result.append({
                        "Time": dt_object,
                        "Shard": item[0],
                        "Pool": item[1],
                        "Height": item[2],
                        "PrevHash": item[4],
                        "Hash": item[5],
                        "Vss": item[6],
                        "ElectHeight": item[7],
                        "TimeHeight": item[8],
                        "TxSize": item[9]
                    })
            return JsonHttpResponse({'status': 0, 'cmd': cmd, 'value': tmp_result})
        except Exception as ex:
            logger.error('select fail: <%s, %s>' % (cmd, str(ex)))
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        return JsonHttpResponse({'status': 1, 'msg': 'msg'})


def vpn_transactions(request):
    if request.method == 'POST':
        limit = request.POST.get('limit')
        addr = request.POST.get('addr')
        vpn_addr = request.POST.get('vpn_addr')
        order = request.POST.get('order')
        data_type = 0
        where_str = " (`from`='" + addr + "' and `to`='" + vpn_addr + "') or (`from`='" + vpn_addr + "' and `to`='" + addr + "') ";
        cmd = 'SELECT shard_id, pool_index, height, type, timestamp, gid, from, to, amount, gas_limit, gas_used, gas_price,balance,to_add FROM zjc_ck_transaction_table '
        if where_str != "":
            cmd += " where " + where_str

        cmd += " order by timestamp desc "
        if limit != "":
            cmd += " limit " + limit
        else:
            cmd += " limit 100 "

        try:

            print("cmd: " + cmd)
            result = ck_client.execute(cmd)
            tmp_result = []
            for item in result:
                dt_object = ""
                if data_type == 0:
                    dt_object = datetime.datetime.fromtimestamp(int(item[4] / 1000) + 8 * 3600)
                    dt_object = dt_object.strftime("%Y/%m/%d %H:%M:%S") + "." + str(item[4] % 1000)
                else:
                    dt_object = datetime.datetime.fromtimestamp(int(item[3] / 1000) + 8 * 3600)
                    dt_object = dt_object.strftime("%Y/%m/%d %H:%M:%S") + "." + str(item[3] % 1000)

                if True:
                    tmp_result.append({
                        "Time": dt_object,
                        "TimestampSec": int(item[4] / 1000),
                        "Shard": item[0],
                        "Pool": item[1],
                        "Height": item[2],
                        "Type": item[3],
                        "Gid": item[5],
                        "From": item[6],
                        "To": item[7],
                        "Amount": item[8],
                        "Balance": item[12],
                        "ToAdd": item[13],
                        "Gas": item[10] * item[11]
                    })
            return JsonHttpResponse({'status': 0, 'cmd': cmd, 'value': tmp_result})
        except Exception as ex:
            logger.error('select fail: <%s, %s>' % (cmd, str(ex)))
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        return JsonHttpResponse({'status': 1, 'msg': 'msg'})


def accounts(request):
    if request.method == 'POST':
        shard = request.POST.get('shard')
        pool = request.POST.get('pool')
        limit = request.POST.get('limit')
        search_str = request.POST.get('search')
        if search_str is None:
            search_str = ""

        order = request.POST.get('order')
        where_str = ''
        if int(shard) != -1:
            if where_str != "":
                where_str += " and shard_id = " + str(shard)
            else:
                where_str += " shard_id = " + str(shard)

        if int(pool) != -1:
            if where_str != "":
                where_str += " and pool_index = " + str(pool)
            else:
                where_str += " pool_index = " + str(pool)

        cmd = 'SELECT id, shard_id, pool_index, balance FROM zjc_ck_account_table '
        if where_str != "":
            cmd += " where " + where_str

        if order is not None:
            cmd += " " + order + " "

        if limit != "":
            cmd += " limit " + limit
        else:
            cmd += " limit 100 "

        try:

            result = ck_client.execute(cmd)
            tmp_result = []
            for item in result:
                tmp_result.append({
                    "address": item[0],
                    "Shard": item[1],
                    "Pool": item[2],
                    "Balance": item[3]
                })
            return JsonHttpResponse({'status': 0, 'cmd': cmd, 'value': tmp_result})
        except Exception as ex:
            logger.error('select fail: <%s, %s>' % (cmd, str(ex)))
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        return JsonHttpResponse({'status': 1, 'msg': 'msg'})


def get_statistics(request):
    if request.method == 'POST':
        limit = request.POST.get('limit')
        cmd = 'SELECT time, all_zjc, all_address, all_contracts, all_transactions, all_nodes FROM zjc_ck_statistic_table order by time desc limit 1'
        tmp_result = None
        try:

            tmp_result = ck_client.execute(cmd)
        except Exception as ex:
            logger.error('select fail: <%s, %s>' % (cmd, str(ex)))
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})

        if limit is not None and limit != "":
            limit = int(limit)
        else:
            limit = 8640

        timestamp_max = tmp_result[0][0] - limit * 10 + 10
        timestamp_min = tmp_result[0][0] - limit * 10 - 10
        cmd = 'SELECT time, all_zjc, all_address, all_contracts, all_transactions, all_nodes FROM zjc_ck_statistic_table where time >= ' + str(
            timestamp_min) + ' and time <= ' + str(timestamp_max) + ' order by time desc limit 1'
        res_result_prev = {}
        res_result = {}
        try:
            result = ck_client.execute(cmd)
            if result is None or len(result) <= 0:
                cmd = 'SELECT time, all_zjc, all_address, all_contracts, all_transactions, all_nodes FROM zjc_ck_statistic_table order by time asc limit 1'

                result = ck_client.execute(cmd)

            res_result_prev = {
                "time": result[0][0],
                "all_zjc": result[0][1],
                "all_address": result[0][2],
                "all_contracts": result[0][3],
                "all_transactions": result[0][4],
                "qps": 0,
                "all_nodes": result[0][5]
            }

            res_result = {
                "time": tmp_result[0][0],
                "all_zjc": tmp_result[0][1],
                "all_address": tmp_result[0][2],
                "all_contracts": tmp_result[0][3],
                "all_transactions": tmp_result[0][4],
                "qps": round(float(tmp_result[0][4] - result[0][4]) / float(tmp_result[0][0] - result[0][0]), 4),
                "all_nodes": tmp_result[0][5]
            }
        except Exception as ex:
            logger.error('select fail: <%s, %s>' % (cmd, str(ex)))
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})

        return JsonHttpResponse({'status': 0, 'cmd': cmd, 'value': res_result, 'cmp': res_result_prev})


def get_bytescode(request):
    if request.method == 'POST':
        sorce_codes = request.POST.get('sorce_codes')
        try:
            filename = "/tmp/" + uuid.uuid4().hex
            fo = open(filename, "w")
            fo.write(sorce_codes)
            fo.close()
            f = os.popen("solc --bin " + filename)
            bin_code = f.read()
            bin_code_arr = bin_code.split("\n")
            return JsonHttpResponse({'status': 0, 'code': bin_code_arr[3]})
        except Exception as ex:
            logger.error('select fail: <%s, %s>' % (cmd, str(ex)))
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        return JsonHttpResponse({'status': 1, 'msg': 'msg'})


def addtwodimdict(thedict, key_a, key_b, val):
    if key_a in thedict:
        thedict[key_a].update({key_b: val})
    else:
        thedict.update({key_a: {key_b: val}})


def get_all_contracts(request):
    if request.method == 'POST':
        contracts = request.POST.get('contracts')
        limit = request.POST.get('limit')
        where_str = "where type = 6 and key in('5f5f6b437265617465436f6e74726163744279746573436f6465', '5f5f6b437265617465436f6e74726163744279746573436f6465') "
        if (contracts.endswith(',')):
            contracts = contracts[0: len(contracts) - 1]

        contracts = "'" + contracts + "'";
        contracts = contracts.replace(',', "','")
        if contracts is not None and len(contracts) >= 40:
            where_str += " and to in (" + contracts + ") "

        cmd = 'SELECT from, to, key, value FROM zjc_ck_account_key_value_table '
        if where_str != "":
            cmd += where_str

        if limit != "":
            cmd += " limit " + limit
        else:
            cmd += " limit 100 "
        try:

            result = ck_client.execute(cmd)
            contracts_dict = dict()
            for item in result:
                try:
                    key_decode = bytes.fromhex(item[2]).decode('utf-8')
                except Exception as ex:
                    continue
                val_decode = item[3]
                if key_decode != '__kCreateContractBytesCode':
                    try:
                        val_decode = bytes.fromhex(item[3]).decode('utf-8')
                    except Exception as ex:
                        continue

                key = item[0] + "," + item[1]
                addtwodimdict(contracts_dict, key, key_decode, val_decode)

            res_arr = []
            for key in contracts_dict:
                val = contracts_dict[key]
                key_split = key.split(',')
                val['from'] = key_split[0]
                val['to'] = key_split[1]
                res_arr.append(val)

            return JsonHttpResponse({'status': 0, 'cmd': cmd, 'value': res_arr})
        except Exception as ex:
            logger.error('select fail: <%s, %s>' % (cmd, str(ex)))
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        return JsonHttpResponse({'status': 1, 'cmd': cmd, 'msg': 'msg'})


def nodes(request):
    try:
        data = urllib.parse.urlencode({'Host': 'search.cpsa.ca', 'Connection': 'keep-alive', 'Content-Length': 23796,
                                       'Origin': 'http://search.cpsa.ca',
                                       'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                       'Cahce-Control': 'no-cache', 'X-Requested-With': 'XMLHttpRequest',
                                       'X-MicrosoftAjax': 'Delta=true', 'Accept': '*/*',
                                       'Referer': 'http://search.cpsa.ca/PhysicianSearch',
                                       'Accept-Encoding': 'gzip, deflate',
                                       'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6',
                                       'Cookie': 'ASP.NET_SessionId=kcwsgio3dchqjmyjtwue402c; _ga=GA1.2.412607756.1459536682; _gat=1'})
        data = data.encode('ascii')
        res = urllib.request.urlopen("http://82.156.224.174:8101/nodes", data).read().decode('utf-8')
        logger.error('get res ok: <%s, %s>' % ("", res))
        return JsonHttpResponse(json.loads(res))
    except Exception as err:
        print("get res err: ", err)
        logger.error('get res err: <%s, %s>' % ("", str(err)))
        return JsonHttpResponse({'status': 0, 'routes': [], 'vpns': []})


def get_all_videos(request):
    if request.method == 'POST':
        limit = request.POST.get('limit')
        cmd = 'SELECT link FROM tbc_videos '
        if limit != "":
            cmd += " limit " + limit
        else:
            cmd += " limit 30 "
        try:

            result = ck_client.execute(cmd)
            res_arr = []
            print(result)
            for item in result:
                res_arr.append(item[0])

            print(res_arr)
            return JsonHttpResponse({'status': 0, 'cmd': cmd, 'value': res_arr})
        except Exception as ex:
            logger.error('select fail: <%s, %s>' % (cmd, str(ex)))
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        return JsonHttpResponse({'status': 1, 'cmd': cmd, 'msg': 'msg'})


def get_contract_detail(request):
    if request.method == 'POST':
        contract_id = request.POST.get('contract_id')
        where_str = "where type = 6 and key in('5f5f6b437265617465436f6e74726163744279746573436f6465', '5f5f6b437265617465436f6e74726163744279746573436f6465') and to ='" + contract_id + "'";
        cmd = 'SELECT from, to, key, value FROM zjc_ck_account_key_value_table '
        if where_str != "":
            cmd += where_str

        try:

            result = ck_client.execute(cmd)
            contracts_dict = dict()
            for item in result:
                try:
                    key_decode = bytes.fromhex(item[2]).decode('utf-8')
                except Exception as ex:
                    continue
                val_decode = item[3]
                if key_decode != '__kCreateContractBytesCode':
                    try:
                        val_decode = bytes.fromhex(item[3]).decode('utf-8')
                    except Exception as ex:
                        continue

                key = item[0] + "," + item[1]
                addtwodimdict(contracts_dict, key, key_decode, val_decode)

            res_arr = []
            for key in contracts_dict:
                val = contracts_dict[key]
                key_split = key.split(',')
                val['from'] = key_split[0]
                val['to'] = key_split[1]
                res_arr.append(val)

            return JsonHttpResponse({'status': 0, 'cmd': cmd, 'value': res_arr[0]})
        except Exception as ex:
            logger.error('select fail: <%s, %s>' % (cmd, str(ex)))
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        return JsonHttpResponse({'status': 1, 'cmd': cmd, 'msg': 'msg'})


def get_block_detail(request, block_hash):
    try:
        blockDetail = ZjcCkBlockTable.objects_in(db).filter(ZjcCkBlockTable.hash == block_hash)[0]
        tmpObj = blockDetail.dict()
        cmd = "select sum(gas_used) as value from zjc_ck_block_table a inner join zjc_ck_transaction_table b on a.hash = b.hash" \
              " and  b.hash ='" + str(block_hash) + "' "\
              " group by b.hash " \

        result = ck_client.execute(cmd)
        tmpObj['total_used_gas'] = result[0][0]
        return JsonHttpResponse({'status': 0, 'value': tmpObj})
    except Exception as ex:
        logger.error('get_block_detail fail hash = %s>' % block_hash)
        return JsonHttpResponse({'status': 1, 'msg': str(ex)})


def get_prikey(request, seckey):
    cmd = "select ecn_prikey from private_key_table where seckey='" + seckey + "'"

    result = ck_client.execute(cmd)
    if result is None or len(result) <= 0:
        return JsonHttpResponse({'status': 1, 'cmd': cmd, 'msg': 'account not exists.'})

    return JsonHttpResponse({
        'status': 0, 'cmd': cmd, 'prikey': result[0][0]})


def set_private_key(request):
    if request.method == 'POST':
        seckkey = request.POST.get('key')
        prkey = request.POST.get('enc')
        cmd = "insert into private_key_table values('" + seckkey + "', '" + prkey + "', 0)"
        try:

            ck_client.execute(cmd)
            return JsonHttpResponse({'status': 0, 'msg': 'ok'})
        except Exception as ex:
            logger.error('select fail: <%s, %s>' % (cmd, str(ex)))
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
