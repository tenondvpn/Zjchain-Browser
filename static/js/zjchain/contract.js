var content_mode = 0;
var page_size = 0;
var has_next = true;
var shard_id = -1;
var search_str = "";
var refresh_table_period = 60000;
var now_tm_refresh = 0;
var Toast = null;
var self_account_id = null;
var self_private_key = null;
var self_public_key = null;
var local_count_shard_id = null;
var clipboard = null;
var indexdb = null;
var self_contract_address = null;
var all_contracts = null;

const isHexadecimal = str => /^[A-F0-9]+$/i.test(str);
const isNumber = str => /^[0-9]+$/i.test(str);

function setCookie(name, value) {
    var Days = 30;
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

function drawMouseSpeedDemo() {
    var mrefreshinterval = 500; // update display every 500ms
    var lastmousex = -1;
    var lastmousey = -1;
    var lastmousetime;
    var mousetravel = 0;
    var mpoints = [];
    var mpoints_max = 30;
    $('html').mousemove(function (e) {
        var mousex = e.pageX;
        var mousey = e.pageY;
        if (lastmousex > -1) {
            mousetravel += Math.max(Math.abs(mousex - lastmousex), Math.abs(mousey - lastmousey));
        }
        lastmousex = mousex;
        lastmousey = mousey;
    });
    var mdraw = function () {
        var md = new Date();
        var timenow = md.getTime();
        if (lastmousetime && lastmousetime != timenow) {
            var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
            mpoints.push(pps);
            if (mpoints.length > mpoints_max)
                mpoints.splice(0, 1);
            mousetravel = 0;
            $('#mousespeed').sparkline(mpoints, { width: mpoints.length * 4 - 10, height: 60, tooltipSuffix: ' pixels per second' });
            $('#mousespeed_2').sparkline(mpoints, { width: mpoints.length * 4 - 10, height: 60, tooltipSuffix: ' pixels per second' });
            $('#mousespeed_3').sparkline(mpoints, { width: mpoints.length * 4 - 10, height: 60, tooltipSuffix: ' pixels per second' });
            $('#mousespeed_4').sparkline(mpoints, { width: mpoints.length * 4 - 10, height: 60, tooltipSuffix: ' pixels per second' });
        }
        lastmousetime = timenow;
        setTimeout(mdraw, mrefreshinterval);
    };
    // We could use setInterval instead, but I prefer to do it this way
    setTimeout(mdraw, mrefreshinterval);
}

function change_title(type) {
    $("#id_search").val("");
    search_str = "";
    page_size = 0;
    if (content_mode == 0) {
        $("#transaction_title").html("Blocks");
        $("#change_trans_btn").html("Transactions");
        content_mode = 1;
        $("#jsGrid1").hide();
        $("#jsGrid2").show();
        $("#jsGrid2").jsGrid("loadData");
    } else {
        $("#transaction_title").html("Transactions");
        $("#change_trans_btn").html("Blocks");
        content_mode = 0;
        $("#jsGrid2").hide();
        $("#jsGrid1").show();
        $("#jsGrid1").jsGrid("loadData");
    }
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
    } else {
        $("#jsGrid2").jsGrid("loadData");
    }
}

function get_next_page() {
    if (has_next) {
        page_size += 1;
    }

    if (content_mode == 0) {
        $("#jsGrid1").jsGrid("loadData");
    } else {
        $("#jsGrid2").jsGrid("loadData");
    }
}

function click_root() {
    shard_id = 2;
    if (content_mode == 0) {
        $("#jsGrid1").jsGrid("loadData");
    } else {
        $("#jsGrid2").jsGrid("loadData");
    }
}

function click_shard3() {
    shard_id = 3;
    if (content_mode == 0) {
        $("#jsGrid1").jsGrid("loadData");
    } else {
        $("#jsGrid2").jsGrid("loadData");
    }
}

function click_all() {
    shard_id = -1;
    if (content_mode == 0) {
        $("#jsGrid1").jsGrid("loadData");
    } else {
        $("#jsGrid2").jsGrid("loadData");
    }
}

function search_data() {
    search_str = $("#id_search").val();
    if (content_mode == 0) {
        $("#jsGrid1").jsGrid("loadData");
    } else {
        $("#jsGrid2").jsGrid("loadData");
    }
}

