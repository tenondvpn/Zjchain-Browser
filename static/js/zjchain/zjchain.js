var content_mode = 0;
var page_size = 0;
var has_next = true;
var shard_id = -1;
var search_str = "";
var block_hash="";
var refresh_table_period = 5000;
var now_tm_refresh = 0;
var Toast = null;
var self_account_id = null;
var self_private_key = null;
var self_public_key = null;
var local_count_shard_id = null;
var clipboard = null;
var indexdb = null;
var self_contract_address = null;

const isHexadecimal = str => /^[A-F0-9]+$/i.test(str);
const isNumber = str => /^[0-9]+$/i.test(str);

function setCookie(name, value) {
    var Days = 365;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

function list_transactions() {
    $("#id_search").val("");
    search_str = "";
    page_size = 0;
    hide_others_except('#pjsGrid1');
    $("#jsGrid1").jsGrid("loadData");
    content_mode = 0;
}

function hide_others_except(str_grid) {
    $("#pjsGrid1").hide();
    $("#pjsGrid2").hide();
    $("#pjsGrid3").hide();
    $("#pjsGrid4").hide();
    $("#jsGrid-block-transactions").hide();
    $(str_grid).show();
    $(str_grid.replace("p", "")).show();
}

function list_blocks() {
    $("#id_search").val("");
    search_str = "";
    page_size = 0;
    hide_others_except('#pjsGrid2');
    $("#jsGrid2").jsGrid("loadData");
    content_mode = 1;
}

function list_accounts() {
    $("#id_search").val("");
    search_str = "";
    page_size = 0;
    hide_others_except('#pjsGrid3');
    $("#jsGrid3").jsGrid("loadData");
    content_mode = 2;
}

function search_change() {
    search_data();
}

function get_prev_page() {
    if (page_size > 0) {
        page_size -= 1;
    }

    if (content_mode == 0) {
        $("#jsGrid1").jsGrid("loadData");
    } else if (content_mode == 1) {
        $("#jsGrid2").jsGrid("loadData");
    } else {
        $("#jsGrid3").jsGrid("loadData");
    }
}

function get_next_page() {
    if (has_next) {
        page_size += 1;
    }

    if (content_mode == 0) {
        $("#jsGrid1").jsGrid("loadData");
    } else if (content_mode == 1) {
        $("#jsGrid2").jsGrid("loadData");
    } else {
        $("#jsGrid3").jsGrid("loadData");
    }
}

function click_root() {
    shard_id = 2;
    if (content_mode == 0) {
        $("#jsGrid1").jsGrid("loadData");
    } else if (content_mode == 1) {
        $("#jsGrid2").jsGrid("loadData");
    } else {
        $("#jsGrid3").jsGrid("loadData");
    }
}

function click_shard3() {
    shard_id = 3;
    if (content_mode == 0) {
        $("#jsGrid1").jsGrid("loadData");
    } else if (content_mode == 1) {
        $("#jsGrid2").jsGrid("loadData");
    } else {
        $("#jsGrid3").jsGrid("loadData");
    }
}

function click_all() {
    shard_id = -1;
    if (content_mode == 0) {
        $("#jsGrid1").jsGrid("loadData");
    } else if (content_mode == 1) {
        $("#jsGrid2").jsGrid("loadData");
    } else {
        $("#jsGrid3").jsGrid("loadData");
    }
}

function search_data() {
    search_str = $("#id_search").val();
    if (content_mode == 0) {
        $("#jsGrid1").jsGrid("loadData");
    } else if (content_mode == 1) {
        $("#jsGrid2").jsGrid("loadData");
    } else {
        $("#jsGrid3").jsGrid("loadData");
    }
}

function auto_search_transactions(val) {
    $("#id_search").val(val);
    search_str = val;
    search_str = "";
    page_size = 0;
    $("#jsGrid1").jsGrid("loadData");
    hide_others_except('#pjsGrid1');
    content_mode = 0;
    $('#btn1').addClass('active');
    $('#btn2').removeClass('active');
    $('#btn3').removeClass('active');

}



function auto_search_data(val) {
    $("#id_search").val(val);
    search_str = val;
    if (content_mode == 0) {
        $("#jsGrid1").jsGrid("loadData");
    } else if (content_mode == 1) {
        $("#jsGrid2").jsGrid("loadData");
    } else {
        $("#jsGrid3").jsGrid("loadData");
    }
}
function show_block_detail(block_hash_str) {
     // $("#jsGrid4").jsGrid("loadData");
      $.ajax({
        type: 'get',
        async: false,
        url: '/zjchain/get_block_detail/'+ block_hash_str,
        dataType: "json"
    }).done(function (response) {
        if (response.status == 0) {

            $("#block_detail_shard_id").val(response.value['shard_id']);
            $("#block_detail_pool_index").val(response.value['pool_index']);
            $("#block_detail_height").val(response.value['height']);
            $("#block_detail_prehash").val(response.value['prehash']);
            $("#block_detail_hash").val(response.value['hash']);
            $("#block_detail_version").val(response.value['version']);
            $("#block_detail_vss").val(response.value['vss']);
            $("#block_detail_elect_height").val(response.value['elect_height']);
            $("#block_detail_bitmap").val(response.value['bitmap']);
            $("#block_detail_timestamp").val(response.value['timestamp']);
            $("#block_detail_timeblock_height").val(response.value['timeblock_height']);
            $("#block_detail_bls_agg_sign_x").val(response.value['bls_agg_sign_x']);
            $("#block_detail_bls_agg_sign_y").val(response.value['bls_agg_sign_y']);
            $("#block_detail_commit_bitmap").val(response.value['commit_bitmap']);
            $("#block_detail_tx_size").val(response.value['tx_size']);
            $("#block_detail_date").val(response.value['date']);
            $("#total_used_gas").val(response.value['total_used_gas']);

            // $('#modal-block-detail').modal({
            //     show: true
            // });

            hide_others_except('#pjsGrid4')
            if ($('#custom-tabs-one-messages-tab').attr("aria-selected") === "true") {
                block_hash = block_hash_str;
                $('#jsGrid-block-transactions').jsGrid("loadData");
                block_hash = null;
                $('#jsGrid-block-transactions').show();

            }

        } else {
            Toast.fire({
                icon: 'error',
                title: response.msg
            })
        }
    });
}

function click_auto_search_data() {
    $("#id_search").val(self_account_id.toString(16));
    search_str = val;
    if (content_mode == 0) {
        $("#jsGrid1").jsGrid("loadData");
    } else if (content_mode == 1) {
        $("#jsGrid2").jsGrid("loadData");
    } else {
        $("#jsGrid3").jsGrid("loadData");
    }
}

function GetValidHexString(uint256_bytes) {
    var str_res = uint256_bytes.toString(16)
    while (str_res.length < 64) {
        str_res = "0" + str_res;
    }

    return str_res;
}

function create_tx(to, amount, gas_limit, gas_price, key, value) {
    var gid = GetValidHexString(Secp256k1.uint256(randomBytes(32)));
    var tx_type = 0;
    var frompk = '04' + self_public_key.x.toString(16) + self_public_key.y.toString(16);
    const MAX_UINT32 = 0xFFFFFFFF;
    var amount_buf = new ethereumjs.Buffer.Buffer(8);
    var big = ~~(amount / MAX_UINT32)
    var low = (amount % MAX_UINT32) - big
    amount_buf.writeUInt32LE(big, 4)
    amount_buf.writeUInt32LE(low, 0)

    var gas_limit_buf = new ethereumjs.Buffer.Buffer(8);
    var big = ~~(gas_limit / MAX_UINT32)
    var low = (gas_limit % MAX_UINT32) - big
    gas_limit_buf.writeUInt32LE(big, 4)
    gas_limit_buf.writeUInt32LE(low, 0)

    var gas_price_buf = new ethereumjs.Buffer.Buffer(8);
    var big = ~~(gas_price / MAX_UINT32)
    var low = (gas_price % MAX_UINT32) - big
    gas_price_buf.writeUInt32LE(big, 4)
    gas_price_buf.writeUInt32LE(low, 0)
    var step_buf = new ethereumjs.Buffer.Buffer(8);
    var big = ~~(tx_type / MAX_UINT32)
    var low = (tx_type % MAX_UINT32) - big
    step_buf.writeUInt32LE(big, 0)
    step_buf.writeUInt32LE(low, 0)

    var buffer_array = [ethereumjs.Buffer.Buffer.from(gid, 'hex'),
        ethereumjs.Buffer.Buffer.from(frompk, 'hex'),
        ethereumjs.Buffer.Buffer.from(to, 'hex'),
       amount_buf, gas_limit_buf, gas_price_buf, step_buf];
    if (key != null && key != "") {
        buffer_array.push(ethereumjs.Buffer.Buffer.from(key));
        if (value != null && value != "") {
            buffer_array.push(ethereumjs.Buffer.Buffer.from(value));
        }
    }

    var message_buf = ethereumjs.Buffer.Buffer.concat(buffer_array);
    var kechash = keccak256(message_buf)
    var digest = Secp256k1.uint256(kechash, 16)
    const sig = Secp256k1.ecsign(self_private_key, digest)
    const sigR = Secp256k1.uint256(sig.r, 16)
    const sigS = Secp256k1.uint256(sig.s, 16)
    const pubX = Secp256k1.uint256(self_public_key.x, 16)
    const pubY = Secp256k1.uint256(self_public_key.y, 16)
    return {
        'gid': gid,
        'pubkey': '04' + self_public_key.x.toString(16) + self_public_key.y.toString(16),
        'to': to,
        'amount': amount,
        'gas_limit': gas_limit,
        'gas_price': gas_price,
        'type': tx_type,
        'shard_id': 3,
        'key': key,
        'val': value,
        'sign_r': sigR.toString(16),
        'sign_s': sigS.toString(16),
        'sign_v': sig.v,
    }
}


function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}

