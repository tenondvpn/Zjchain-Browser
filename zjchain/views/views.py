# coding=utf-8
import sys


from zjchain.models import ZjcCkBlockTable
from zjchain.utils import str2r

sys.setrecursionlimit(10000)
import os
import datetime
import uuid
import geoip2.database
import json
import urllib.request
import re
import time
import copy
from django.shortcuts import render
from django.conf import settings
import logging
from clickhouse_driver import Client
from zjchain.http_helper import JsonHttpResponse, logger
from zjchain.views import no_block_sys_cmd
from zjchain.views import linux_file_cmd
import binascii
from zjchain.views import shardora_api
from eth_utils import decode_hex, encode_hex
from eth_abi import encode
from urllib.parse import urlencode
import requests

penc_contarct_address = "48e1eab96c9e759daa3aff82b40e77cd615a41d0"
ars_contarct_address = "08e1eab96c9e759daa3aff82b40e77cd615a41d5"
exchange_contarct_address = "000feab96c9e759daa3aff82b40e77cd615a41d9"

ipreader = geoip2.database.Reader(
    'zjchain/resource/GeoLite2-Country.mmdb')

def str_to_hex(string):
    str_bin = string.encode('utf-8')
    return binascii.hexlify(str_bin).decode('utf-8')

def hex_to_str(hex_str):
    hex = hex_str.encode('utf-8')
    str_bin = binascii.unhexlify(hex)
    return str_bin.decode('utf-8')

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
    ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
    result = ck_client.execute(cmd)
    if result is None or len(result) <= 0:
        return JsonHttpResponse({
            'status': 0, 'cmd': cmd,
            'shard_id': -1,
            'address': account_id,
            'pool_index': -1,
            'country': get_country(request),
            'valid_country': 'AU,CA,CN,DE,FR,GB,HK,IN,JP,NL,SG,US,PH,KR,ID,MY,RU,PH,SA,TW,AE,BR,VN',
            'balance': 0})

    return JsonHttpResponse({
        'status': 0, 'cmd': cmd,
        'shard_id': result[0][0],
        'pool_index': result[0][1],
        'address': account_id,
        'country': get_country(request),
        'valid_country': 'AU,CA,CN,DE,FR,GB,HK,IN,JP,NL,SG,US,PH,KR,ID,MY,RU,PH,SA,TW,AE,BR,VN',
        'balance': result[0][2]})  

def tmp_transactions(request, clear_seach):
    if request.method == 'POST':
        block_hash = request.POST.get('hash')
        height = request.POST.get('height')
        shard = request.POST.get('shard')
        pool = request.POST.get('pool')
        limit = request.POST.get('limit')
        search_str = request.POST.get('search')
        if clear_seach:
            search_str = None

        if search_str is None:
            search_str = ""

        if shard is None:
            shard = -1

        if pool is None:
            pool = -1

        if limit is None:
            limit = ""

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
                where_str += " and hash = " + str2r(block_hash)
            else:
                where_str += " hash = " + str2r(block_hash)

        if data_type is None:
            data_type = 0

        data_type = int(data_type)
        if data_type == 0:
            if search_str != "":
                if where_str != "":
                    where_str += " and "

                where_str += "( gid = '" + search_str + "' or from = '" + search_str + "' or to = '" + search_str + "' or hash = '" + search_str + "' or prehash = '" + search_str + "' )"
        else:
            if search_str != "":
                if where_str != "":
                    where_str += " and "

                where_str += " hash = '" + search_str + "' or prehash = '" + search_str + "' "

        cmd = 'SELECT shard_id, pool_index, height, type, timestamp, gid, from, to, amount, gas_limit, gas_used, gas_price, storages FROM zjc_ck_transaction_table '
        if data_type == 1:
            if where_str != "":
                where_str += " and bls_elect_info.shard_id=3 and bls_elect_info.member_idx=0 and zjc_ck_block_table.shard_id=3 "
            else:
                where_str += " bls_elect_info.shard_id=3 and bls_elect_info.member_idx=0 and zjc_ck_block_table.shard_id=3 "

            cmd = 'SELECT shard_id, pool_index, height, timestamp, prehash, hash, vss, elect_height, timeblock_height, tx_size, version, bitmap, bls_agg_sign_x,bls_agg_sign_y,commit_bitmap,common_pk FROM zjc_ck_block_table LEFT OUTER JOIN bls_elect_info on zjc_ck_block_table.elect_height=bls_elect_info.elect_height '
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
            ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
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
                    data = item[12]
                    try:
                        data = hex_to_str(data)
                    except Exception as ex:
                        pass

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
                        "data": data,
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
                        "tx_size": item[9],
                        "version": item[10],
                        "nodes": "2864341299694b31d0d9bcc0e35b7aeb3cf7aaae,b846b4b9631bcc0d32ca67a4545ec9d926549129,0bffcf3b6857658d047a36a1fd6a3d8f8e5fe382",
                        "bls_agg_sign": item[12] + "," + item[13],
                        "commit_bitmap": item[14],
                        "common_pk": item[15],
                    })
            return JsonHttpResponse({'status': 0, 'cmd': cmd, 'value': tmp_result})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        return JsonHttpResponse({'status': 1, 'msg': 'msg'})

def transactions(request):
    return tmp_transactions(request, False)

def post_data(path: str, data: dict):
    querystr = urlencode(data)
    print(path)
    print(data)
    res = requests.post(path, data=data, headers={
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': str(len(bytes(querystr, 'utf-8'))),
    })
    print(res)
    return res

def transaction(request):
    if request.method == 'POST':
        # to, amount, sign, pkbytes, value
        gid = request.POST.get('gid')
        to = request.POST.get('to')
        gas_limit = int(request.POST.get('gas_limit'))
        amount = int(request.POST.get('amount'))
        sign_r = request.POST.get('sign_r')
        sign_s = request.POST.get('sign_s')
        sign_v = request.POST.get('sign_v')
        pubkey = request.POST.get('pubkey')
        key = request.POST.get('key')
        value = request.POST.get('val')
        data = {
            "gid": gid,
            "pubkey": pubkey,
            "to": to,
            "amount": amount,
            "gas_limit": gas_limit,
            "gas_price": 1,
            "type": 0,
            "shard_id": 3,
            "key": key,
            "val": value,
            "sign_r": sign_r,
            "sign_s": sign_s,
            "sign_v": sign_v
        }
        res = post_data("http://{}:{}/transaction".format("127.0.0.1", 23001), data)
        print(res.text)
        return JsonHttpResponse({'status': res.status_code, "msg": res.text})

def check_contract_deploy_success(request):
    if request.method == 'POST':
        contract_address = request.POST.get('contract_address')
        cmd = f"SELECT to FROM zjc_ck_account_key_value_table where type = 6 and key in ('5f5f6b437265617465436f6e74726163744279746573436f6465',  '5f5f6b437265617465436f6e74726163744279746573436f6465') and to='{contract_address}' limit 1;"
        try:
            ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
            result = ck_client.execute(cmd)
            tmp_result = []
            print(f"cmd: {cmd}, result: {result}")
            for item in result:
                if item[0] == contract_address:
                    return JsonHttpResponse({'status': 0, 'msg': "ok"})
                
            return JsonHttpResponse({'status': 1, 'msg': "not found"})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        
def check_contract_prepayment_success(request):
    if request.method == 'POST':
        address = request.POST.get('address')
        contract_address = request.POST.get('contract_address')
        prepayment = request.POST.get('prepayment')
        cmd = f"select count(distinct(user)) from zjc_ck_prepayment_table where contract='{contract_address}' and user='{address}' and prepayment>={prepayment};"
        try:
            ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
            result = ck_client.execute(cmd)
            print(f"cmd: {cmd}, result: {result}")
            for item in result:
                if item[0] == 1:
                    return JsonHttpResponse({'status': 0, 'msg': "ok"})
                
            return JsonHttpResponse({'status': 1, 'msg': "not found"})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        
def vpn_transactions(request):
    if request.method == 'POST':
        limit = request.POST.get('limit')
        addr = request.POST.get('addr')
        vpn_addr = request.POST.get('vpn_addr')
        order = request.POST.get('order')
        data_type = 0
        where_str = " (`from`='" + addr + "' and `to`='" + vpn_addr + "') or (`from`='" + vpn_addr + "' and `to`='" + addr + "') "
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
            ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
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


        if shard is None:
            shard = -1

        if pool is None:
            pool = -1

        if limit is None:
            limit = ""
            
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
            cmd += " where " + where_str + " and id != ''"
        else:
            cmd += " where " + " id != ''"


        if order is not None:
            cmd += " " + order + " "

        if limit != "":
            cmd += " limit " + limit
        else:
            cmd += " limit 100 "

        try:

            ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
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
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        return JsonHttpResponse({'status': 1, 'msg': 'msg'})


