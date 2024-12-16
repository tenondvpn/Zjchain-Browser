const isHexadecimal = str => /^[A-F0-9]+$/i.test(str);
var private_key_base16_str = "cefc2c33064ea7691aee3e5e4f7842935d26f3ad790d81cf015e79b78958e848";
if (!isHexadecimal(private_key_base16_str)) {
    Toast.fire({
        icon: 'error',
        title: 'pirvate key hex code lenght must 64.'
    })

    return false;
}

const privateKeyBuf = Secp256k1.uint256(private_key_base16_str, 16)
var self_private_key = Secp256k1.uint256(privateKeyBuf, 16)
var self_public_key = Secp256k1.generatePublicKeyFromPrivateKeyData(self_private_key)
var pk_bytes = hexToBytes(self_public_key.x.toString(16) + self_public_key.y.toString(16))
var address = keccak256(pk_bytes).toString('hex')
var address = address.slice(address.length - 40, address.length)


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

function do_transaction(to_addr, amount, gas_limit) {
    var gas_price = 1;
    var data = create_tx(to_addr, to_amount, gas_limit, gas_price, "", "");
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

function do_transaction_confirm(value) {
    var to_addr = "a0793c84fb3133c0df1b9a6ccccbbfe5e7545138";
    var to_amount = 1;
    var gas_limit = 10000;
    var gas_price = 1;
    var data = create_tx(to_addr, to_amount, gas_limit, gas_price, "def", value);
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


var to_addr = "a0793c84fb3133c0df1b9a6d5b4bbfe5e7545138";
var to_amount = 100000000;
var gas_limit = 10000;
do_transaction(to_addr, to_amount, gas_limit)

do_transaction_confirm("data");