function str_to_hex(str) {
    var arr1 = [];
    for (var n = 0; n < str.length; n++) {
        var hex = Number(str.charCodeAt(n)).toString(16);
        arr1.push(hex);
    }
    return arr1.join('');
}

function setup_global_private_key() {
    var password = $("#private_key_input").val();
    if (!isHexadecimal(password)) {
        Toast.fire({
            icon: 'error',
            title: 'pirvate key hex code lenght must 64.'
        })

        return false;
    }

    const privateKeyBuf = Secp256k1.uint256(password, 16)
    self_private_key = Secp256k1.uint256(privateKeyBuf, 16)
    save_private_key();
    self_public_key = Secp256k1.generatePublicKeyFromPrivateKeyData(self_private_key)
    var pk_bytes = hexToBytes(self_public_key.x.toString(16) + self_public_key.y.toString(16))
    var address = keccak256(pk_bytes)
    address = address.slice(address.length - 40, address.length)
    self_account_id = address;
    $("#global_account_id").html('<i class="fas fa-user mr-2"></i>' + address.toString('hex'));
    $.ajax({
        type: 'get',
        async: false,
        url: '/zjchain/get_balance/' + address + '/',
        success: function (result) {
            if (result.status) {
                $("#global_balance").html('<i class="fas fa-map mr-2"></i>' + '0 Ti' + '<span class="float-right text-muted text-sm badge bg-warning">balance</span>');
            } else {
                var zjchain = Math.floor(result.balance / 10000000) + '.' + result.balance % 10000000;
                $("#global_balance").html('<i class="fas fa-map mr-2"></i>' + zjchain + ' Ti<span class="float-right text-muted text-sm badge bg-warning">balance</span>');
                local_count_shard_id = result.shard_id;
            }
        }
    });

    return true;
}