def get_statistics(request):
    if request.method == 'POST':
        limit = request.POST.get('limit')
        cmd = 'SELECT time, all_zjc, all_address, all_contracts, all_transactions, all_nodes FROM zjc_ck_statistic_table order by time desc limit 1'
        tmp_result = None
        try:

            ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
            tmp_result = ck_client.execute(cmd)
        except Exception as ex:
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
            ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
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
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        block_num = ZjcCkBlockTable.objects.count()
        res_result['block_num'] = block_num
        return JsonHttpResponse({'status': 0, 'cmd': cmd, 'value': res_result, 'cmp': res_result_prev})


def get_bytescode(request):
    if request.method == 'POST':
        sorce_codes = request.POST.get('sorce_codes')
        try:
            filename = "./tmp/" + uuid.uuid4().hex
            fo = open(filename, "w")
            fo.write(sorce_codes)
            fo.close()
            f = os.popen("solc --bin " + filename)
            bin_code = f.read()
            bin_code_arr = bin_code.split("\n")
            return JsonHttpResponse({'status': 0, 'code': bin_code_arr[3]})
        except Exception as ex:
            logger.error('select fail:' +  (str(ex)))
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        return JsonHttpResponse({'status': 1, 'msg': 'msg'})


def addtwodimdict(thedict, key_a, key_b, val):
    if key_a in thedict:
        thedict[key_a].update({key_b: val})
    else:
        thedict.update({key_a: {key_b: val}})

def get_all_nodes_bls_info(request):
    if request.method == 'POST':
        try:
            elect_height = int(request.POST.get('elect_height'))
            offset = int(request.POST.get('offset'))
            step = int(request.POST.get('step'))
            if elect_height == 0:
                cmd = "select elect_height, member_idx, local_pri_keys, local_pub_keys, swap_sec_keys, local_sk, common_pk from bls_elect_info where shard_id = 3 order by elect_height desc limit 4;"
            else:
                if offset < 0:
                    cmd = "select elect_height, member_idx, local_pri_keys, local_pub_keys, swap_sec_keys, local_sk, common_pk from bls_elect_info where shard_id = 3 and elect_height < %d order by elect_height desc limit 4;" % elect_height
                else:
                    cmd = "select elect_height, member_idx, local_pri_keys, local_pub_keys, swap_sec_keys, local_sk, common_pk from bls_elect_info where shard_id = 3 and elect_height > %d order by elect_height desc limit 4;" % elect_height

            res_arr = []
            ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
            result = ck_client.execute(cmd)
            if len(result) < 0:
                return JsonHttpResponse({'status': 1, 'msg': "no data"})

            for item in result:
                if step == 1:
                    json_item = {
                        "node_index": int(item[1]),
                        "local_pri_keys": item[2],
                        "local_pub_keys": item[3],
                    }

                    res_arr.append(json_item)
                elif step == 2:
                    json_item = {
                        "node_index": int(item[1]),
                        "local_pub_keys": item[3],
                        "swap_sec_keys": item[4],
                    }

                    res_arr.append(json_item)
                else:
                    json_item = {
                        "node_index": int(item[1]),
                        "local_sk": item[5],
                        "common_pk": item[6],
                    }

                    res_arr.append(json_item)

            print(json.dumps({'status': 0, 'cmd': cmd, 'value': res_arr, "elect_height": int(result[0][0])}, ensure_ascii=False))
            return JsonHttpResponse({'status': 0, 'cmd': cmd, 'value': res_arr, "elect_height": int(result[0][0])})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        
def confirm_transactions(request):
    if request.method == 'POST':
        try:
            block_hash = request.POST.get('hash')
            height = request.POST.get('height')
            shard = request.POST.get('shard')
            pool = request.POST.get('pool')
            limit = request.POST.get('limit')
            search_str = request.POST.get('search')
            data_type = request.POST.get('type')
            if data_type is None:
                data_type = 0
            else:
                data_type = int(data_type)

            if data_type == 1:
                request.POST.set()
                return tmp_transactions(request, True)
            
            if search_str is None:
                search_str = ""

            if shard is None:
                shard = -1

            if pool is None:
                pool = -1

            if limit is None:
                limit = ""

            order = request.POST.get('order')
            where_str = " to = 'a0793c84fb3133c0df1b9a6ccccbbfe5e7545138' "
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
                    where_str += " and hash = " + str2r(block_hash)
                else:
                    where_str += " hash = " + str2r(block_hash)

            if search_str != "":
                if where_str != "":
                    where_str += " and "

                where_str += "( gid = '" + search_str + "' or from = '" + search_str + "' or to = '" + search_str + "' or hash = '" + search_str + "' or prehash = '" + search_str + "' )"
        
            cmd = 'SELECT shard_id, pool_index, height, type, timestamp, gid, from, to, amount, gas_limit, gas_used, gas_price, storages FROM zjc_ck_transaction_table '

            if where_str != "":
                cmd += " where " + where_str + " and storages != ''"
            else:
                cmd += " where storages != ''"


            if order is not None:
                cmd += " " + order + " "
            else:
                cmd += " order by timestamp desc "

            if limit != "":
                cmd += " limit " + limit
            else:
                cmd += " limit 100 "


            ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
            result = ck_client.execute(cmd)
            tmp_result = []
            for item in result:
                dt_object = ""
                dt_object = datetime.datetime.fromtimestamp(int(item[4] / 1000) + 8 * 3600)
                dt_object = dt_object.strftime("%Y/%m/%d %H:%M:%S") + "." + str(item[4] % 1000)
                data = item[12]
                try:
                    data = hex_to_str(data)
                except Exception as ex:
                    pass

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
                    "data": data,
                    "Gas": item[10] * item[11]
                })
                
            return JsonHttpResponse({'status': 0, 'cmd': cmd, 'value': tmp_result})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        return JsonHttpResponse({'status': 1, 'msg': 'msg'})
    
ars_addrs = [
    "27e5ab858583f1d19ef272856859658246cd388f",
    "1a31f75df2fba7607ae8566646a553451a1b8c14",
    "5bc3423d99bcc823769fe36f3281739e3d022290",
]

def ArsCreateNewVote(id, src_content):
    key = "tarscr"
    value = ",".join(ars_addrs) + "-2," + id
    key_len = len(key)
    if key_len <= 9:
        key_len = "0" + str(key_len)
    else:
        key_len = str(key_len)
    
    param = key + key_len + key + value
    hexparam = encode_hex(param)
    gid = shardora_api.gen_gid()
    func_param = shardora_api.keccak256_str(
        "CreateNewArs(uint256,uint256,bytes32,bytes)")[:8] + encode_hex(encode(['uint256', 'uint256', 'bytes32', 'bytes'], [3, 2, decode_hex(id), decode_hex(hexparam)]))[2:]
    res = shardora_api.transfer(
        'cefc2c33064ea7691aee3e5e4f7842935d26f3ad790d81cf015e79b78958e848',
        ars_contarct_address,
        0,
        8,
        gid,
        "",
        func_param,
        "def",
        src_content)
    return res

def ArsVote(id, src_content, value):
    key = "tarsps"
    key_len = len(key)
    if key_len <= 9:
        key_len = "0" + str(key_len)
    else:
        key_len = str(key_len)
    
    param = key + key_len + key + value
    hexparam = encode_hex(param)
    gid = shardora_api.gen_gid()
    func_param = shardora_api.keccak256_str(
        "SingleSign(bytes32,bytes)")[:8] + encode_hex(encode(['bytes32', 'bytes'], [decode_hex(id), decode_hex(hexparam)]))[2:]
    res = shardora_api.transfer(
        'cefc2c33064ea7691aee3e5e4f7842935d26f3ad790d81cf015e79b78958e848',
        ars_contarct_address,
        0,
        8,
        gid,
        "",
        func_param,
        "def",
        src_content)
    return res

def ars_create_sec_keys(request):
    try:
        post_data = {
            "keys": "-".join(ars_addrs),
            "signer_count": 2,
        }

        nodes_res = _post_data("http://{}:{}/ars_create_sec_keys".format("127.0.0.1", 23001), post_data)
        print(f"get node res {nodes_res.text}")
        res_json = json.loads(nodes_res.text)
        return JsonHttpResponse(res_json)
    except Exception as ex:
        return JsonHttpResponse({'status': 1, 'msg': str(ex)})


