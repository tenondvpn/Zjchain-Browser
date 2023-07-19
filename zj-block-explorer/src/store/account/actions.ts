import { ActionTree } from 'vuex';
import { StateInterface } from 'src/store/index';
import { AccountStateInterface } from 'src/store/account/state';
import { api } from 'src/api/index';
import { Action } from 'src/types';


export const actions: ActionTree<AccountStateInterface, StateInterface> = {
    login({ commit }, {
        selfAccountAddress, selfPrivateKey, selfPublicKey, keepSecKey,
    }) {

        commit('setSelfAccountAddress', selfAccountAddress);
        commit('setSelfPublicKey', selfPublicKey);
        commit('setSelfPrivateKey', selfPrivateKey);

        localStorage.setItem('selfAccountAddress', selfAccountAddress);
        localStorage.setItem('keepSecKey', keepSecKey);
        localStorage.setItem('autoLogin', 'cleos');
    },
    logout({ commit }) {
        commit('setSelfAccountAddress', '');
        commit('setSelfPublicKey', null);
        commit('setSelfPrivateKey', null);


        localStorage.removeItem('selfAccountAddress');
        localStorage.removeItem('autoLogin');
        localStorage.removeItem('keepSecKey');
    },
    async loadAccountData({
        commit,
        state,
    }) {
        try {
            const data = await api.getAccount(state.accountName);
            commit('setAccountData', data);
        } catch (e) {
            return;
        }
    },

    async sendAction({
        state,
        dispatch,
    }, {
        account,
        data,
        name,
        actor,
        permission,
    }) {
        const actions = [
            {
                account: account as string ?? state.abi.account_name,
                name: name as string,
                authorization: [
                    {
                        actor: actor as string ?? state.accountName,
                        permission: permission as string ?? state.accountPermission,
                    },
                ],
                data: data as unknown,
            },
        ];
        return dispatch('sendTransaction', actions);
    },
    async sendTransaction({
        commit,
        state,
    }, actions: Action[]) {
        let transaction = null;
        try {
            transaction = await state.user.signTransaction(
                {
                    actions,
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 180,
                },
            );
            commit('setTransaction', transaction.transactionId);
        } catch (e) {
            console.error(e);
            commit('setTransactionError', e);
        }
        return transaction;
    },



    resetTransaction({ commit }) {
        commit('setTransaction', '');
        commit('setTransactionError', '');
    },


    async sendVoteTransaction({
        commit,
        state,
    }) {
        let transaction = null;
        const actions = [
            {
                account: 'eosio',
                name: 'voteproducer',
                authorization: [
                    {
                        actor: state.accountName,
                        permission: state.accountPermission,
                    },
                ],
                data: {
                    voter: state.accountName,
                    proxy: '',
                    producers: state.vote,
                },
            },
        ];
        try {
            transaction = await state.user.signTransaction(
                {
                    actions,
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 180,
                },
            );
            commit('setTransaction', transaction.transactionId);
        } catch (e) {
            commit('setTransactionError', e);
        }
    },
    async buyRam({
        commit,
        dispatch,
        state,
    }, {
        amount,
        receivingAccount,
    }) {
        let transaction = null;
        const actions = [
            {
                account: 'eosio',
                name: 'buyram',
                authorization: [
                    {
                        actor: state.accountName,
                        permission: state.accountPermission,
                    },
                ],
                data: {
                    payer: state.accountName,
                    receiver: receivingAccount as string,
                    quant: amount as string,
                },
            },
        ];
        try {
            transaction = await state.user.signTransaction(
                {
                    actions,
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 180,
                },
            );
            commit('setTransaction', transaction.transactionId);
            void dispatch('loadAccountData');
        } catch (e) {
            commit('setTransactionError', e);
        }
    },
    async buyRamBytes({
        commit,
        dispatch,
        state,
    }, {
        amount,
        receivingAccount,
    }) {
        let transaction = null;
        const actions = [
            {
                account: 'eosio',
                name: 'buyrambytes',
                authorization: [
                    {
                        actor: state.accountName,
                        permission: state.accountPermission,
                    },
                ],
                data: {
                    payer: state.accountName,
                    receiver: receivingAccount as string,
                    bytes: amount as string,
                },
            },
        ];
        try {
            transaction = await state.user.signTransaction(
                {
                    actions,
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 180,
                },
            );
            commit('setTransaction', transaction.transactionId);
            void dispatch('loadAccountData');
        } catch (e) {
            commit('setTransactionError', e);
        }
    },
    async sellRam({
        commit,
        dispatch,
        state,
    }, { amount }) {
        let transaction = null;
        const actions = [
            {
                account: 'eosio',
                name: 'sellram',
                authorization: [
                    {
                        actor: state.accountName,
                        permission: state.accountPermission,
                    },
                ],
                data: {
                    account: state.accountName,
                    bytes: amount as string,
                },
            },
        ];
        try {
            transaction = await state.user.signTransaction(
                {
                    actions,
                },
                {
                    blocksBehind: 3,
                    expireSeconds: 180,
                },
            );
            commit('setTransaction', transaction.transactionId);
            void dispatch('loadAccountData');
        } catch (e) {
            commit('setTransactionError', e);
        }
    },
};