function create_new_private_key() {

}

function refresh_self_balance() {

}

async function charge_for_this_key() {
}

function save_this_key() {
}

function set_private_key() {
    $("#private_key_input").val(self_private_key.toString(16));
    self_public_key = Secp256k1.generatePublicKeyFromPrivateKeyData(self_private_key)
    var pk_bytes = hexToBytes(self_public_key.x.toString(16) + self_public_key.y.toString(16))
    var address = keccak256(pk_bytes)
    address = address.slice(address.length - 40, address.length)
    self_account_id = address;
    $("#global_account_id").html('<i class="fas fa-user mr-2"></i>' + address.toString('hex'));
    $.ajax({
        type: 'get',
        async: false,
        url: '/zjchain/get_balance/' + address + '/',
        success: function (result) {
            if (result.status) {
                $("#global_balance").html('<i class="fas fa-map mr-2"></i>' + '0 Ti' + '<span class="float-right text-muted text-sm badge bg-warning">balance</span>');
            } else {
                var zjchain = Math.floor(result.balance / 10000000) + '.' + result.balance % 10000000;
                $("#global_balance").html('<i class="fas fa-map mr-2"></i>' + zjchain + ' T<span class="float-right text-muted text-sm badge bg-warning">balance</span>');
                local_count_shard_id = result.shard_id;
            }
        }
    });
}