def ars_get_contract_info(request):
    sol_cotent = linux_file_cmd.LinuxFileCommand().read_file("/root/shardora/src/contract/tests/contracts/ars.sol")
    if sol_cotent is None:
        return JsonHttpResponse({'status': 1, 'msg': "read solidity file failed!"})
    
    return JsonHttpResponse({'status': 0, 'msg': 'ok', 'solidity': sol_cotent, 'desc': '多方共建用户信誉系统'})

def ars_create_new_vote(request):
    if request.method == 'POST':
        try:
            json_content = {
                "username": request.POST.get('username'),
                "addr": request.POST.get('addr'),
                "now_credit": int(request.POST.get('now_credit')),
                "add_credit": int(request.POST.get('add_credit')),
            }
            id = shardora_api.gen_gid()
            res = ArsCreateNewVote(id, id+"0"+str_to_hex(json.dumps(json_content)))
            if res.status_code != 200:
                return JsonHttpResponse({'status': 1, 'msg': "error"})
            else:
                return JsonHttpResponse({'status': 0, 'id': id, 'msg': "ok"})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})


def ars_vote(request):
    if request.method == 'POST':
        try:
            id = request.POST.get('id')
            data = "00"
            index = int(request.POST.get('index')) - 1
            if index > len(ars_addrs):
                return JsonHttpResponse({'status': 1, 'msg': f"index {index} error"})

            addr = ars_addrs[index]
            group_info = request.POST.get('group_info')
            if group_info is None:
                group_info = ""

            print(f"ars vote id {id}, index: {index}, group_info: {group_info}")
            val =f"{index},{data},{addr}-{id}"
            res = ArsVote(id, id+"1"+group_info, val)
            if res.status_code != 200:
                return JsonHttpResponse({'status': 1, 'msg': "error"})
            else:
                return JsonHttpResponse({'status': 0, 'id': id, 'msg': "ok"})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        
def ars_transactions(request):
    if request.method == 'POST':
        try:
            block_hash = request.POST.get('hash')
            height = request.POST.get('height')
            shard = request.POST.get('shard')
            pool = request.POST.get('pool')
            limit = request.POST.get('limit')
            search_str = request.POST.get('search')
            data_type = request.POST.get('type')
            if data_type is None:
                data_type = 0
            else:
                data_type = int(data_type)

            if data_type == 1:
                return tmp_transactions(request, True)
            
            if search_str is None:
                search_str = ""

            if shard is None:
                shard = -1

            if pool is None:
                pool = -1

            if limit is None:
                limit = ""
                
            order = request.POST.get('order')
            where_str = " to = '08e1eab96c9e759daa3aff82b40e77cd615a41d5' "
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
                    where_str += " and hash = " + str2r(block_hash)
                else:
                    where_str += " hash = " + str2r(block_hash)

            if search_str != "":
                if where_str != "":
                    where_str += " and "

                where_str += "( gid = '" + search_str + "' or from = '" + search_str + "' or to = '" + search_str + "' or hash = '" + search_str + "' or prehash = '" + search_str + "' )"
        
            cmd = 'SELECT shard_id, pool_index, height, type, timestamp, gid, from, to, amount, gas_limit, gas_used, gas_price, storages FROM zjc_ck_transaction_table '

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

            ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
            result = ck_client.execute(cmd)
            tmp_result = []
            id_map = {}
            for item in result:
                data = item[12]
                try:
                    data = hex_to_str(data)
                except Exception as ex:
                    pass

                if len(data) > 65:
                    id = data[0: 64]
                    data_type = int(data[64: 65])
                    data = data[65:]
                    print(f"get tx info id: {id}, data type: {data_type} data: {data}")
                    if id not in id_map:
                        id_map[id] = {}

                    if data_type == 0:
                        user_info = json.loads(hex_to_str(data))
                        print(f"get tx info id: {id}, data type: {data_type} data: {data} json data: {user_info}")
                        id_map[id][data_type] = user_info
                        if 1 in id_map[id]:
                            if id_map[id][1] >= 2:
                                id_map[id][0]["now_credit"] += id_map[id][0]["add_credit"]

                    if data_type == 1:
                        if data_type not in id_map[id]:
                            id_map[id][data_type] = 1
                        else:
                            id_map[id][data_type] += 1

            for item in result:
                dt_object = ""
                dt_object = datetime.datetime.fromtimestamp(int(item[4] / 1000) + 8 * 3600)
                dt_object = dt_object.strftime("%Y/%m/%d %H:%M:%S") + "." + str(item[4] % 1000)
                data = item[12]
                try:
                    data = hex_to_str(data)
                except Exception as ex:
                    pass

                group_info = ""
                agg_sign = ""
                user_info = {
                    "username": "",
                    "addr": "",
                    "now_credit": 0,
                    "add_credit": 0,
                }

                voted_count = 0
                if len(data) > 65:
                    id = data[0: 64]
                    print(data + ":" + id)
                    data_type = int(data[64: 65])
                    data = data[65:]
                    if data_type == 1:
                        splits = data.split(",")
                        if len(splits) > 2 and len(splits[2]) > 64:
                            group_info = splits[0]
                            agg_sign = splits[2]
                        else:
                            if len(splits) > 1:
                                group_info = splits[0]
                                agg_sign = splits[1]
                            else:
                                group_info = data

                    if 0 in id_map[id]:
                        user_info = id_map[id][0]

                    if 1 in id_map[id]:
                        voted_count = id_map[id][1]

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
                    "vote_id": id,
                    "vote_count": voted_count,
                    "data": data,
                    "group_info": group_info,
                    "username": user_info["username"],
                    "useraddr": user_info["addr"],
                    "agg_sign": agg_sign,
                    "user_now_credit": 0, # user_info["now_credit"],
                    "user_add_credit": user_info["add_credit"],
                    "Gas": item[10] * item[11]
                })
                
            return JsonHttpResponse({'status': 0, 'cmd': cmd, 'value': tmp_result})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        return JsonHttpResponse({'status': 1, 'msg': 'msg'})


def do_transaction():
    res = shardora_api.transfer(
        '373a3165ec09edea6e7a1c8cff21b06f5fb074386ece283927aef730c6d44596',
        'ce7acc2cfbfdeddc7c033fc157f3854cc4e72d7b',
        amount=1000)
    print(res)

def CreatePrivateAndPublicKeys(id, src_content):
    key = "tpinit"
    value = id+";29eb86b7292ce572e46c6bdf8d8639dc6918991b,5b88d2cc46b94f199d12ff3c050c2db337871051,792e703d820ee43e5014803297208e7a774ceaa5,713b6605d93f07badf314cafe941ba2c4c6ad4bc,52a888b6437f8ebde99ec8929ff3f0f1fa533ad5,01a9a0ad9d65bcf47bb3326da7fd2aef8c18ea88,55c6b8dd50c1430969022788787d972848158c46,19b65ddc3cafa7942e5ac54394f09f1990ca2ac7,19d981de4f615ab95e61553421c358b96e997a2c,7bdc787d0aaddf760eab83de971028712123f1ca"
    key_len = len(key)
    if key_len <= 9:
        key_len = "0" + str(key_len)
    else:
        key_len = str(key_len)
    
    param = key + key_len + key + value
    hexparam = encode_hex(param)
    content = encode_hex(src_content)
    gid = shardora_api.gen_gid()
    func_param = shardora_api.keccak256_str(
        "CreatePrivateAndPublicKeys(bytes32,bytes32,bytes,bytes)")[:8] + encode_hex(encode(['bytes32', 'bytes32', 'bytes', 'bytes'], [decode_hex(id), decode_hex(gid), decode_hex(content), decode_hex(hexparam)]))[2:]
    res = shardora_api.transfer(
        'cefc2c33064ea7691aee3e5e4f7842935d26f3ad790d81cf015e79b78958e848',
        penc_contarct_address,
        0,
        8,
        gid,
        "",
        func_param,
        "def",
        id+"0"+src_content)
    return res

