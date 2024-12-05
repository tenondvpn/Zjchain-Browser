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

    # 分布式密钥协商
    re_path(r'^get_all_nodes_bls_info/$', views.get_all_nodes_bls_info),

    # 跨境交易

    # 确权溯源
    re_path(r'^confirm_transactions/$', views.confirm_transactions),

    # 银行信贷联盟
    re_path(r'^ars_create_sec_keys/$', views.ars_create_sec_keys),
    re_path(r'^ars_get_contract_info/$', views.ars_get_contract_info),
    re_path(r'^ars_create_new_vote/$', views.ars_create_new_vote),
    re_path(r'^ars_vote/$', views.ars_vote),
    re_path(r'^ars_transactions/$', views.ars_transactions),

    # 政务系统数据共享
    re_path(r'^penc_create_sec_keys/$', views.penc_create_sec_keys),
    re_path(r'^penc_get_contract_info/$', views.penc_get_contract_info),
    re_path(r'^penc_share_new_data/$', views.penc_share_new_data),
    re_path(r'^penc_vote/$', views.penc_vote),
    re_path(r'^penc_get_share_data/$', views.penc_get_share_data),
    re_path(r'^penc_transactions/$', views.penc_transactions),

    re_path(r'^get_transaction/$', transactions_view.get_transaction),
    re_path(r'^transactions_list/$', transactions_view.transactions_list),

    re_path(r'^get_block/$', block_view.get_block),
    re_path(r'^block_list/$', block_view.block_list),

    re_path(r'^account_list/$', account_view.account_list),
    re_path(r'^get_account/$', account_view.get_account),

    re_path(r'^data_list/$', data_view.data_list),
    re_path(r'^get_all_nodes_bls_info/$', views.get_all_nodes_bls_info),

)