function save_private_key() {
    var rand_seckey = Secp256k1.uint256(randomBytes(32));
    const rand_seckeyBuf = Secp256k1.uint256(rand_seckey, 16)
    keep_seckey = Secp256k1.uint256(rand_seckeyBuf, 16)
    setCookie('local_saved_seckey', keep_seckey.toString(16));
    var vk1 = GetValidHexString(keep_seckey)
    var seckey = CryptoJS.SHA256(vk1).toString();
    var valprikey = GetValidHexString(self_private_key);
    var enckey = CryptoJS.AES.encrypt(valprikey, seckey).toString()
    var decseckey = CryptoJS.AES.decrypt(enckey, seckey).toString(CryptoJS.enc.Utf8);
    console.log("vk1:", vk1, ", seckey:", seckey, ", enckey:", enckey, ", valprikey: ", valprikey, ", decseckey:", decseckey);
    $.ajax({
        type: 'post',
        async: true,
        url: '/zjchain/set_private_key/',
        data: {
            'key': seckey,
            'enc': enckey
        },
        dataType: "json",
        success: function (result) {
            if (result.status) {
            } else {
            }
        }
    });
}

function CreateSeckey() {
    var rand_prikey = Secp256k1.uint256(randomBytes(32));
    const privateKeyBuf = Secp256k1.uint256(rand_prikey, 16)
    self_private_key = Secp256k1.uint256(privateKeyBuf, 16)
    save_private_key();
}

function CreateInitAccount() {
    var saved_private_key = getCookie('local_saved_seckey');
    var keep_seckey = null;
    if (saved_private_key == null) {
        CreateSeckey();
    } else {
        keep_seckey = Secp256k1.uint256(saved_private_key, 16)
        var seckey = CryptoJS.SHA256(GetValidHexString(keep_seckey)).toString();
        $.ajax({
            type: 'get',
            async: true,
            url: '/zjchain/get_prikey/' + seckey + '/',
            success: function (result) {
                if (result.status == 0) {
                    self_private_key = CryptoJS.AES.decrypt(result.prikey, seckey).toString(CryptoJS.enc.Utf8);
                    console.log("return prikey: ", self_private_key)
                    self_private_key = Secp256k1.uint256(self_private_key, 16)
                    set_private_key()
                } else if (result.msg == "account not exists.") {
                    CreateSeckey();
                }
            }
        });
    }
}

function search_self_address() {
    $("#id_search").val(self_account_id.toString('hex'));
}

function on_toaddresschange() {
    var to_addr = $("#inputToAddress").val();
    if (to_addr.length != 40 || !isHexadecimal(to_addr)) {
        Toast.fire({
            icon: 'error',
            title: 'transfer to address hex code lenght must 64.'
        })

        return false;
    }
    return true;
}

function on_contractnamechange() {
    var contract_desc = $("#contract_desc").val();
    if (contract_desc.length >= 20) {
        Toast.fire({
            icon: 'error',
            title: 'contract_desc lenght must less than 20.'
        })

        return false;
    }
    return true;
}

function on_descchange() {
    var contract_desc = $("#contract_desc").val();
    if (contract_desc.length >= 64) {
        Toast.fire({
            icon: 'error',
            title: 'contract_desc lenght must less than 64.'
        })

        return false;
    }
    return true;
}

function on_amountchange() {
    var amount = $("#inputAmount").val();
    if (!isNumber(amount)) {
        Toast.fire({
            icon: 'error',
            title: 'transfer to amount must number.'
        })

        return false;
    }
    return true;
}

function on_gaslimitchange() {
    var gas_limit = $("#input_gas_limit").val();
    if (!isNumber(gas_limit)) {
        Toast.fire({
            icon: 'error',
            title: 'transfer to gas_limit must number.'
        })

        return false;
    }
    return true;
}