def CreateReEncryptionKeys(id, src_content):
    key = "tprenk"
    value = id+";468a50340bc016c5161df8a40dd7890a84132750,204be12c7d5a77f4cecca96aeb1aadd0dc11e829,4d84890349d26fa23fb94ee32d16a4a522025072,4855a79cbcfc3d54cd99d504872beee01c8f9096,543cf9eec69613a4a01c28ebe64e50fbe234b57f,026047a338ee52e99f611bd02e9e5b12ecb83b74,35c95955d7bca26ccea47b3bf1aacc5936b53c5a,5e1694b4226bd0e1b75b71a249d6126c87d14a9e,48d9915add7e5bf58e5ad8adef850fb899c3d6ea,166ab66ee71d78d357c2c69697267c30fb820c65\n578997ffbf36d620eabeed6c6462090bf4850063,1ca9d6839beec8a8ae44aa717b217ea49929333d,6f20963912e7b78aba3a27850a53e2d2898d156d\n77f1868888fea3dc4cf479b9fed840c50e7b80e6,1c4bdf20371da32c30499e0e46438dcd0f829c21,3029b3818313522b65700c0bfaffe8741acfd1de\n4544042ac99c72c0740f78945b3842d90e362da3ce950cd40daa73da7651ab2908318301af471419fbd37334b8514a7031f70761bbf5b3755c4221cf7147ec1153066cef10869dff1ab7f6d39043dbc8287f06f6588e9418b3f253e501ae3881daf1a54363a37c5f4a3a9ba8b4a5cdfeea0993aef11fb0187ebb57a18eec290a,3b5987fc4a0a333f36376062f4b917560901e80e765b908a982bb33d276eb8fdacbfeffb63baefb81559c032d47e0afc1c4d70c4785cef138027f296c4585b17500b95dcb5a1e67458dbefb741f1ecd9fb100e50bd6ece1fe23714238d468a92eafaaa1c7ac6d2f6e722480b5729eff536c6e5d2262c5be3cc4f2c469fa8e2ea,8b94d276adea01a630b195216a210bdda9e4a07929d3a3c3d5660bc3a9726f75d2ba89bf64089b505562ac0c3a6f81e28936ddd235eaf185bd63c6e7ccd459187094a3f5e2c2a2b36b01ba8f6a072194cb276f3700440c972aa6b194c150a2a5e0c72f1df1689a01f60b42c270e2bfbbf6ced7edfd677816aadb4d8a5da6e72a,849ff0d2ffabf448864463b78d7de061e0142cbe12131b7f944c6df368c8d3223067e68f1f555b995c84320466b43f4dbef933ef201b433cd97972f371113f3a4adedaaec087673ab079bf217e3ee54bf7fa03435addb2262a99f04ef203b99108bcee8555189b543fb353998345e8f20b9f1a25f92d0ef501338ed28dbb27f0,3850f3d6b6e8305c7bf536e024843d8f9170660e514bae7342152aa14e07eb3b75f462d6226c34e00398e48bfd9265a07684a9ddb5bba7c8010a029f25784b992a0559ec761f0d72728ad37df2c067cff8c0b1f33516cd1b5f2a01def52abd782f114e545725dc8a79be4453552c7b99b8c71298661d6a2e17e0e7858f2c4d51,1e8b6f9ecc6c317d51923ff1a730365237115c99cb573f19241e7ae3938a817df95d45ccd7fcbea2d87c97b2a1be265e43a5a270913d1c14dfa19866ccd55bc04889db7f30cb04f210c73520ee72175b7c26cf9324a55755e5f4dc6eab57b9d0c8a9ee538adf84880dc0f5d181fb15f352cade261cf4a6c0376e4144399275c6,7a669e8d8a9cbb185626b0af4eb467cb86ee1e5393165544715e7486198394319e1b8790335ff5949d17a4054974e84e703c85b7bbfc1e577e2feeaaeaf16acb83ba19a36403aab7f796788fa31546a72e5b7b4d419b49a1fa63757791390d3327debb38e7b6fcc80df28c67c119368b57e989bb1bc7ea667b642f1f71b7181b,a008e91fc6085a0386b0076edc3796a2a0c431e5f946556ae63c9a173a47fe08eae37b9fce61c05138c4a04de7fe024afdacc556f9d0fbb5020c03ae8b5173de4b4933b9ce0c611bd0ce6eb6b68947e12b5c7a4e93febc1b880c6e9e917aeebd9da5e3f9251f83150d2b89654f8631ed0e7f53ccc67dbfc2cb495747391ca550,4749b5b7cfb6c8e9f7418615a53d94b582cc873a8e586ac06837885f22d44bdca39ff8109b19372481b7c58cc7dd91958abd20b26eaffb38006c8c1874714e2615403ad7b65ebd01c98be53382f77c25c69a8fd2e0ca490271a77ee2118bd541223a73b45b9ea26109fb5274360aa276437271c1a9a78e5b026ed63aec01146d\n4eb24680d02ab2ba45ef78e8b425f7c94eb662d0,3545ad3b3fe0c2f4c08a900eae3d03c87969ba6c,336293b77152b9e4d718481c6153c2d4369561b5,578e3eb7048153b05577276a0b1c1059140be7c9,604e8223208efb81daa9778237fa75fc22344a1c,138eb8b0d8c6073a080179935b8b9b92d00c589b,0f2ea3cf55743836fbbf9a5756a524be3adb1c78,247922d501351bfea6ab14bab95cf0cf912ef84e,78cddbd9d4299c953cfa839feac915e0bcdf7bce"
    key_len = len(key)
    if key_len <= 9:
        key_len = "0" + str(key_len)
    else:
        key_len = str(key_len)
    
    param = key + key_len + key + value
    hexparam = encode_hex(param)
    content = encode_hex(src_content)
    gid = shardora_api.gen_gid()
    func_param = shardora_api.keccak256_str(
        "CreateReEncryptionKeys(bytes32,bytes32,bytes,bytes)")[:8] + encode_hex(encode(['bytes32', 'bytes32', 'bytes', 'bytes'], [decode_hex(id), decode_hex(gid), decode_hex(content), decode_hex(hexparam)]))[2:]
    res = shardora_api.transfer(
        'cefc2c33064ea7691aee3e5e4f7842935d26f3ad790d81cf015e79b78958e848',
        penc_contarct_address,
        0,
        8,
        gid,
        "",
        func_param,
        "def",
        id+"1"+src_content)
    return res

def EncryptUserMessage(id, seckey, src_content):
    key = "tpencu"
    value = id+";"+seckey
    key_len = len(key)
    if key_len <= 9:
        key_len = "0" + str(key_len)
    else:
        key_len = str(key_len)
    
    param = key + key_len + key + value
    hexparam = encode_hex(param)
    content = encode_hex(src_content)
    gid = shardora_api.gen_gid()
    func_param = shardora_api.keccak256_str(
        "EncryptUserMessage(bytes32,bytes32,bytes,bytes)")[:8] + encode_hex(encode(['bytes32', 'bytes32', 'bytes', 'bytes'], [decode_hex(id), decode_hex(gid), decode_hex(content), decode_hex(hexparam)]))[2:]
    res = shardora_api.transfer(
        'cefc2c33064ea7691aee3e5e4f7842935d26f3ad790d81cf015e79b78958e848',
        penc_contarct_address,
        0,
        8,
        gid,
        "",
        func_param,
        "def",
        id+"2"+src_content)
    return res

def ReEncryptUserMessage(id, src_content):
    key = "tprenc"
    value = id+";"
    key_len = len(key)
    if key_len <= 9:
        key_len = "0" + str(key_len)
    else:
        key_len = str(key_len)
    
    param = key + key_len + key + value
    hexparam = encode_hex(param)
    content = encode_hex(src_content)
    gid = shardora_api.gen_gid()
    func_param = shardora_api.keccak256_str(
        "ReEncryptUserMessage(bytes32,bytes32,bytes,bytes)")[:8] + encode_hex(encode(['bytes32', 'bytes32', 'bytes', 'bytes'], [decode_hex(id), decode_hex(gid), decode_hex(content), decode_hex(hexparam)]))[2:]
    res = shardora_api.transfer(
        'cefc2c33064ea7691aee3e5e4f7842935d26f3ad790d81cf015e79b78958e848',
        penc_contarct_address,
        0,
        8,
        gid,
        "",
        func_param,
        "def",
        id+"3"+src_content)
    return res

