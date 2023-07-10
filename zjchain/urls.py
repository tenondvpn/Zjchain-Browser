from django.urls import re_path
#from django.conf.urls import url
from zjchain.views import views, transactions_view, block_view, account_view, data_view

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
    re_path(r'^get_block_detail/(?P<block_hash>.*)/$',views.get_block_detail),
    re_path(r'^get_statistics/$',views.get_statistics),
    re_path(r'^get_prikey/(?P<seckey>.*)/$',views.get_prikey),
    re_path(r'^set_private_key/$',views.set_private_key),
    re_path(r'^get_all_videos/$',views.get_all_videos),

    re_path(r'^get_transaction/$', transactions_view.get_transaction),
    re_path(r'^transactions_list/$', transactions_view.transactions_list),

    re_path(r'^get_block/$', block_view.get_block),
    re_path(r'^block_list/$', block_view.block_list),

    re_path(r'^account_list/$', account_view.account_list),
    re_path(r'^get_account/$', account_view.get_account),

    re_path(r'^data_list/$', data_view.data_list),

)
