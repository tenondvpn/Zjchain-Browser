<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import { useStore } from 'src/store';
import { isHexadecimal } from 'src/utils/string-utils';
import { getAddressFromPrivateKey, handleError } from 'src/utils/zjUtils';
import { Error } from 'src/types';
import { zjApi } from 'src/api/zjApi';
import { new_contract } from 'src/api/zjChainApi';
import { Loading } from 'quasar';
import { useRouter } from 'vue-router';

const defaultCode ='// This is a Demo\n' +
    'pragma solidity ^0.7.5;\n' +
    'contract Storage {\n' +
    '    uint256 public storedData;\n' +
    '    function set(uint256 data) public {\n' +
    '        storedData = data;\n' +
    '    }\n' +
    '    function get() public returns (uint256) {\n' +
    '        return storedData;\n' +
    '    }\n' +
    '}\n';
export default defineComponent({
    name:'NewContract',
    methods: { isHexadecimal },
    props: {
    },
    setup() {
        const router = useRouter();
        const store = useStore();
        const vDialog = ref(false);
        const isLogin = computed(() => !!store.state.account.selfPrivateKey);
        const selfPrivateKey = computed(() => store.state.account.selfPrivateKey);
        const selfAddress = computed(() => store.state.account.selfAccountAddress);
        const selfPublicKey = computed(() => store.state.account.selfPublicKey);
        const selfShardId = computed(() => store.state.account.selfShardId);
        const formData = reactive({
            tx_type:6,
            to:'',
            contract_name: '',
            contract_desc:'',
            amount: 0,
            gas_limit: 0,
            gas_price: 0,
            prepay:0,
            sorce_codes: defaultCode,
            contract_bytes:''.toString(),
            input:'',
            self_private_key:selfPrivateKey,
            selfAddress:selfAddress,
            selfPublicKey:selfPublicKey,
            local_account_shard_id:selfShardId,
        });
        onMounted(() => {
            if (!isLogin.value || getAddressFromPrivateKey(selfPrivateKey.value) !== selfAddress.value) {
                store.commit('account/setNeedReLogin', true);
            }
            // formData.selfAddress = selfAddress.value;
            // formData.self_private_key = selfPrivateKey.value;
            // formData.selfPublicKey = selfPublicKey.value;
            // formData.local_account_shard_id = selfShardId.value;
        });
        async function generatedCode() {
            try {
                let responsePromise = await zjApi.getBytescode(formData.sorce_codes);
                formData.contract_bytes = responsePromise.code;
            } catch (e) {
                handleError('Binary Code Auto Generated failed');
            }
        }

        function jump2AccountContract(accountId : string) {
            void router.push({
                path: '/account/' + accountId,
                query: {
                    tab: 'contract-detail',
                },
            });
        }

        async function onSubmit() {
            try {
                Loading.show();
                const createContractId = await new_contract(formData) as string;
                Loading.hide();
                if (createContractId) {
                    jump2AccountContract(createContractId);
                }
            } catch (e) {
                const error = JSON.parse(JSON.stringify(e)) as Error;
                handleError(
                    error?.cause?.json?.error?.what || 'Unable to Deploy the Contract',
                );
                Loading.hide();
                console.log(2);
                throw e;
            }
        }
        function reLoginAndvDialog() {
            if (isLogin.value) {
                vDialog.value = true;
            }
        }



        return{
            isLogin,
            vDialog,
            formData,
            onSubmit,
            generatedCode,
            reLoginAndvDialog,
            jump2AccountContract,
        };
    },
});

</script>

<template>
<q-btn
    class="q-mt-lg q-mr-lg"
    padding="sm md"
    color="primary"
    label="New Contract"
    @click="vDialog = true"
/>
<q-dialog
    v-model="vDialog"
    persistent
    transition-show="scale"
    transition-hide="scale"