function on_gaspricechange() {
    var gas_price = $("#input_gas_price").val();
    if (!isNumber(gas_price)) {
        Toast.fire({
            icon: 'error',
            title: 'transfer to gas_price must number.'
        })

        return false;
    }
    return true;
}

function do_transaction() {
    var password = $("#private_key_input").val();
    if (!isHexadecimal(password)) {
        Toast.fire({
            icon: 'error',
            title: 'pirvate key hex code lenght must 64.'
        })

        return false;
    }

    if (!on_toaddresschange() || !on_amountchange() || !on_gaslimitchange() || !on_gaspricechange()) {
        return;
    }

    var data = create_tx($("#inputToAddress").val(), $("#inputAmount").val(), $("#input_gas_limit").val(), $("#input_gas_price").val(), "key_a", "value_a");
    $.ajax({
        type: 'post',
        async: true,
        url: 'http://82.156.224.174:23001/transaction',
        data: data,
        dataType: "json"
    }).done(function (response) {
        Toast.fire({
            icon: 'info',
            title: 'success.'
        })
    });
}

function refresh_statistic() {
    $.ajax({
        type: 'post',
        async: true,
        url: '/zjchain/get_statistics/',
        data: { 'limit': '8640' },
        dataType: "json"
    }).done(function (response) {
        if (response.status == 0) {
            var zjchain = Math.floor(response.value.all_zjc / 10000000) + '.' + response.value.all_zjc % 10000000;
            $("#total_zjchain").html(zjchain);
            $("#total_address").html(response.value.all_address);
            $("#total_nodes").html(response.value.all_nodes);
            $("#total_transaction_count").html(response.value.all_transactions);
            $("#total_contracts").html(response.value.all_contracts);
            $("#total_average_qps").html(response.value.qps);

            $("#total_zjchain_grad").html('<i class="fas fa-caret-up"></i> ' + (response.value.all_zjc - response.cmp.all_zjc));
            $("#total_address_grad").html('<i class="fas fa-caret-up"></i> ' + (response.value.all_address - response.cmp.all_address));
            $("#total_nodes_grad").html('<i class="fas fa-caret-up"></i> ' + (response.value.all_nodes - response.cmp.all_nodes));
            $("#total_transaction_count_grad").html('<i class="fas fa-caret-up"></i> ' + (response.value.all_transactions - response.cmp.all_transactions));
            $("#total_contracts_grad").html('<i class="fas fa-caret-up"></i> ' + (response.value.all_contracts - response.cmp.all_contracts));
            $("#total_average_qps_grad").html('<i class="fas fa-caret-up"></i> 0');
        }
    });
}

function FormatNum(num, len) {
    var str_num = num.toString()
    var add_str = '';
    for (var i = str_num.length; i < len; ++i) {
        add_str += '0';
    }

    return add_str + str_num;
}

function initializeGridWithHeadBox(fields, name) {
    var configPanel
     if ($('.'+ name + 'headbox').length === 0) {
         configPanel = $('<div class="' + name + 'headbox' + '"></div>');
         $("#"+name).before(configPanel);
     }

    // fields.forEach(function(field) {
    //             const checkbox = $('<label><input id ='+field.name +' type="checkbox" checked /> ' + field.name + '</label>');
    //             configPanel.append(checkbox);
    // });

    $("."+name + "headbox input[type=checkbox]").on("click", function() {
                var $cb = $(this);
                $("#"+name).jsGrid("fieldOption", $cb.attr("id"), "visible", $cb.is(":checked"));
    });
}