def ReEncryptUserMessageWithMember(id, index, src_content):
    key = "mprenc"
    value = id+";"+str(index)
    key_len = len(key)
    if key_len <= 9:
        key_len = "0" + str(key_len)
    else:
        key_len = str(key_len)
    
    param = key + key_len + key + value
    hexparam = encode_hex(param)
    content = encode_hex(src_content)
    gid = shardora_api.gen_gid()
    func_param = shardora_api.keccak256_str(
        "ReEncryptUserMessageWithMember(bytes32,bytes32,bytes,bytes)")[:8] + encode_hex(encode(['bytes32', 'bytes32', 'bytes', 'bytes'], [decode_hex(id), decode_hex(gid), decode_hex(content), decode_hex(hexparam)]))[2:]
    res = shardora_api.transfer(
        'cefc2c33064ea7691aee3e5e4f7842935d26f3ad790d81cf015e79b78958e848',
        penc_contarct_address,
        0,
        8,
        gid,
        "",
        func_param,
        "def",
        id+"4"+src_content)
    return res

def Decryption(id, seckey, src_content):
    key = "tprdec"
    value = id+";"+seckey
    key_len = len(key)
    if key_len <= 9:
        key_len = "0" + str(key_len)
    else:
        key_len = str(key_len)
    
    param = key + key_len + key + value
    hexparam = encode_hex(param)
    gid = shardora_api.gen_gid()
    func_param = shardora_api.keccak256_str(
        "JustCallRipemd160(bytes)")[:8] + encode_hex(encode(['bytes'], [decode_hex(hexparam)]))[2:]
    res = shardora_api.transfer(
        'cefc2c33064ea7691aee3e5e4f7842935d26f3ad790d81cf015e79b78958e848',
        penc_contarct_address,
        0,
        8,
        gid,
        "",
        func_param,
        "def",
        src_content)
    return res

def _post_data(path: str, data: dict):
    querystr = urlencode(data)
    print(path)
    print(data)
    res = requests.post(path, data=data, headers={
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': str(len(bytes(querystr, 'utf-8'))),
    })
    print(res)
    return res

def penc_get_sec_keys(request):
    try:
        id = request.POST.get('id')
        sk_bytes = bytes.fromhex("cefc2c33064ea7691aee3e5e4f7842935d26f3ad790d81cf015e79b78958e848")
        key_pair = shardora_api.get_keypair(sk_bytes)
        post_data = {
            "id": id,
            "contract": "48e1eab96c9e759daa3aff82b40e77cd615a41d0",
            "count": 10,
        }

        nodes_res = _post_data("http://{}:{}/get_proxy_reenc_info".format("127.0.0.1", 23001), post_data)
        print(f"get node res {nodes_res.text}")
        res_json = json.loads(nodes_res.text)
        res_json['id'] = id
        return JsonHttpResponse(res_json)
    except Exception as ex:
        return JsonHttpResponse({'status': 1, 'msg': str(ex)})

def penc_create_sec_keys(request):
    if request.method == 'POST':
        try:
            content = request.POST.get('content')
            if content is None:
                content = ""

            id = shardora_api.gen_gid()
            res = CreatePrivateAndPublicKeys(id, content)
            if res.status_code != 200:
                return JsonHttpResponse({'status': 1, 'msg': res.data})
        
            return JsonHttpResponse({'status': 0, 'msg': "ok", "id": id})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})

def penc_get_contract_info(request):
    try:
        sol_cotent = linux_file_cmd.LinuxFileCommand().read_file("/root/shardora/src/contract/tests/contracts/proxy_reencyption.sol")
        if sol_cotent is None:
            return JsonHttpResponse({'status': 1, 'msg': "read solidity file failed!"})
        
        return JsonHttpResponse({'status': 0, 'msg': 'ok', 'solidity': sol_cotent, 'desc': '基于区块链的数据安全共享'})
    except Exception as ex:
        return JsonHttpResponse({'status': 1, 'msg': str(ex)})


def penc_share_new_data(request):
    if request.method == 'POST':
        try:
            id = request.POST.get('id')
            content = request.POST.get('content')
            if content is None:
                content = ""
                
            post_data = {
                "data": content,
            }

            encrypt_res = _post_data("http://{}:{}/get_seckey_and_encrypt_data".format("127.0.0.1", 23001), post_data)
            logger.info("ok")
            logger.info(encrypt_res)
            logger.info(f"get encrypt res {encrypt_res.text}")
            encrypt_res_json = json.loads(encrypt_res.text)
            res = EncryptUserMessage(id, encrypt_res_json["hash_seckey"], encrypt_res_json["secdata"])
            if res.status_code != 200:
                return JsonHttpResponse({'status': 1, 'msg': res.data})
            
            return JsonHttpResponse({'status': 0, 'msg': "ok", "sec": encrypt_res_json["hash_seckey"], "sec_data": encrypt_res_json["secdata"]})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
    
def penc_vote(request):
    if request.method == 'POST':
        try:
            id = request.POST.get('id')
            content = request.POST.get('group_info')
            if content is None:
                content = ""
                
            content = content
            res = ReEncryptUserMessage(id, content)
            if res.status_code != 200:
                return JsonHttpResponse({'status': 1, 'msg': res.data})
            
            return JsonHttpResponse({'status': 0, 'msg': "ok"})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        
def penc_get_share_data(request):
    if request.method == 'POST':
        try:
            id = request.POST.get('id')
            seckey = request.POST.get('seckey')
            enc_data = request.POST.get('encData')
            post_data = {
                "id": id,
                "enc_data": enc_data,
            }

            dec_res = _post_data("http://{}:{}/proxy_decrypt".format("127.0.0.1", 23001), post_data)
            logger.info("ok")
            logger.info(dec_res)
            logger.info(f"get decrypt res {dec_res.text}")
            # return JsonHttpResponse({'status': 0, 'msg': "ok"})
            dec_res_json = json.loads(dec_res.text)
            return JsonHttpResponse({
                'status': 0, 'msg': "ok", 
                "seckey": dec_res_json["seckey"], 
                "hash_seckey": dec_res_json["hash_seckey"], 
                "encdata": dec_res_json["encdata"], 
                "decdata": dec_res_json["decdata"]})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})

def is_hex_str(s):
    pattern = re.compile(r'^[0-9a-fA-F]+$')
    return bool(pattern.match(s))

def penc_transactions(request):
    if request.method == 'POST':
        # try:
            block_hash = request.POST.get('hash')
            height = request.POST.get('height')
            shard = request.POST.get('shard')
            pool = request.POST.get('pool')
            limit = request.POST.get('limit')
            search_str = request.POST.get('search')
            data_type = request.POST.get('type')
            if data_type is None:
                data_type = 0
            else:
                data_type = int(data_type)

            if data_type == 1:
                return tmp_transactions(request, True)
            
            if search_str is None:
                search_str = ""

            if shard is None:
                shard = -1

            if pool is None:
                pool = -1

            if limit is None:
                limit = ""

            order = request.POST.get('order')
            where_str = f" to = '{penc_contarct_address}' "
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
                    where_str += " and hash = " + str2r(block_hash)
                else:
                    where_str += " hash = " + str2r(block_hash)

            if search_str != "":
                if where_str != "":
                    where_str += " and "

                where_str += "( gid = '" + search_str + "' or from = '" + search_str + "' or to = '" + search_str + "' or hash = '" + search_str + "' or prehash = '" + search_str + "' )"
        
            cmd = 'SELECT shard_id, pool_index, height, type, timestamp, gid, from, to, amount, gas_limit, gas_used, gas_price, storages FROM zjc_ck_transaction_table '

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

            ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
            result = ck_client.execute(cmd)
            tmp_result = []
            id_map = {}
            for item in result:
                data = item[12]
                try:
                    data = hex_to_str(data)
                except Exception as ex:
                    pass

                print(data)
                if len(data) > 65:
                    id = data[0: 64]
                    print(data + ":" + id)
                    try:
                        data_type = int(data[64: 65])
                        data = data[65:]

                        if id not in id_map:
                            id_map[id] = {}

                        if data_type == 0:
                            id_map[id][data_type] = data

                        if data_type == 2:
                            id_map[id][data_type] = data

                        if data_type == 3:
                            if data_type not in id_map[id]:
                                id_map[id][data_type] = 1
                            else:
                                id_map[id][data_type] += 1
                    except:
                        pass
                
            group_info = ""
            for item in result:
                dt_object = ""
                dt_object = datetime.datetime.fromtimestamp(int(item[4] / 1000) + 8 * 3600)
                dt_object = dt_object.strftime("%Y/%m/%d %H:%M:%S") + "." + str(item[4] % 1000)
                data = item[12]
                try:
                    data = hex_to_str(data)
                except Exception as ex:
                    pass

                share_data = ""
                vote_count = 0
                prxoy_reenc_id = ""
                if len(data) > 65:
                    id = data[0: 64]
                    try:
                        data_type = int(data[64: 65])
                    except:
                        continue
                    
                    if id not in id_map:
                        continue
                    
                    data = data[65:]
                    prxoy_reenc_id = id
                    if 2 in id_map[id]:
                        share_data = id_map[id][2]

                    if 3 in id_map[id]:
                        vote_count = id_map[id][3]

                    if data_type == 3 and not is_hex_str(data):
                        group_info = data

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
                    "group_info": group_info,
                    "prxoy_reenc_id": prxoy_reenc_id,
                    "data": data,
                    "share_data": share_data,
                    "vote_count": vote_count,
                    "Gas": item[10] * item[11]
                })
            return JsonHttpResponse({'status': 0, 'cmd': cmd, 'value': tmp_result})
        # except Exception as ex:
        #     return JsonHttpResponse({'status': 1, 'msg': str(ex)})

