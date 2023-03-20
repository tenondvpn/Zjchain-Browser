from django.urls import path, re_path, include
#from django.conf.urls import url
from zjchain import views

urlpatterns = (
    re_path(r'^$',views.zjchain_index),
    re_path(r'^transactions/$',views.transactions),
    re_path(r'^vpn_transactions/$',views.vpn_transactions),
    re_path(r'^nodes/$',views.nodes),
    re_path(r'^accounts/$',views.accounts),
    re_path(r'^contract/$',views.contract),
    re_path(r'^tbc/$',views.tbc),
    re_path(r'^get_balance/(?P<account_id>.*)/$',views.get_balance),
    re_path(r'^get_bytescode/$',views.get_bytescode),
    re_path(r'^get_all_contracts/$',views.get_all_contracts),
    re_path(r'^get_contract_detail/$',views.get_contract_detail),
    re_path(r'^get_statistics/$',views.get_statistics),
    re_path(r'^get_prikey/(?P<seckey>.*)/$',views.get_prikey),
    re_path(r'^set_private_key/$',views.set_private_key),
    re_path(r'^get_all_videos/$',views.get_all_videos),
)
