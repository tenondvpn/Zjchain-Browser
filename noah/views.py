# coding=utf-8
import sys
import random

sys.setrecursionlimit(10000)
from django.shortcuts import render
from django.contrib import auth
from django.contrib.auth.models import User
import django
from django.contrib.auth import logout as auth_logout
from django.contrib.auth.decorators import login_required


def check_user_valid(username, password):
    return False

def get_test_user_info(username):
    return None
    try:
        return (1234, random.randint(0, 100000), "test_user_" + str(random.randint(0, 100000)), "email", "phone", "avatar")
    except Exception as ex:
        return None

def get_now_format_time(format):
    now_time = datetime.datetime.utcnow() + datetime.timedelta(hours=8)
    return now_time.strftime(format)

@django.db.transaction.atomic
def login(request):
    if request.method == 'POST':
        username = request.POST.get("username")
        password = request.POST.get("password")
        next = request.POST.get("next", "").strip()
        auth_users = User.objects.filter(username=username)
        if len(auth_users) <= 0:
            if not check_user_valid(username, password):
                return JsonHttpResponse({'status': 1, 'msg': "用户名或者密码错误！"})

            user_info = get_test_user_info(username)
            if user_info is None or len(user_info) < 6:
                first_name = ""
                email = ""
                avatar = ""
            else:
                first_name = user_info[2]
                email = user_info[3]
                avatar = user_info[5]

            User.objects.create_user(
                    username, email, password, first_name=first_name, last_name=avatar,
                    last_login=get_now_format_time("%Y-%m-%d %H:%M:%S"),
                    is_superuser=0, is_staff=1, is_active=1,
                    date_joined=get_now_format_time("%Y-%m-%d %H:%M:%S"))
        user = auth.authenticate(username=username, password=password)
        if user is not None and user.is_active:
            auth.login(request, user)
            return JsonHttpResponse({'status': 0, 'msg': "OK", 'next': next})
        else:
            if not check_user_valid(username, password):
                return JsonHttpResponse({'status': 1, 'msg': "用户名或者密码错误！"})
            else:
                auth_users = User.objects.filter(username=username)
                auth_users[0].delete()
                user_info = get_test_user_info(username)
                if user_info is None or len(user_info) < 6:
                    first_name = ""
                    email = ""
                    avatar = ""
                else:
                    first_name = user_info[2]
                    email = user_info[3]
                    avatar = user_info[5]

                User.objects.create_user(
                        username, email, password, first_name=first_name, last_name=avatar,
                        last_login=get_now_format_time("%Y-%m-%d %H:%M:%S"),
                        is_superuser=0, is_staff=1, is_active=1,
                        date_joined=get_now_format_time("%Y-%m-%d %H:%M:%S"))
                user = auth.authenticate(username=username, password=password)
                auth.login(request, user)
                return JsonHttpResponse({'status': 0, 'msg': "OK", 'next': next})
    else:
        return render(request, 'login.html', {})

@django.db.transaction.atomic
def register(request):
    if request.method == 'POST':
        username = request.POST.get("username").strip()
        password = request.POST.get("password").strip()
        telno = request.POST.get("telno").strip()
        email = request.POST.get("email").strip()
        if email == "" or not email.endswith("@hundsun.com"):
            return JsonHttpResponse({'status': 1, 'msg': "邮箱格式不对 xxx@hundsun.com！"})
            
        next = request.POST.get("next", "").strip()
        auth_users = User.objects.filter(username=username)
        if len(auth_users) > 0:
            return JsonHttpResponse({'status': 1, 'msg': "用户名已经存在！"})

        auth_users = User.objects.filter(email=email)
        if len(auth_users) > 0:
            return JsonHttpResponse({'status': 1, 'msg': "邮箱已经存在！"})

        user_info = get_test_user_info(username)
        if user_info is None or len(user_info) < 6:
            first_name = ""
        else:
            first_name = user_info[2]

        User.objects.create_user(
                username, email, password, first_name=first_name, last_name=telno,
                last_login=get_now_format_time("%Y-%m-%d %H:%M:%S"),
                is_superuser=0, is_staff=1, is_active=1,
                date_joined=get_now_format_time("%Y-%m-%d %H:%M:%S"))
        user = auth.authenticate(username=username, password=password)
        if user is not None and user.is_active:
            auth.login(request, user)
            return JsonHttpResponse({'status': 0, 'msg': "OK", 'next': next})
        else:
            if not check_user_valid(username, password):
                return JsonHttpResponse({'status': 1, 'msg': "用户名或者密码错误！"})
            else:
                auth_users = User.objects.filter(username=username)
                auth_users[0].delete()
                user_info = get_test_user_info(username)
                if user_info is None or len(user_info) < 6:
                    first_name = ""
                    email = ""
                else:
                    first_name = user_info[2]
                    email = user_info[3]

                User.objects.create_user(
                        username, email, password, first_name=first_name, last_name=telno,
                        last_login=get_now_format_time("%Y-%m-%d %H:%M:%S"),
                        is_superuser=0, is_staff=1, is_active=1,
                        date_joined=get_now_format_time("%Y-%m-%d %H:%M:%S"))
                user = auth.authenticate(username=username, password=password)
                auth.login(request, user)
                return JsonHttpResponse({'status': 0, 'msg': "OK", 'next': next})
    else:
        return render(request, 'register.html', {})

def logout(request):
    auth_logout(request)
    next = request.GET.get('next', '')
    return JsonHttpResponse({'status': 0, 'msg': "OK", 'next': '/login?next=' + next})

@login_required(login_url='/login/')
def get_user_info(request):
    user = request.user
    auth_users = User.objects.filter(id=user.id)
    if len(auth_users) <= 0:
        return JsonHttpResponse({'status': 1, 'msg': "用户未登录，或者用户信息出错！"})

    realname = auth_users[0].first_name
    if realname is None or realname.strip() == "":
        realname = auth_users[0].username

    ret_map = {
        "status": 0,
        "msg": "OK",
        "username": auth_users[0].username,
        "realname": realname,
        "id": user.id,
        "email": auth_users[0].email,
        "date_joined": auth_users[0].date_joined.strftime("%Y年%m月%d日 %H点")
    }

    return JsonHttpResponse(ret_map)