>
    <q-card class="q-pa-lg dialog-card">
        <q-form
            @submit="onSubmit"
        >
            <div class="row justify-between items-center q-py-lg">
                <h1 class="text-h5 q-ma-none">New  Contract</h1>
            </div>
            <div class="q-col-gutter-md">
                <div class="row  col-gutter-md">
                    <div class="col-12 ">
                        <q-input
                            v-model="formData.contract_name"
                            outlined
                            dense
                            hide-bottom-space
                            lazy-rules
                            bg-color="white"
                            label="Contract Name"
                            maxlength="40"
                            :rules="[value => !!value && value.length <= 20  || 'Contract Name required and length must less than 20.']"
                        />
                    </div>
                </div>
                <div class="row   q-col-gutter-md">
                    <div class="col-12 ">
                        <q-input
                            v-model="formData.contract_desc"
                            outlined
                            dense
                            hide-bottom-space
                            lazy-rules
                            bg-color="white"
                            label="Contract Desc"
                            :rules="[value => !!value && value.length <= 64  || ' Contract Desc required and length must less than 64.']"
                        />
                    </div>
                </div>
                <div class="row   q-col-gutter-md">
                    <div class="col-12 ">
                        <q-input
                            v-model="formData.amount"
                            outlined
                            dense
                            hide-bottom-space
                            lazy-rules
                            bg-color="white"
                            label="Amount"
                            type="number"
                            maxlength="40"
                        />
                    </div>
                </div>
                <div class="row   q-col-gutter-md" >
                    <div class=" col">
                        <q-input
                            v-model="formData.gas_limit"
                            outlined
                            dense
                            hide-bottom-space
                            lazy-rules
                            bg-color="white"
                            type="number"
                            label="Max Gas"
                            maxlength="12"
                        />
                    </div>
                    <div class="col">
                        <q-input
                            v-model="formData.gas_price"
                            outlined
                            dense
                            hide-bottom-space
                            lazy-rules
                            bg-color="white"
                            type="number"
                            label="Gas Price"
                            maxlength="40"
                        />
                    </div>
                    <div class="col">
                        <q-input
                            v-model="formData.prepay"
                            outlined
                            dense
                            hide-bottom-space
                            lazy-rules
                            bg-color="white"
                            type="number"
                            label="Prepay Gas"
                            maxlength="40"
                        />
                    </div>

                </div>
                <div class="row   q-col-gutter-md" >
                    <div class=" col">
                        <q-input
                            v-model="formData.sorce_codes"
                            outlined
                            dense
                            oncopy=""
                            hide-bottom-space
                            lazy-rules
                            bg-color="blue-grey-2"
                            type="textarea"
                            label="Paste solidity codes Here."
                        />

                        <div class="row justify-center">
                            <q-btn
                                class="q-mt-md"
                                padding="sm md"
                                color="blue-grey-2"
                                text-color="primary"
                                label="Generated"
                                @click="generatedCode"
                            />
                        </div>
                    </div>

                    <div class="col">
                        <q-input
                            v-model="formData.contract_bytes"
                            outlined
                            dense
                            hide-bottom-space
                            lazy-rules
                            readonly
                            bg-color="white"
                            :rules="[value => !!value && value.startsWith('60806040') || 'The Binary Code has error']"
                            type="textarea"
                            label="Binary Code Auto Generated"
                        />
                    </div>
                </div>
            </div>

            <q-card-actions align="right" class="text-primary q-pt-lg">
                <div>
                    <q-btn
                        v-close-popup
                        outline
                        class="q-mr-sm"
                        padding="sm md"
                        color="white"
                        text-color="primary"
                        label="Cancel"
                    />
                    <q-btn
                        unelevated
                        padding="sm md"
                        color="primary"
                        label="Deploy Contracts"
                        type="submit"
                    />
                </div>
            </q-card-actions>
        </q-form>

    </q-card>
</q-dialog>
</template>

<style scoped lang="sass">
.dialog-card
    background: #E8E2F7
    width: 700px
    max-width: 80vw
    border-radius: 10px

</style>