def get_all_contracts(request):
    if request.method == 'POST':
        contracts = request.POST.get('contracts')
        limit = request.POST.get('limit')
        where_str = "where type = 6 and key in('5f5f6b437265617465436f6e74726163744279746573436f6465', '5f5f6b437265617465436f6e74726163744279746573436f6465') "
        if (contracts.endswith(',')):
            contracts = contracts[0: len(contracts) - 1]

        contracts = "'" + contracts + "'"
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

            ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
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

            ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
            result = ck_client.execute(cmd)
            res_arr = []
            print(result)
            for item in result:
                res_arr.append(item[0])

            print(res_arr)
            return JsonHttpResponse({'status': 0, 'cmd': cmd, 'value': res_arr})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        return JsonHttpResponse({'status': 1, 'cmd': cmd, 'msg': 'msg'})


def get_contract_detail(request):
    if request.method == 'POST':
        contract_id = request.POST.get('contract_id')
        if contract_id == "44a5c714cb3f502fb77618a4a0353d96148fde7e":
            sol_cotent = "// just create transaction"
            if sol_cotent is None:
                return JsonHttpResponse({'status': 1, 'msg': "read solidity file failed!"})
            
            return JsonHttpResponse({'status': 0, 'msg': 'ok', 'solidity': sol_cotent, 'desc': '直接在交易中发起确权即可'})
    
        where_str = "where type = 6 and key in('5f5f6b437265617465436f6e74726163744279746573436f6465', '5f5f6b437265617465436f6e74726163744279746573436f6465') and to ='" + contract_id + "'";
        cmd = 'SELECT from, to, key, value FROM zjc_ck_account_key_value_table '
        if where_str != "":
            cmd += where_str

        try:

            ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
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
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        return JsonHttpResponse({'status': 1, 'cmd': cmd, 'msg': 'msg'})


def get_block_detail(request, block_hash):
    try:
        cmd = "select id,shard_id,pool_index,height,prehash,hash,version,vss,elect_height,bitmap,timestamp,timeblock_height,bls_agg_sign_x,bls_agg_sign_y,commit_bitmap,tx_size,date from zjc_ck_block_table where hash='%s'" % block_hash
        ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
        result = ck_client.execute(cmd)
        if len(result) <= 0:
            return JsonHttpResponse({'status': 1, 'msg': "failed"})

        logger.error('get_block_detail fail cmd = %s>' % cmd)
        logger.error(result)
        tmpObj = {
            "id": result[0][0],
            "shard_id": result[0][1],
            "pool_index": result[0][2],
            "height": result[0][3],
            "prehash": result[0][4],
            "hash": result[0][5],
            "version": result[0][6],
            "vss": result[0][7],
            "elect_height": result[0][8],
            "bitmap": result[0][9],
            "timestamp": result[0][10],
            "timeblock_height": result[0][11],
            "bls_agg_sign_x": result[0][12],
            "bls_agg_sign_y": result[0][13],
            "commit_bitmap": result[0][14],
            "tx_size": result[0][15],
            "date": result[0][16]
        }
        cmd = "select sum(gas_used) as value from zjc_ck_block_table a inner join zjc_ck_transaction_table b on a.hash = b.hash" \
              " and  b.hash ='" + str(block_hash) + "' "\
              " group by b.hash " 
        result2 = ck_client.execute(cmd)
        logger.error('get_block_detail fail cmd = %s>' % cmd)
        logger.error(result2)
        if len(result2) <= 0:
            tmpObj['total_used_gas'] = 0
        else:
            tmpObj['total_used_gas'] = result2[0][0]
        return JsonHttpResponse({'status': 0, 'value': tmpObj})
    except Exception as ex:
        logger.error('get_block_detail fail hash = %s>' % block_hash)
        return JsonHttpResponse({'status': 1, 'msg': str(ex)})


def get_prikey(request, seckey):
    cmd = "select ecn_prikey from private_key_table where seckey='" + seckey + "'"
    ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
    result = ck_client.execute(cmd)
    if result is None or len(result) <= 0:
        return JsonHttpResponse({'status': 1, 'cmd': cmd, 'msg': 'account not exists.'})

    return JsonHttpResponse({
        'status': 0, 'cmd': cmd, 'prikey': result[0][0]})


def set_private_key(request):
    if request.method == 'POST':
        seckkey = request.POST.get('key')
        prkey = request.POST.get('enc')
        cmd = "insert into private_key_table values('" + seckkey + "', '" + prkey + "', 0, 0)"
        try:
            ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
            ck_client.execute(cmd)
            return JsonHttpResponse({'status': 0, 'msg': 'ok'})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})

def get_table_info(table_name, sell_hash):
    #(confirm_hash String,gid String,user String,data_id String,asset_id String
    if table_name is not None:
        cmd = (f"select confirm_hash,gid,user,data_id,asset_id,extern_info,sell_hash,table from exchange_data_meta_info where table='{table_name}' limit 1;")
    else:
        cmd = (f"select confirm_hash,gid,user,data_id,asset_id,extern_info,sell_hash,table from exchange_data_meta_info where sell_hash='{sell_hash}' limit 1;")
        
    ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
    result = ck_client.execute(cmd)
    if result is None or len(result) <= 0:
        logger.error(f'get table info fail cmd = {cmd}')
        return None

    return result[0]

def save_trace_info(tale_name, sell_hash, user, info):
    if tale_name is not None:
        table_info = get_table_info(table_name=tale_name, sell_hash=None)
    elif sell_hash is not None:
        table_info = get_table_info(table_name=None, sell_hash=sell_hash)

    if table_info is None:
        return False
    
    info["databaas_user"] = table_info[2]
    info["databaas_asset_id"] = table_info[4]
    info["databaas_data_id"] = table_info[3]
    info["databaas_confirm_hash"] = table_info[0]
    info["databaas_gid"] = table_info[1]
    info["exchange_user"] = user
    info["exchange_sell_hash"] = table_info[6]
    info_str = json.dumps(info)
    now_tm = int(time.time() * 1000)
    tale_name = table_info[7]
    cmd = f"insert into {tale_name}_trace_info values('{table_info[3]}', {now_tm}, '{user}', '{info_str}', false);"
    ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
    ck_client.execute(cmd)
    return True

def check_data_has_selled(tale_name):
    cmd = f"select sell_hash from exchange_data_meta_info where table='{tale_name}' and sell_hash='';"
    ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
    res = ck_client.execute(cmd)
    if len(res) <= 0:
        return False
    return True
    
def update_table_sell_hash(tale_name, sell_hash):
    if not check_data_has_selled(tale_name):
        print(f"update sell hash failed {tale_name} selled")
        return False
    
    cmd = f"ALTER TABLE exchange_data_meta_info update sell_hash='{sell_hash}' where table='{tale_name}' and sell_hash='';"
    ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
    res = ck_client.execute(cmd)
    logging.error(f"update sell hash cmd: {cmd}, res: {res}")
    print(f"update sell hash cmd: {cmd}, res: {res}")
    return True