function auto_search_data(val) {
    $("#id_search").val(val);
    search_str = val;
    if (content_mode == 0) {
        $("#jsGrid1").jsGrid("loadData");
    } else {
        $("#jsGrid2").jsGrid("loadData");
    }
}

// function show_block_detail(hash) {
//     alert(hash);
// }

async function test() {
    // Generating private key
    const privateKeyBuf = Secp256k1.uint256("ad41e23d097bedaa434b0bef7735c047755c36177e040bfaf7ce745f60f1ceca", 16)
    const privateKey = Secp256k1.uint256(privateKeyBuf, 16)

    // Generating public key
    const publicKey = Secp256k1.generatePublicKeyFromPrivateKeyData(privateKey)
    const pubX = Secp256k1.uint256(publicKey.x, 16)
    const pubY = Secp256k1.uint256(publicKey.y, 16)

    // Signing a digest
    const digest = Secp256k1.uint256("2375f915f3f9ae35e6b301b7670f53ad1a5be15d8221ec7fd5e503f21d3450c8", 16)
    const sig = Secp256k1.ecsign(privateKey, digest)
    const sigR = Secp256k1.uint256(sig.r, 16)
    const sigS = Secp256k1.uint256(sig.s, 16)

    // Verifying signature
    const isValidSig = Secp256k1.ecverify(pubX, pubY, sigR, sigS, digest)

    const sigR1 = Secp256k1.uint256("1652d829cf778072e48394ae4f781d0c964c58fd73dc36bf392a0d7606b5838f", 16)
    const sigS1 = Secp256k1.uint256("135b9ce320f88b56ee662861a46274c1005bcaa2e6eaebcfdabac2f568dd7066", 16)
    const isValidSig1 = Secp256k1.ecverify(pubX, pubY, sigR1, sigS1, digest)

    console.log('Signature must be valid: ' + isValidSig +
        ', r: ' + sigR.toString(16) + ", s: " + sigS.toString(16) + ", sec valid: " + isValidSig1);
}

