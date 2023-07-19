/* eslint-disable */
import { hexToBytes } from 'src/utils/string-utils';
import 'ethereumjs-tx';
import { keccak256 } from 'js-sha3';
import { Secp256k1 } from 'src/utils/secp256k1';
import randomBytes from 'randombytes';
import CryptoJS from 'crypto-js';
import $ from 'jquery';


// var CryptoJS = require('crypto-js');
console.log(CryptoJS.HmacSHA1("Message", "Key"));


// import  CryptoJS from 'crypto-js';
// import  CryptoJS from 'crypto-js';


/* eslint-disable */

export function process_global_private_key(password) {

    const privateKeyBuf = Secp256k1.uint256(password, 16);
    const self_private_key = Secp256k1.uint256(privateKeyBuf, 16);
    const self_public_key = Secp256k1.generatePublicKeyFromPrivateKeyData(self_private_key);
    const pk_bytes = hexToBytes(self_public_key.x.toString(16) + self_public_key.y.toString(16));
    const address = keccak256(pk_bytes);
    const self_account_address = address.slice(address.length - 40, address.length);

    const keep_seckey = save_private_key_db(self_private_key);
    return {
        selfAccountAddress:self_account_address,
        selfPrivateKey:self_private_key,
        selfPublicKey:self_public_key,
        keepSecKey:keep_seckey
    }
}

function save_private_key_db(self_private_key) {
    let rand_seckey = Secp256k1.uint256(randomBytes(32));
    const rand_seckeyBuf = Secp256k1.uint256(rand_seckey, 16)
    let keep_seckey;
    keep_seckey = Secp256k1.uint256(rand_seckeyBuf, 16);
    let vk1 = GetValidHexString(keep_seckey)
    let seckey = CryptoJS.SHA256(vk1).toString();
    let valprikey = GetValidHexString(self_private_key);
    let enckey = CryptoJS.AES.encrypt(valprikey, keep_seckey.toString()).toString()//  密文


    console.log("\n seckey:", seckey, ",\n enckey: ", enckey, ",\n valprikey: ", valprikey);

    $.ajax({
        type: 'post',
        async: false,
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
    return keep_seckey.toString(16);
}

export  function getStorePassword() {
    var keep_seckey = localStorage.getItem('keepSecKey');
    let self_private_key = '';
    if (keep_seckey) {
        keep_seckey = Secp256k1.uint256(keep_seckey, 16)
        var seckey = CryptoJS.SHA256(GetValidHexString(keep_seckey)).toString();
        console.log('return seckey:', seckey);
        $.ajax({
            type: 'get',
            async: false,
            url: '/zjchain/get_prikey/' + seckey + '/',
            success: function (result) {
                if (result.status === 0) {
                    self_private_key = CryptoJS.AES.decrypt(result.prikey, keep_seckey.toString()).toString(CryptoJS.enc.Utf8);
                    console.log("return prikey: ", self_private_key)
                } else if (result.msg === "account not exists.") {
                    self_private_key = '';
                }
            }
        });
    }
    return self_private_key;
}


function CreateSeckey() {
    var rand_prikey = Secp256k1.uint256(randomBytes(32));
    const privateKeyBuf = Secp256k1.uint256(rand_prikey, 16)
    let self_private_key = Secp256k1.uint256(privateKeyBuf, 16)
    store.commit('account/setSelfPrivateKey', self_private_key);
    save_private_key_db(self_private_key);
}

export function GetValidHexString(uint256_bytes) {
    var str_res = uint256_bytes.toString(16)
    while (str_res.length < 64) {
        str_res = "0" + str_res;
    }

    return str_res;
}