def exchange_new_sell(request):
    if request.method == 'POST':
        try:
            hash = request.POST.get('hash')
            info = request.POST.get('info')
            info_json = json.loads(hex_to_str(info))
            table_name = info_json['table_name']
        
            price = int(request.POST.get('price'))
            start = int(request.POST.get('start'))
            end = int(request.POST.get('end'))
            private_key = request.POST.get('private_key')
            func_param = shardora_api.keccak256_str(
                "CreateNewItem(bytes32,bytes,uint256,uint256,uint256)")[:8] + encode_hex(
                    encode(['bytes32', 'bytes', 'uint256', 'uint256', 'uint256'], 
                    [decode_hex(hash), decode_hex(info), price, start, end]))[2:]
            key_pair = shardora_api.get_keypair(bytes.fromhex(private_key))
            id = exchange_contarct_address + key_pair.account_id
            addr_info = shardora_api.get_account_info(id)
            if addr_info is None:
                print(f"invalid private key {private_key} and get addr info failed: {id} ")
                sys.exit(1)

            print(f"did_contract_address: {addr_info}")
            nonce = int(addr_info["nonce"]) + 1
            res = shardora_api.transfer(
                private_key,
                exchange_contarct_address,
                0,
                nonce,
                8,
                "",
                func_param,
                "",
                "",
                0,
                check_tx_valid=True,
                gas_limit=9000000)
            if not res:
                print("call contract failed!")
            else:
                print("call contract success!")
            # res = shardora_api.transfer(
            #     private_key,
            #     exchange_contarct_address,
            #     0,
            #     8,
            #     gid,
            #     "",
            #     func_param,
            #     "",
            #     "",
            #     0,
            #     check_gid_valid=True)
            if not res:
                return JsonHttpResponse({'status': 1, 'msg': "error"})

            res = update_table_sell_hash(table_name, sell_hash=hash)
            if not res:
                return JsonHttpResponse({'status': 1, 'msg': f'update data sell hash failed, {table_name} not exists or selled'})

            if 'table_name' in info_json:
                key_pair = shardora_api.get_keypair(bytes.fromhex(private_key))
                table_name = info_json['table_name']
                info_json['create_hash'] = hash
                info_json['price'] = price
                info_json['start'] = start
                info_json['command'] = "exchange_new_sell"
                info_json['end'] = end
                info_json['gid'] = str(nonce)
                res = save_trace_info(table_name, None, key_pair.account_id, info_json)
                if not res:
                    return JsonHttpResponse({'status': 1, 'msg': 'save trace info failed!'})

            return JsonHttpResponse({'status': 0, 'msg': "ok"})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        
def exchange_purchase(request):
    if request.method == 'POST':
        try:
            hash = request.POST.get('hash')
            private_key = request.POST.get('private_key')
            price = int(request.POST.get('price'))
            func_param = shardora_api.keccak256_str(
                "PurchaseItem(bytes32,uint256)")[:8] + encode_hex(
                    encode(['bytes32','uint256'], 
                    [decode_hex(hash),int(time.time() * 1000)]))[2:]
            key_pair = shardora_api.get_keypair(bytes.fromhex(private_key))
            id = exchange_contarct_address + key_pair.account_id
            addr_info = shardora_api.get_account_info(id)
            if addr_info is None:
                print(f"invalid private key {private_key} and get addr info failed: {id} ")
                sys.exit(1)

            print(f"did_contract_address: {addr_info}")
            nonce = int(addr_info["nonce"]) + 1
            res = shardora_api.transfer(
                private_key,
                exchange_contarct_address,
                price,
                nonce,
                8,
                "",
                func_param,
                "",
                "",
                0,
                check_tx_valid=True,
                gas_limit=9000000)
            if not res:
                print("call contract failed!")
            else:
                print("call contract success!")
            # gid = shardora_api.gen_gid()
            # res = shardora_api.transfer(
            #     private_key,
            #     exchange_contarct_address,
            #     price,
            #     8,
            #     gid,
            #     "",
            #     func_param,
            #     "",
            #     "",
            #     0,
            #     check_gid_valid=True)
            if not res:
                return JsonHttpResponse({'status': 1, 'msg': "call purchase contract function failed"})

            info_json = {"gid": gid, "command": "exchange_purchase"}
            key_pair = shardora_api.get_keypair(bytes.fromhex(private_key))
            save_trace_info(None, hash, key_pair.account_id, info_json)
            return JsonHttpResponse({'status': 0, 'msg': "ok"})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        
def exchange_confirm(request):
    if request.method == 'POST':
        try:
            hash = request.POST.get('hash')
            private_key = request.POST.get('private_key')
            func_param = shardora_api.keccak256_str(
                "ConfirmPurchase(bytes32)")[:8] + encode_hex(encode(['bytes32'], [decode_hex(hash)]))[2:]
            key_pair = shardora_api.get_keypair(bytes.fromhex(private_key))
            id = exchange_contarct_address + key_pair.account_id
            addr_info = shardora_api.get_account_info(id)
            if addr_info is None:
                print(f"invalid private key {private_key} and get addr info failed: {id} ")
                sys.exit(1)

            print(f"did_contract_address: {addr_info}")
            nonce = int(addr_info["nonce"]) + 1
            res = shardora_api.transfer(
                private_key,
                exchange_contarct_address,
                0,
                nonce,
                8,
                "",
                func_param,
                "",
                "",
                0,
                check_tx_valid=True,
                gas_limit=9000000)
            if not res:
                print("call contract failed!")
            else:
                print("call contract success!")
            # gid = shardora_api.gen_gid()
            # res = shardora_api.transfer(
            #     private_key,
            #     exchange_contarct_address,
            #     0,
            #     8,
            #     gid,
            #     "",
            #     func_param,
            #     "",
            #     "",
            #     0,
            #     check_gid_valid=True)
            if not res:
                return JsonHttpResponse({'status': 1, 'msg': "error"})

            info_json = {"gid": gid, "command": "exchange_confirm"}
            key_pair = shardora_api.get_keypair(bytes.fromhex(private_key))
            save_trace_info(None, hash, key_pair.account_id, info_json)
            return JsonHttpResponse({'status': 0, 'msg': "ok"})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
        
def exchange_sell_list(request):
    if request.method == 'POST':
        # try:
            gpu_type = request.POST.get('gpu_type')
            gpu_count_min = request.POST.get('gpu_count_min')
            gpu_count_max = request.POST.get('gpu_count_max')
            storage_size_min = request.POST.get('storage_size_min')
            storage_size_max = request.POST.get('storage_size_max')
            private_key = request.POST.get('private_key')
            search = request.POST.get('search')
            owner = int(request.POST.get('owner'))
            type = request.POST.get('type')
            if type is not None:
                type = int(type)
            else:
                type = -1
            
            start_pos = int(request.POST.get('start_pos'))
            if start_pos > 0:
                start_pos -= 1
                
            get_len = int(request.POST.get('len'))
            if owner == 1:
                key_pair = shardora_api.get_keypair(bytes.fromhex(private_key))
                res = shardora_api.query_contract_function(
                    private_key=private_key, 
                    contract_address=exchange_contarct_address,
                    function="GetOwnerItemJson",
                    types_list=['uint256', 'uint256', 'address'],
                    params_list=[start_pos, 1000, decode_hex(key_pair.account_id)],
                    call_type=1)
            else:
                res = shardora_api.query_contract_function(
                    private_key=private_key, 
                    contract_address=exchange_contarct_address,
                    function="GetAllItemJson",
                    types_list=['uint256', 'uint256'],
                    params_list=[start_pos, 1000],
                    call_type=1)
            
            if res.status_code != 200:
                return JsonHttpResponse({'status': 1, 'msg': "query contract error"})
            else:
                print(res.text)
                tmp_datas = json.loads(res.text)
                if len(tmp_datas) <= start_pos:
                    return JsonHttpResponse({'status': 0, 'msg': "ok", 'data': []})

                datas = []
                for item in tmp_datas:
                    try:
                        info_dex = hex_to_str(item['info'])
                        print(info_dex)
                        print(item)
                        json_str = json.dumps(item)
                        if search is not None and search != '' and search not in info_dex and search not in json_str:
                            print(f'searc invalid {search}')
                            continue
                                
                        info_json = json.loads(info_dex)
                        #tmp_datas['info_json'] = info_json
                        if type != -1 and type != info_json['type']:
                            in_type = info_json['type']
                            print(f'type invalid {type} {in_type}')
                            continue

                        if (type == 2 or type == -1) and info_json['type'] == 2:
                            if gpu_type is not None and gpu_type != "":
                                if (info_json['gpu_type'] != gpu_type):
                                    in_type = info_json['gpu_type']
                                    print(f'gpu_type invalid {gpu_type} {in_type}')
                                    continue

                            if ('gpu_count' in info_json and 
                                    gpu_count_min is not None and 
                                    gpu_count_min != "" and 
                                    gpu_count_max is not None and 
                                    gpu_count_max != ""):
                                if (int(info_json['gpu_count']) < int(gpu_count_min) or 
                                        int(info_json['gpu_count']) >= int(gpu_count_max)):
                                    in_gpu_count = info_json['gpu_count']
                                    print(f'gpu_type invalid {gpu_count_min} {gpu_count_max} {in_gpu_count}')
                                    continue
                                
                            if ('storage_size' in info_json and 
                                    storage_size_min is not None and 
                                    storage_size_min != "" and 
                                    storage_size_max is not None and 
                                    storage_size_max != ""):
                                if (int(info_json['storage_size']) < int(storage_size_min) or 
                                        int(info_json['storage_size']) >= int(storage_size_max)):
                                    in_storage_size = info_json['storage_size']
                                    print(f'gpu_type invalid {storage_size_min} {storage_size_max} {in_storage_size}')
                                    continue
                    except:
                        print('catch error')
                        continue
                        
                    print(f"add {len(datas)} {item}")
                    datas.append(item)

                if len(datas) <= (start_pos + get_len):
                    get_len = len(datas)
                else:
                    get_len = start_pos + get_len
              
                res_datas = datas[start_pos: start_pos + get_len]
                total_count = len(datas)
                for data in res_datas:
                    data['selled_price'] = int(data['selled_price'], 16)
                    data['selled'] = int(data['selled'], 16)
                    data['price'] = int(data['price'], 16)
                    data['start_time'] = int(data['start_time'], 16)
                    data['end_time'] = int(data['end_time'], 16)
                    for buyer in data['buyers']:
                        buyer['price'] = int(buyer['price'], 16)
                        dt_object = datetime.datetime.fromtimestamp(int(int(buyer['time'], 16) / 1000) + 8 * 3600)
                        buyer['time'] =  dt_object.strftime("%Y-%m-%d %H:%M:%S")
                
                    data['buyers'] = sorted(data['buyers'] , key=lambda x: x['price']) 

                return JsonHttpResponse({'status': 0, 'msg': "ok", 'data': res_datas, 'total': total_count})
        # except Exception as ex:
        #     return JsonHttpResponse({'status': 1, 'msg': str(ex)})        
        
