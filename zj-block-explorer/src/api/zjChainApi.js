/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-assignment */
import { Loading } from 'quasar';
import $ from 'jquery';
import {
    create_tx,
    GetValidHexString,
    handleError,
    handleSuccess,
    param_contract,
} from 'src/utils/zjUtils';
import { Secp256k1 } from 'src/utils/secp256k1';
import randomBytes from 'randombytes';
import CryptoJS from 'crypto-js';
import { keccak256 } from 'js-sha3';
import querystring from 'querystring';
import http from 'http';

const controller = new AbortController();

export function do_transaction(fromDate) {
    const data = create_tx(fromDate);
    controller.abort();
    // 默认选项
    Loading.show();
    $.ajax({
        type: 'post',
        async: true,
        timeout:10000,
        url: '/chain_server/transaction',
        data: data,
        dataType: 'json',
        success: function (result) {
            Loading.hide();
            handleSuccess();
            console.log(`do_transaction handleSuccess ${result.toString()}`);
        },
        error:function(xhr){
            Loading.hide();
            if (xhr.statusText === 'OK') {
                handleSuccess();
                return;
            }
            const msg = `status:${xhr.status},    desc:${xhr.statusText}`;
            console.log('错误提示： ' + msg);
            handleError(msg);
        },
    });
}

export  function new_contract(formData) {
    controller.abort();
    const self_account_id = formData.selfAddress;
    const contract_bytes = formData.contract_bytes;

    const gid = GetValidHexString(Secp256k1.uint256(randomBytes(32)));
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    const kechash = keccak256(self_account_id + gid + contract_bytes).toString('hex');
    const self_contract_address = kechash.slice(kechash.length - 40, kechash.length);

    formData.to = self_contract_address;
    const data = param_contract(formData);
    console.log(`new_contract_id : ${self_contract_address}`);
    return  PostCode(data);
}

function PostCode(data) {
    const post_data = querystring.stringify(data);
    const post_options = {
        path: '/chain_server/transaction',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(post_data),
        },
    };

    return new Promise((resolve) => {
        const post_req = http.request(post_options, function (res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
                Loading.hide();
                if (chunk !== 'ok') {
                    handleError(chunk);
                    resolve('');
                } else {
                    handleSuccess();
                    resolve(data.to);
                }
                if(process.env.DEBUGGING) {
                    console.log(`Response: ${chunk}, ${JSON.stringify(data, null, 4)}`);
                }
            });
        });
        post_req.write(post_data);
        post_req.end();
    });
}

export async function call_contract_function(formData) {
    const contract_address = formData.to;
    console.log(`contract_address: ${contract_address}`);
    const data = param_contract(formData);
    return  PostCode(data);
}


export function save_private_key_db(self_private_key) {
    let rand_seckey = Secp256k1.uint256(randomBytes(32));
    const rand_seckeyBuf = Secp256k1.uint256(rand_seckey, 16);
    let keep_seckey;
    keep_seckey = Secp256k1.uint256(rand_seckeyBuf, 16);
    let vk1 = GetValidHexString(keep_seckey);
    let seckey = CryptoJS.SHA256(vk1).toString();
    let valprikey = GetValidHexString(self_private_key);
    let enckey = CryptoJS.AES.encrypt(valprikey, keep_seckey.toString()).toString();//  密文


    console.log('\n seckey:', seckey, ',\n enckey: ', enckey, ',\n valprikey: ', valprikey);

    $.ajax({
        type: 'post',
        async: false,
        url: '/zjchain/set_private_key/',
        data: {
            'key': seckey,
            'enc': enckey,
        },
        dataType: 'json',
        success: function (result) {
            if (result.status) {
            } else {
            }
        },
    });
    return keep_seckey.toString(16);
}

export  function getStorePassword() {
    controller.abort();
    let keep_seckey = localStorage.getItem('keepSecKey');
    return new Promise((resolve) => {
        if (keep_seckey) {
            keep_seckey = Secp256k1.uint256(keep_seckey, 16);
            const seckey = CryptoJS.SHA256(GetValidHexString(keep_seckey)).toString();
            console.log('return seckey:', seckey);
            $.ajax({
                type: 'get',
                async:true,
                timeout:2000,
                url: '/zjchain/get_prikey/' + seckey + '/',
                success: function (result) {
                    if (result.status === 0) {
                        const self_private_key = CryptoJS.AES.decrypt(result.prikey, keep_seckey.toString()).toString(CryptoJS.enc.Utf8);
                        console.log('return prikey: ', self_private_key);
                        resolve(self_private_key);
                    } else if (result.msg === 'account not exists.') {
                        resolve('');
                    }
                },
                error: function (xhr) {
                    Loading.hide();
                    const msg = `status:${xhr.status},    desc:${xhr.statusText}`;
                    console.log('错误提示： ' + msg);
                    handleError(msg);
                    resolve('');
                },
            });
        } else {
            resolve('');
        }
    });
}

