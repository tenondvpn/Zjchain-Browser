<script  lang="ts">
import { computed, defineComponent, inject, onMounted, ref, watch } from 'vue';
import AccountKeyValueTable from 'components/zjcomponents/AccountKeyValueTable.vue';
import { useRoute } from 'vue-router';
import ContractCodemirror from 'components/zjcomponents/ContractCodemirror.vue';
import { copy } from 'src/utils/string-utils';
import CallFunction from 'components/zjcomponents/CallContractFunction.vue';
import { zjApi } from 'src/api/zjApi';
import { accountDataInjectKey } from 'src/types/zj_tpyes/key';
import { ContractRow } from 'src/types/zj_tpyes/Contract';
import AccountFormat from 'components/transaction/AccountFormat.vue';
import { useStore } from 'src/store';

export default defineComponent({
    name:'ContractDetail',
    methods: { copy },
    components: { AccountFormat, CallFunction,  ContractCodemirror: ContractCodemirror,  AccountKeyValueTable },
    setup() {
        const route = useRoute();
        const store = useStore();
        const isLogin = computed(() => !!store.state.account.selfAccountAddress);
        const contract_tab = ref<string>((route.query['contract_tab'] as string) || 'code');
        let account = computed(() => (route.params.account as string) || '');
        const accountData = inject(accountDataInjectKey);
        const contractDetail = ref<ContractRow>(null);


        onMounted(async () => {
            let response = await zjApi.getContractDetail(account.value);
            contractDetail.value = response.value;
        });

        watch(contract_tab,  () => {
            const element = document.getElementById('contract_tab_target');
            window.scrollTo(0, element.offsetHeight + 400);
        });

        return {
            account,
            contract_tab,
            accountData,
            contractDetail,
            isLogin,
        };

    },

});
</script>

<template>
<q-card>
    <q-tabs
        v-model="contract_tab"
        class="text-grey-7 tab-text"
        dense
        active-bg-color="primary"
        indicator-color="primary"
        active-color="white"
        active-class="contract-q-tabs-active"
        align="left"
        no-caps
    >
        <q-tab name="code" label="Overview"/>
        <q-tab name="contract_data" label="Data"/>
    </q-tabs>
</q-card>
<div id="contract_tab_target"></div>
<q-tab-panels v-model="contract_tab" class="q-mt-md col-12">
    <q-tab-panel class="bg-grey-3"  name="code">
        <q-card class="my-card row q-mb-md">
            <q-card bordered class="row col-12 q-pa-xs  d-flex align-center text-h5">
                Contract Overview
            </q-card>
            <q-card-section class="row col-auto">
                <q-list dense>
                    <q-item>
                        <q-item-section>ContractName: {{ contractDetail?.to?.slice(0, 20) || '' }}</q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>Address: {{ contractDetail?.to }}</q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section >
                            <div>
                                Creator:
                                <AccountFormat :account="contractDetail?.from" type="account"/>
                            </div>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>Balance: {{ accountData?.balance }}</q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>Description: {{ contractDetail?.to }}</q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>
        </q-card>
        <div class="row">
            <q-card bordered class="col">
                <q-card bordered class="row col-12 q-pa-xs q-mb-md text-h5">
                    <div class="col" >
                        <div>Solidity Source Code
                            <q-btn
                                flat
                                round
                                color="black"
                                icon="content_copy"
                                size="sm"
                                @click="copy('')"
                            />
                        </div>

                    </div>
                    <div class="col-auto q-pr-sm">
                    </div>
                </q-card>

                <ContractCodemirror />
            </q-card>
            <q-card bordered class="col q-ml-md">
                <q-card bordered class="row col-12 q-pa-xs q-mb-md text-h5">
                    <div class="col" >
                        <div>Binary Code
                            <q-btn
                                flat
                                round
                                color="black"
                                icon="content_copy"
                                size="sm"
                                @click="copy('')"
                            />
                        </div>

                    </div>
                    <div class="col-auto q-pr-sm">
                        <CallFunction v-if="isLogin"/>
                        <div v-else class="text-subtitle1"> Connect to CallFunction  </div>
                    </div>
                </q-card>
                <ContractCodemirror :code="contractDetail?.__kCreateContractBytesCode"/>
            </q-card>
        </div>
    </q-tab-panel>
    <q-tab-panel name="contract_data">
        <AccountKeyValueTable title="Contract Data" dataType='contract'/>
    </q-tab-panel>
</q-tab-panels>
</template>

<style scoped lang="sass">
.d-flex
    display: flex
.justify-center
    justify-content: center
.align-center
    align-items: center
.tab-text
    font-size: 40px !important
.account-card
    width: 550px
    border-radius: .5rem
    margin-top: 1rem
    margin-left: auto
    margin-right: auto
    margin-bottom: 2rem
    box-shadow: none

.tabs
    color: white
.my-card
    border-radius: 10px


</style>
