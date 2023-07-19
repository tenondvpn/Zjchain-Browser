import { describe, it } from '@jest/globals';
import CryptoJS from 'crypto-js';
import { Secp256k1 } from 'src/utils/secp256k1';
import { create_tx, process_global_private_key } from 'src/utils/zjUtils';
import { keccak256 } from 'js-sha3';


describe('zjchain functions', () => {
    describe('process_global_private_key', () => {
        it('save_private_key', () => {

            const valprikey = '0000000000000000000000000000000000000000000000000000000019088469';
            const seckey = '123be2ebe36dd75bcd1ab76a3ca7fd63019c20e3ef8aaae2b3828077931782c0';
            const enckey = CryptoJS.AES.encrypt(valprikey, seckey).toString();//  密文
            const decseckey = CryptoJS.AES.decrypt(enckey, seckey).toString(CryptoJS.enc.Utf8);

            let password = '1';
            password = Secp256k1.uint256(password, 16).toString();
            console.log(password);
            password = Secp256k1.uint256(password, 16).toString();
            console.log(password);
            password = Secp256k1.uint256(password, 16).toString();
            console.log(password);


            // expect(isValidAccount(validAntelopeAccount)).toBe(true);
        });
        it('create_tx', () => {
            const  res = create_tx();

            console.log(res);
        });
    });
});