function do_test_url() {
    $.ajax({
        type: 'post',
        async: true,
        url: '/zjchain/get_all_nodes_bls_info/',
        data: {
            'elect_height': 0,
            'offset': 0,
            'step': 1,
        },
        dataType: "json"
    }).done(function (response) {
        Toast.fire({
            icon: 'info',
            title: response.value
        })
    });

    $.ajax({
        type: 'post',
        async: true,
        url: '/zjchain/get_all_nodes_bls_info/',
        data: {
            'elect_height': 0,
            'offset': 0,
            'step': 2,
        },
        dataType: "json"
    }).done(function (response) {
        Toast.fire({
            icon: 'info',
            title: response.value
        })
    });

    $.ajax({
        type: 'post',
        async: true,
        url: '/zjchain/get_all_nodes_bls_info/',
        data: {
            'elect_height': 0,
            'offset': 0,
            'step': 3,
        },
        dataType: "json"
    }).done(function (response) {
        Toast.fire({
            icon: 'info',
            title: response.value
        })
    });

    $.ajax({
        type: 'post',
        async: true,
        url: '/zjchain/get_all_nodes_bls_info/',
        data: {
            'elect_height': 122,
            'offset': 1,
            'step': 1,
        },
        dataType: "json"
    }).done(function (response) {
        Toast.fire({
            icon: 'info',
            title: response.value
        })
    });

    $.ajax({
        type: 'post',
        async: true,
        url: '/zjchain/get_all_nodes_bls_info/',
        data: {
            'elect_height': 122,
            'offset': -1,
            'step': 1,
        },
        dataType: "json"
    }).done(function (response) {
        Toast.fire({
            icon: 'info',
            title: response.value
        })
    });

}

transactions_jsGrid_controller = {
            loadData: function () {
                var d = $.Deferred();

                $.ajax({
                    type: 'post',
                    async: true,
                    url: '/zjchain/transactions/',
                    data: { 'shard': shard_id, 'pool': -1, 'limit': (100 * page_size).toString() + ",100",'hash': block_hash,  'search': search_str, 'type': 0 },
                    dataType: "json"
                }).done(function (response) {
                    if (response.value != null && response.value.length == 100) {
                        has_next = true;
                    } else {
                        has_next = false;
                    }

                    d.resolve(response.value);
                });

                return d.promise();
            }
        };
        transactions_jsGrid_fields = [
            { name: "Time", type: "text", align: "center", width: 90 , "title": "时间"},
            { name: "Shard", type: "number", align: "center", width: 40, "title": "分片" },
            { name: "Pool", type: "number", align: "center", width: 40 , "title": "交易池"},
            { name: "Height", type: "number", align: "center", width: 50 , "title": "高度"},
            {
                name: "Type", type: "text", width: 60, align: "center", "title": "类型", itemTemplate: function (value) {
                    if (value == 16) {
                        return '<span class= "badge badge-warning">statistic</span>';
                    } else if (value == 8) {
                        return '<span class= "badge badge-danger">genesis</span>';
                    } else if (value == 9) {
                        return '<span class= "badge badge-info">LocalTo</span>';
                    } else if (value == 7) {
                        return '<span class= "badge badge-warning">statistic</span>';
                    } else if (value == 6) {
                        return '<span class= "badge badge-warning">timer</span>';
                    } else if (value == 5) {
                        return '<span class= "badge badge-success">transfer</span>';
                    } else if (value == 4) {
                        return '<span class= "badge badge-info">new_contract</span>';
                    } else if (value == 3) {
                        return '<span class= "badge badge-info">new_addr</span>';
                    } else if (value == 2) {
                        return '<span class= "badge badge-danger">genesis</span>';
                    } else if (value == 1) {
                        return '<span class= "badge badge-danger">BatchTo</span>';
                    } else if (value == 0) {
                        return '<span class= "badge badge-success">From</span>';
                    } else {
                        return '<span class= "badge badge-success">consensus</span>';
                    }
                },
            },
            {
                name: "Gid", type: "text", width: 75, align: "center", "title": "Gid", itemTemplate: function (value) {
                    return '<a href="javascript:void(0);" onclick="auto_search_transactions(\'' + value + '\')">' + value.substring(0, 4) + "..." + value.substring(value.length - 4, value.length) + '</a>';
                },
            },
            {
                name: "From", type: "text", width: 75, align: "center", "title": "源地址", itemTemplate: function (value) {
                    return '<a href="javascript:void(0);" onclick="auto_search_transactions(\'' + value + '\')">' + value.substring(0, 4) + "..." + value.substring(value.length - 4, value.length) + '</a>';
                },
            },
            {
                name: "To", type: "text", width: 75, align: "center", "title": "目标地址", itemTemplate: function (value) {
                    return '<a href="javascript:void(0);" onclick="auto_search_transactions(\'' + value + '\')">' + value.substring(0, 4) + "..." + value.substring(value.length - 4, value.length) + '</a>';
                },
            },
            {
                name: "Amount", type: "number", align: "center", width: 70, "title": "交易额", itemTemplate: function (value) {
                    return Math.floor(value / 10000000) + '.' + FormatNum(value % 10000000, 7);
                },
            },
            {
                name: "Gas", type: "number", align: "center", width: 70, "title": "交易费", itemTemplate: function (value) {
                    return Math.floor(value / 10000000) + '.' + FormatNum(value % 10000000, 7);
                },
            },
        ];