def get_table_detail(db_name, table_name):
    ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
    try:
        show_fileds = ck_client.execute("desc " + db_name + "." + table_name)
        fields = []
        for filed in show_fileds:
            res_item = {
                "name": filed[0],
                "type": filed[1],
                "default_type": filed[2],
                "default_expression": filed[3],
                "comment": filed[4],
                "codec_expression": filed[5],
                "ttl_expression": filed[6],
            }
                
            fields.append(res_item)

        result = ck_client.execute("select * from " + db_name + "." + table_name + " where is_leaf=true limit 100", with_column_types=True)
        tmp_result = []
        for item in result[0]:
            res_item = {}
            for i in range(0, len(item)):
                res_item[result[1][i][0]] = str(item[i])
                
            tmp_result.append(res_item)

        return fields, tmp_result
    except Exception as e:
        return str(e), None
    
def exchange_sell_detail(request):
    if request.method == 'POST':
        try:
            hash = request.POST.get('hash')
            private_key = request.POST.get('private_key')
            res = shardora_api.query_contract_function(
                private_key=private_key, 
                contract_address=exchange_contarct_address,
                function="GetSellDetail",
                types_list=['bytes32'],
                params_list=[decode_hex(hash)],
                call_type=1)
            ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
            if res.status_code != 200:
                return JsonHttpResponse({'status': 1, 'msg': "error"})
            else:
                res_json = {}
                tmp_datas = json.loads(res.text)
                tmp_datas['id'] = int(tmp_datas['id'], 16)
                tmp_datas['selled_price'] = int(tmp_datas['selled_price'], 16)
                tmp_datas['selled'] = int(tmp_datas['selled'], 16)
                tmp_datas['price'] = int(tmp_datas['price'], 16)
                tmp_datas['start_time'] = int(tmp_datas['start_time'], 16)
                tmp_datas['end_time'] = int(tmp_datas['end_time'], 16)
                for buyer in tmp_datas['buyers']:
                    buyer['price'] = int(buyer['price'], 16)
                    dt_object = datetime.datetime.fromtimestamp(int(int(buyer['time'], 16) / 1000) + 8 * 3600)
                    buyer['time'] =  dt_object.strftime("%Y-%m-%d %H:%M:%S")

                tmp_datas['buyers'] = sorted(tmp_datas['buyers'] , key=lambda x: x['price']) 
                res_json["sell_info"] = tmp_datas
                info_json = json.loads(hex_to_str(tmp_datas["info"]))
                if 'table_name' in info_json:
                    table_name = info_json['table_name']
                    if info_json['type'] == 0:
                        fields_info, tmp_result = get_table_detail('default', table_name)
                        if tmp_result is None:
                            res_json["table_info"] = fields_info
                            res_json["data_example"] = []
                        else:
                            res_json["table_info"] = fields_info
                            res_json["data_example"] = tmp_result

                    gid_ck_info_cmd = f"select user, gid from exchange_data_meta_info where table='{table_name}' limit 1;" 
                    try:
                        gid_ck_info_res = ck_client.execute(gid_ck_info_cmd)
                        user = gid_ck_info_res[0][0]
                        nonce = gid_ck_info_res[0][1]
                        block_info = shardora_api.get_block_info_with_addr_nonce(user, nonce)
                        if block_info.status_code != 200:
                            return JsonHttpResponse({'status': 1, 'msg': 'invalid block info.'})  

                        res_json["confirm_info"] = json.loads(block_info.text)['block']
                    except Exception as ex:
                        res_json["confirm_info"] = str(ex)
                else:
                    res_json["table_info"] = 'table_name invalid'
                    res_json["data_example"] = []
                    res_json["confirm_info"] = 'table_name invalid'

                logger.info('exchange_sell_detail success hash = %s, res: %s' % (hash, json.dumps(res_json)))
                return JsonHttpResponse({'status': 0, 'msg': "ok", 'data': res_json})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})  
        
def get_owner_transactions(request):
    if request.method == 'POST':
        private_key = request.POST.get('private_key')
        key_pair = shardora_api.get_keypair(bytes.fromhex(private_key))
        cmd = (f"select timestamp, amount, gid, balance, type from  zjc_ck_transaction_table where (from='{key_pair.account_id}' or to = '{key_pair.account_id}') and shard_id = 3 and type in(0,5,6,7,14,17) order by timestamp desc limit 100;")
        try:
            ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
            result = ck_client.execute(cmd)
            tmp_result = []
            balance = 0
            for item in result:
                dt_object = datetime.datetime.fromtimestamp(int(item[0] / 1000) + 8 * 3600)
                dt_object = dt_object.strftime("%Y/%m/%d %H:%M:%S") + "." + str(item[0] % 1000)
                tmp_result.append({
                    "time": dt_object,
                    "amount": item[1],
                    "gid": item[2],
                    "balance": item[3],
                    "type": int(item[4]),
                })

                if len(tmp_result) == 1:
                    balance = item[3]
                
            return JsonHttpResponse({'status': 0, 'cmd': cmd, 'id': key_pair.account_id, 'balance': balance, 'value': tmp_result})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
    
def add_trace_info(request):
    return JsonHttpResponse({'status': 1, 'msg': "invalid"})

def get_trace_info_list(request):
    if request.method == 'POST':
        try:
            latest_timestamp = request.POST.get('latest_timestamp')
            checked = request.POST.get('checked')
            count = request.POST.get('count')
            data_id = request.POST.get('data_id')
            private_key = request.POST.get('private_key')
            if count > 1000:
                count = 1000
            
            where = f"where data_id='{data_id}' "
            if checked is not None:
                where = f" and checked = {checked}"
                
            if latest_timestamp is not None:
                if where != "":
                    where += f" and time >= {latest_timestamp}"

            cmd = f"select data_id,time,user,trace_info,checked from exchange_data_meta_info {where} limit {count};"
            ck_client = Client(host=settings.CK_HOST, port=settings.CK_PORT)
            result = ck_client.execute(cmd)
            res_arr = []
            for item in result:
                res_item = {
                    "data_id": item[0],
                    "time": item[1],
                    "user": item[2],
                    "trace_info": item[3],
                    "checked": item[4]
                    }
                
                res_arr.append(res_item)

            return JsonHttpResponse({'status': 0, 'msg': 'success', 'data': res_arr})
        except Exception as ex:
            return JsonHttpResponse({'status': 1, 'msg': str(ex)})
    return JsonHttpResponse({'status': 1, 'msg': "invalid"})
