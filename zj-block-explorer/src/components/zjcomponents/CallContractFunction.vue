<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue';
import { useStore } from 'src/store';
import { copy, isHexadecimal } from 'src/utils/string-utils';
import { getAddressFromPrivateKey, handleError } from 'src/utils/zjUtils';
import { Error } from 'src/types';
import { call_contract_function } from 'src/api/zjChainApi';
import { Loading } from 'quasar';
import { useRoute } from 'vue-router';

export default defineComponent({
    name:'CallFunction',
    methods: { copy, isHexadecimal },
    props: {
    },
    setup() {
        const store = useStore();
        const route = useRoute();
        const vDialog = ref(false);
        const contract_address = computed(() => (route.params.account as string) || '');
        const isLogin = computed(() => !!store.state.account.selfPrivateKey);
        const selfPrivateKey = computed(() => store.state.account.selfPrivateKey);
        const selfAddress = computed(() => store.state.account.selfAccountAddress);
        const selfPublicKey = computed(() => store.state.account.selfPublicKey);
        const selfShardId = computed(() => store.state.account.selfShardId);

        const formData = reactive({
            tx_type:8,
            to:contract_address,
            contract_name: '',
            contract_desc:'',
            amount: 0,
            gas_limit: 0,
            gas_price: 0,
            prepay:0,
            sorce_codes: '',
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
        });

        async function onSubmit() {
            try {
                Loading.show();
                await call_contract_function(formData);
                Loading.hide();
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
            reLoginAndvDialog,
        };
    },
});

</script>

<template>
<q-btn
    padding="sm md"
    color="primary"
    label="Call Function"
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
            class=""
            @submit="onSubmit"
        >
            <div class="">
                <div class="row justify-between items-center q-py-lg">
                    <h1 class="text-h5 q-ma-none">Call Function</h1>
                </div>
                <div class="q-col-gutter-md">
                    <div class="row   q-col-gutter-md">
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
                                type="number"
                                bg-color="white"
                                label="Gas Price"
                                maxlength="40"
                            />
                        </div>
                    </div>
                    <div class="row   q-col-gutter-md">
                        <div class=" col">
                            <div class="q-field">
                                <q-input
                                    v-model="formData.input"
                                    outlined
                                    dense
                                    hide-bottom-space
                                    lazy-rules
                                    bg-color="blue-grey-2"
                                    type="textarea"
                                    rows="15"
                                    label="Paste call function binary codes."
                                />
                                <q-btn
                                    flat
                                    round
                                    color="black"
                                    icon="content_copy"
                                    size="sm"
                                    class="copy-button"
                                    @click="copy(formData.input)"
                                />
                            </div>

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
                            label="Call Function"
                            type="submit"
                        />
                    </div>
                </q-card-actions>
            </div>
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
.from
    height: 500px

.q-field
    position: relative

.copy-button
    position: absolute
    top: 0
    right: 28px
</style>