function create_tx(to, amount, gas_limit, gas_price) {
    var gid = GetValidHexString(Secp256k1.uint256(randomBytes(32)));
    var tx_type = 4;
    var msg = gid + "-" +
        self_account_id.toString(16) + "-" +
        to + "-" +
        amount + "-" +
        gas_limit + "-" +
        gas_price + "-" +
        tx_type.toString() + "-";
    var kechash = keccak256(msg)
    var digest = Secp256k1.uint256(kechash, 16)
    const sig = Secp256k1.ecsign(self_private_key, digest)
    const sigR = Secp256k1.uint256(sig.r, 16)
    const sigS = Secp256k1.uint256(sig.s, 16)
    const pubX = Secp256k1.uint256(self_public_key.x, 16)
    const pubY = Secp256k1.uint256(self_public_key.y, 16)
    const isValidSig = Secp256k1.ecverify(pubX, pubY, sigR, sigS, digest)
    if (!isValidSig) {
        Toast.fire({
            icon: 'error',
            title: 'signature transaction failed.'
        })

        return;
    }

    return {
        'gid': gid,
        'frompk': '04' + self_public_key.x.toString(16) + self_public_key.y.toString(16),
        'to': to,
        'amount': amount,
        'gas_limit': gas_limit,
        'gas_price': gas_price,
        'type': tx_type,
        'shard_id': local_count_shard_id,
        'hash': kechash,
        'sigr': sigR.toString(16),
        'sigs': sigS.toString(16)
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

function hex_to_str(str1) {
    var str = '';
    for (var n = 0; n < str1.length; n += 2) {
        str += String.fromCharCode(parseInt(str1.substr(n, 2), 16));
    }
    return str;
}

function create_new_private_key() {

}

function refresh_self_balance() {

}

function charge_for_this_key() {
}

function save_this_key() {
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

function GetValidHexString(uint256_bytes) {
    var str_res = uint256_bytes.toString(16)
    while (str_res.length < 64) {
        str_res = "0" + str_res;
    }

    return str_res;
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
    var contract_name = $("#contract_name").val();
    if (contract_name.length >= 20) {
        Toast.fire({
            icon: 'error',
            title: 'contract_name lenght must less than 20.'
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

    var data = create_tx($("#inputToAddress").val(), $("#inputAmount").val(), $("#input_gas_limit").val(), $("#input_gas_price").val());
    $.ajax({
        type: 'post',
        async: true,
        url: 'http://82.156.224.174:19098/do_transaction',
        data: data,
        dataType: "json"
    }).done(function (response) {
        Toast.fire({
            icon: 'info',
            title: 'success.'
        })
    });
}

function create_contract(gid, to, amount, gas_limit, gas_price) {
    var contract_src = Base64.encode($("#contract_source").val());
    var tx_type = 4;
    var msg = gid + "-" +
        self_account_id.toString(16) + "-" +
        to + "-" +
        amount + "-" +
        gas_limit + "-" +
        gas_price + "-" +
        tx_type.toString() + "-";
    msg += str_to_hex("__cbytescode") + $("#contract_bytes").val();
    msg += str_to_hex("__csourcecode") + str_to_hex(contract_src);
    msg += str_to_hex("__ctname") + str_to_hex($("#contract_name").val());
    msg += str_to_hex("__ctdesc") + str_to_hex($("#contract_desc").val());
    var kechash = keccak256(msg)
    var digest = Secp256k1.uint256(kechash, 16)
    const sig = Secp256k1.ecsign(self_private_key, digest)
    const sigR = Secp256k1.uint256(sig.r, 16)
    const sigS = Secp256k1.uint256(sig.s, 16)
    const pubX = Secp256k1.uint256(self_public_key.x, 16)
    const pubY = Secp256k1.uint256(self_public_key.y, 16)
    const isValidSig = Secp256k1.ecverify(pubX, pubY, sigR, sigS, digest)
    if (!isValidSig) {
        Toast.fire({
            icon: 'error',
            title: 'signature transaction failed.'
        })

        return;
    }
    
    return {
        'gid': gid,
        'frompk': '04' + self_public_key.x.toString(16) + self_public_key.y.toString(16),
        'to': to,
        'amount': amount,
        'gas_limit': gas_limit,
        'gas_price': gas_price,
        'type': tx_type,
        'shard_id': local_count_shard_id,
        'hash': kechash,
        'attrs_size': 4,
        'key0': str_to_hex('__cbytescode'),
        'key1': str_to_hex('__csourcecode'),
        'key2': str_to_hex('__ctname'),
        'key3': str_to_hex('__ctdesc'),
        "val0": $("#contract_bytes").val(),
        "val1": str_to_hex(contract_src),
        "val2": str_to_hex($("#contract_name").val()),
        "val3": str_to_hex($("#contract_desc").val()),
        'sigr': sigR.toString(16),
        'sigs': sigS.toString(16)
    }
}

function on_contract_source_change() {
    $.ajax({
        type: 'post',
        async: true,
        url: '/zjchain/get_bytescode/',
        data: { 'sorce_codes': $("#contract_source").val() },
        dataType: "json"
    }).done(function (response) {
        $("#contract_bytes").val(response.code);
    });
}

function do_create_contract() {
    var password = $("#private_key_input").val();
    if (!isHexadecimal(password)) {
        Toast.fire({
            icon: 'error',
            title: 'pirvate key hex code lenght must 64.'
        })

        return false;
    }

    if ($("#contract_bytes").val().length <= 64 || !$("#contract_bytes").val().startsWith('60806040')) {
        Toast.fire({
            icon: 'error',
            title: 'contract binary codes error.'
        })

        return false;
    }

    if (!on_contractnamechange() || !on_descchange() || !on_amountchange() || !on_gaslimitchange() || !on_gaspricechange()) {
        return;
    }

    var gid = GetValidHexString(Secp256k1.uint256(randomBytes(32)));
    var kechash = keccak256(self_account_id.toString(16) + gid + $("#contract_bytes").val())
    self_contract_address = kechash.slice(kechash.length - 40, kechash.length)
    $("#new_coontract_id").html("New contract: " + self_contract_address.toString(16));
    var data = create_contract(
        gid,
        self_contract_address.toString(16),
        $("#inputAmount").val(),
        $("#input_gas_limit").val(),
        $("#input_gas_price").val());
    $.ajax({
        type: 'post',
        async: false,
        url: 'http://82.156.224.174:19098/do_transaction',
        data: data,
        dataType: "json"
    }).done(function (response) {
        if (response.status == 0) {
            Toast.fire({
                icon: 'info',
                title: 'success.'
            })

            var called_contracts = getCookie('called_contracts');
            if (called_contracts == null) {
                called_contracts = "";
            }

            if (called_contracts.indexOf(self_contract_address.toString(16)) < 0) {
                called_contracts += self_contract_address.toString(16) + ","
                var split_contracts = called_contracts.split(',');
                if (split_contracts.lenth > 20) {
                    split_contracts = split_contracts.slice(split_contracts.lenth - 21, split_contracts.lenth)
                }
                setCookie('called_contracts', split_contracts.join(','));
            }
        } else {
            Toast.fire({
                icon: 'error',
                title: response.msg
            })
        }
    });
}

function show_contract_detail(index) {
    //alert(Base64.decode(all_contracts[index]['__csourcecode']));
    $.ajax({
        type: 'post',
        async: false,
        url: '/zjchain/get_contract_detail/',
        data: { 'contract_id': all_contracts[index]['to']},
        dataType: "json"
    }).done(function (response) {
        if (response.status == 0) {
            $("#detail_address").val(all_contracts[index]['to']);
            $("#detail_balance").val(0);
            $("#detail_creator").val(all_contracts[index]['from']);
            $("#detail_contract_name").val(all_contracts[index]['__ctname']);
            $("#detail_contract_desc").val(all_contracts[index]['__ctdesc']);
            $("#detail_contract_source").val(Base64.decode(response.value['__csourcecode']));
            $("#detail_contract_bytes").val(response.value['__cbytescode']);
            self_contract_address = all_contracts[index]['to'];
            $('#modal-contract-detail').modal({
                show: true
            }); 
        } else {
            Toast.fire({
                icon: 'error',
                title: response.msg
            })
        }
    });
}

function create_call_function(gid, to, gas_limit, gas_price) {
    var tx_type = 6;
    var msg = gid + "-" +
        self_account_id.toString(16) + "-" +
        to + "-" +
        '0' + "-" +
        gas_limit + "-" +
        gas_price + "-" +
        tx_type.toString() + "-";
    msg += str_to_hex("__cinput") + $("#detail_contract_function").val();
    var kechash = keccak256(msg)
    var digest = Secp256k1.uint256(kechash, 16)
    const sig = Secp256k1.ecsign(self_private_key, digest)
    const sigR = Secp256k1.uint256(sig.r, 16)
    const sigS = Secp256k1.uint256(sig.s, 16)
    const pubX = Secp256k1.uint256(self_public_key.x, 16)
    const pubY = Secp256k1.uint256(self_public_key.y, 16)
    const isValidSig = Secp256k1.ecverify(pubX, pubY, sigR, sigS, digest)
    if (!isValidSig) {
        Toast.fire({
            icon: 'error',
            title: 'signature transaction failed.'
        })

        return;
    }

    return {
        'gid': gid,
        'frompk': '04' + self_public_key.x.toString(16) + self_public_key.y.toString(16),
        'to': to,
        'amount': 0,
        'gas_limit': gas_limit,
        'gas_price': gas_price,
        'type': tx_type,
        'shard_id': local_count_shard_id,
        'hash': kechash,
        'attrs_size': 1,
        'key0': str_to_hex('__cinput'),
        "val0": $("#detail_contract_function").val(),
        'sigr': sigR.toString(16),
        'sigs': sigS.toString(16)
    }
}

function call_contract_function() {
    var password = $("#private_key_input").val();
    if (!isHexadecimal(password)) {
        Toast.fire({
            icon: 'error',
            title: 'pirvate key hex code lenght must 64.'
        })

        return false;
    }

    var gas_limit = $("#call_func_gas_limit").val();
    if (!isNumber(gas_limit)) {
        Toast.fire({
            icon: 'error',
            title: 'transfer to gas_limit must number.'
        })

        return false;
    }

    var gas_limit = $("#call_func_gas_price").val();
    if (!isNumber(gas_limit)) {
        Toast.fire({
            icon: 'error',
            title: 'transfer to gas_price must number.'
        })

        return false;
    }

    var gid = GetValidHexString(Secp256k1.uint256(randomBytes(32)));
    var data = create_call_function(
        gid,
        self_contract_address.toString(16),
        $("#call_func_gas_limit").val(),
        $("#call_func_gas_price").val());
    var called_contracts = getCookie('called_contracts');
    if (called_contracts == null) {
        called_contracts = "";
    }

    if (called_contracts.indexOf(self_contract_address.toString(16)) < 0) {
        called_contracts += self_contract_address.toString(16) + ","
        var split_contracts = called_contracts.split(',');
        if (split_contracts.lenth > 20) {
            split_contracts = split_contracts.slice(split_contracts.lenth - 21, split_contracts.lenth)
        }
        setCookie('called_contracts', split_contracts.join(','));
        alert(split_contracts.join(','));
    }

    $.ajax({
        type: 'post',
        async: false,
        url: 'http://82.156.224.174:19098/do_transaction',
        data: data,
        dataType: "json"
    }).done(function (response) {
        if (response.status == 0) {
            Toast.fire({
                icon: 'info',
                title: 'success.'
            })
        } else {
            Toast.fire({
                icon: 'error',
                title: response.msg
            })
        }
    });
}

function get_all_called_contracts() {
    var called_contracts = getCookie('called_contracts');
    if (called_contracts == null) {
        called_contracts = "";
    }

    if (called_contracts == "") {
        $("#latest_called_contracts").hide();
        $("#all_called_contracts").hide();
        return;
    }

    $("#latest_called_contracts").show();
    $("#all_called_contracts").show();
    $.ajax({
        type: 'post',
        async: true,
        url: '/zjchain/get_all_contracts/',
        data: { 'contracts': called_contracts, 'limit': '100' },
        dataType: "json"
    }).done(function (response) {
        var html_str = '';
        all_contracts = response.value;
        var bgs = ['bg-primary', 'bg-primary', 'bg-info', 'bg-warning', 'bg-danger'];
        for (var i = 0; i < response.value.length; ++i) {
            html_str += ('<div class="col-md-3" style="text-align:center;margin-top:15px;">' +
                '<a class="btn btn-app" onclick="show_contract_detail(' + i + ')" style = "width: 90%;height:140px;border: 1px solid #3a4047!important;">' +
                '<span class="badge ' + bgs[Math.floor(Math.random() * bgs.length)] + '">' + response.value[i]["to"] + '</span>' +
                '<h5 style="margin-top:10px;">' + response.value[i]["__ctname"] + '</h5>' +
                '<p style="white-space:normal;word-wrap:break-word;word-break:break-all;text-align:left;width:90%;margin-left:5%;"><font size="3">' + response.value[i]["__ctdesc"] + '</font></p>' +
                '</a>' +
                '</div>');
        }

        $("#all_called_contracts").html(html_str);
    });
}

function get_all_contracts() {
    $.ajax({
        type: 'post',
        async: true,
        url: '/zjchain/get_all_contracts/',
        data: { 'contracts': '', 'limit': '1000' },
        dataType: "json"
    }).done(function (response) {
        var html_str = '';
        all_contracts = response.value;
        var bgs = ['bg-primary', 'bg-primary', 'bg-info', 'bg-warning', 'bg-danger'];
        for (var i = 0; i < response.value.length; ++i) {
            html_str += ('<div class="col-md-3" style="text-align:center;margin-top:15px;">' +
                '<a class="btn btn-app" onclick="show_contract_detail(' + i + ')" style = "width: 90%;height:140px;border: 1px solid #3a4047!important;">' +
                '<span class="badge ' + bgs[Math.floor(Math.random() * bgs.length)]+ '">' + response.value[i]["to"] + '</span>' +
                '<h5 style="margin-top:10px;">' + response.value[i]["__ctname"] + '</h5>' +
                '<p style="white-space:normal;word-wrap:break-word;word-break:break-all;text-align:left;width:90%;margin-left:5%;"><font size="3">' + response.value[i]["__ctdesc"] + '</font></p>' +
                '</a>' +
                '</div>');
        }

        $("#all_publish_contracts").html(html_str);
    });
}

$(function () {
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
    get_all_called_contracts();
    get_all_contracts();
});