block_transactions_fields =  [
            {
                name: "Type", type: "text", width: 60, align: "center", "title": "类型", itemTemplate: function (value) {
                    if (value == 16) {
                        return '<span class= "badge badge-warning">statistic</span>';
                    } else if (value == 8) {
                        return '<span class= "badge badge-danger">genesis</span>';
                    } else if (value == 9) {
                        return '<span class= "badge badge-info">LocalTo</span>';
                    } else if (value == 7) {
                        return '<span class= "badge badge-warning">statistic</span>';
                    } else if (value == 6) {
                        return '<span class= "badge badge-warning">timer</span>';
                    } else if (value == 5) {
                        return '<span class= "badge badge-success">transfer</span>';
                    } else if (value == 4) {
                        return '<span class= "badge badge-info">new_contract</span>';
                    } else if (value == 3) {
                        return '<span class= "badge badge-info">new_addr</span>';
                    } else if (value == 2) {
                        return '<span class= "badge badge-danger">genesis</span>';
                    } else if (value == 1) {
                        return '<span class= "badge badge-danger">BatchTo</span>';
                    } else if (value == 0) {
                        return '<span class= "badge badge-success">From</span>';
                    } else {
                        return '<span class= "badge badge-success">consensus</span>';
                    }
                },
            },
            {
                name: "Gid", type: "text", width: 75, align: "center", "title": "Gid", itemTemplate: function (value) {
                    return '<a href="javascript:void(0);" onclick="auto_search_transactions(\'' + value + '\')">' + value.substring(0, 4) + "..." + value.substring(value.length - 4, value.length) + '</a>';
                },
            },
            {
                name: "From", type: "text", width: 75, align: "center", "title": "源地址", itemTemplate: function (value) {
                    return '<a href="javascript:void(0);" onclick="auto_search_transactions(\'' + value + '\')">' + value.substring(0, 4) + "..." + value.substring(value.length - 4, value.length) + '</a>';
                },
            },
            {
                name: "To", type: "text", width: 75, align: "center", "title": "目标地址", itemTemplate: function (value) {
                    return '<a href="javascript:void(0);" onclick="auto_search_transactions(\'' + value + '\')">' + value.substring(0, 4) + "..." + value.substring(value.length - 4, value.length) + '</a>';
                },
            },
            {
                name: "Amount", type: "number", align: "center", width: 70, "title": "交易额", itemTemplate: function (value) {
                    return Math.floor(value / 10000000) + '.' + FormatNum(value % 10000000, 7);
                },
            },
            {
                name: "Gas", type: "number", align: "center", width: 70, "title": "交易费", itemTemplate: function (value) {
                    return Math.floor(value / 10000000) + '.' + FormatNum(value % 10000000, 7);
                },
            },
        ];

 block_list_fileds = [
            { name: "Time", type: "text", "title": "时间", width: 90 },
            { name: "Shard", type: "number", align: "center", width: 40, "title": "分片" },
            { name: "Pool", type: "number", align: "center","title": "交易池",  width: 40 },
            { name: "Height", type: "number", align: "center", "title": "高度", width: 50 },
            {
                name: "PrevHash", type: "text", width: 120, align: "center", "title": "前置哈希", itemTemplate: function (value) {
                    return '<a href="javascript:void(0);" onclick="auto_search_data(\'' + value + '\')">' + value.substring(0, 6) + "..." + value.substring(value.length - 6, value.length) + '</a><span class="badge badge-warning " style="margin-left:5px;" onclick="show_block_detail(\'' + value + '\');">&nbsp;i&nbsp;</span>';
                },
            },
            {
                name: "Hash", type: "text", width: 120, align: "center", "title": "块哈希", itemTemplate: function (value) {
                    return '<a href="javascript:void(0);" onclick="auto_search_data(\'' + value + '\')">' + value.substring(0, 6) + "..." + value.substring(value.length - 6, value.length) + '</a><span class="badge badge-warning " style="margin-left:5px;" onclick="show_block_detail(\'' + value + '\');">&nbsp;i&nbsp;</span>';
                },
            },
            { name: "Vss", type: "number", align: "center", "title": "随机数", width: 130 },
            { name: "ElectHeight", type: "number", align: "center", width: 50, "title": "选举高度" },
            { name: "TimeHeight", type: "number", align: "center", width: 50, "title": "时间高度" },
            { name: "TxSize", type: "number", align: "center", "title": "交易数", width: 50 },
        ];


$(function () {
    //doDatabaseStuff();
    clipboard = new ClipboardJS('#save_prikey_id', {
        text: function () {
            return self_private_key.toString(16);
        }
    });
    clipboard.on('success', function (e) {
        Toast.fire({
            icon: 'info',
            title: 'copy private key success.'
        })
    });

    clipboard.on('error', function (e) {
        Toast.fire({
            icon: 'error',
            title: 'copy private key failed.'
        })
    });
    CreateInitAccount();
    Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    $("#jsGrid-block-transactions").jsGrid({
        height: "auto",
        width: "100%",
        pageSize: 100,
        sorting: true,
        paging: false,
        autoload: true,
        controller: transactions_jsGrid_controller,

        fields: block_transactions_fields,

    });
    initializeGridWithHeadBox(block_transactions_fields,'jsGrid-block-transactions');


    $("#jsGrid1").jsGrid({
        height: "auto",
        width: "100%",
        pageSize: 100,
        sorting: true,
        paging: false,
        autoload: true,
        controller: transactions_jsGrid_controller,
        
        fields: transactions_jsGrid_fields,

    });
    initializeGridWithHeadBox(transactions_jsGrid_fields,'jsGrid1');

    $("#jsGrid2").jsGrid({
        height: "auto",
        width: "100%",

        pageSize: 100,
        sorting: true,
        paging: false,
        autoload: true,
        controller: {
            loadData: function () {
                var d = $.Deferred();

                $.ajax({
                    type: 'post',
                    async: true,
                    url: '/zjchain/transactions/',
                    data: { 'shard': shard_id, 'pool': -1, 'limit': (100 * page_size).toString() + ",100", 'search': search_str, 'type': 1 },
                    dataType: "json"
                }).done(function (response) {
                    if (response.value != null && response.value.length == 100) {
                        has_next = true;
                    } else {
                        has_next = false;
                    }

                    d.resolve(response.value);
                });

                return d.promise();
            }
        },

        fields: block_list_fileds,
    });
    initializeGridWithHeadBox(block_list_fileds, "jsGrid2");

    $("#jsGrid3").jsGrid({
        height: "auto",
        width: "100%",

        pageSize: 100,
        sorting: true,
        paging: false,
        autoload: true,
        controller: {
            loadData: function () {
                var d = $.Deferred();

                $.ajax({
                    type: 'post',
                    async: true,
                    url: '/zjchain/accounts/',
                    data: { 'shard': shard_id, 'pool': -1, 'limit': (100 * page_size).toString() + ",100", 'search': search_str, 'order': 'order by balance desc' },
                    dataType: "json"
                }).done(function (response) {
                    if (response.value != null && response.value.length == 100) {
                        has_next = true;
                    } else {
                        has_next = false;
                    }

                    d.resolve(response.value);
                });

                return d.promise();
            }
        },

        fields: [
            { name: "address", type: "text", "title": "账户地址", width: 90 },
            { name: "Shard", type: "number", align: "center", width: 40, "title": "分片" },
            { name: "Pool", type: "number", align: "center", "title": "交易池", width: 40 },
            { name: "Balance", type: "number", align: "center", "title": "余额", width: 50 },
        ]
    });

    var refresh_table = function () {
        now_tm_refresh += 1000;
        if (now_tm_refresh >= refresh_table_period) {
            refresh_statistic();
            now_tm_refresh = 0;
        }

        if (search_str != $("#id_search").val()) {
            search_str = $("#id_search").val();
            search_data();
        }

        setTimeout(refresh_table, 1000);
    };
    // We could use setInterval instead, but I prefer to do it this way
    setTimeout(refresh_table, 1000);
    refresh_statistic();
    list_transactions();
});
