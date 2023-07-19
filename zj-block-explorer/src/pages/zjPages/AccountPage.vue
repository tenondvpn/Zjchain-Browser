<script lang="ts">
import { computed, defineComponent, onMounted, provide, ref, watch } from 'vue';

import { useRoute, useRouter } from 'vue-router';
import { zjApi } from 'src/api/zjApi';
import { Account } from 'src/types/zj_tpyes/Account';
import AccountCard from 'components/zjcomponents/AccountCard.vue';
import TransactionsTable from 'components/zjcomponents/TransactionsTable.vue';
import AccountKeyValueTable from 'components/zjcomponents/AccountKeyValueTable.vue';
import ContractDetail from 'components/zjcomponents/ContractDetail.vue';
import { accountDataInjectKey } from 'src/types/zj_tpyes/key';

export default defineComponent({
    name: 'AccountPage',
    components: {
        ContractDetail,
        AccountKeyValueTable,
        AccountCard,
        TransactionsTable,
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const tab = ref<string>((route.query['tab'] as string) || 'transactions');
        let account = computed(() => (route.params.account as string) || '');
        const found = ref(false);
        const accountData = ref<Account>(null);
        provide(accountDataInjectKey, accountData);

        async function updateAcctData() {
            accountData.value = await zjApi.getAccount(route.params.account as string);
            found.value = accountData.value ? true : false;
        }

        onMounted(async () => {
            // api get block and set block
            await updateAcctData();
        });
        watch(account, async () => {
            await updateAcctData();
        });
        watch([tab], () => {
            const element = document.getElementById('target');
            window.scrollTo(0, element.offsetTop);
            void router.push({
                path: router.currentRoute.value.path,
                query: {
                    tab: tab.value,
                },
            });
        });

        return {
            tab,
            account,
            found,
            accountData,
        };
    },
});
</script>

<template>
<div class="row col-12">
    <span id="target"></span>
    <div class="col-12 header-support">
        <AccountCard v-if="found" class="q-pa-lg" :accountData="accountData"/>
        <div v-else class="q-pa-lg">
            <div class="row full-width justify-center">
                <div class="col-xs-12 col-md-8 col-lg-6">
                    <q-card class="info-card" flat>
                        <div class="q-pa-md-md q-pa-sm-sm q-pa-xs-xs q-pa-xl-lg">
                            <q-card-section class="q-pl-md">
                                <div class="text-h4 text-bold">Account not found.</div>
                            </q-card-section>
                        </div>
                    </q-card>
                </div>
            </div>
        </div>
        <div>
            <q-tabs
                v-model="tab"
                class="text-grey text-grey-5 tab-text"
                dense
                indicator-color="grey-3"
                active-color="grey-3"
                align="center"
                no-caps
            >
                <q-tab name="transactions" label="Transactions"/>
                <q-tab v-if="accountData?.contract_data_count === 0" name="account-data" label="Data"/>
                <q-tab v-if="accountData?.contract_data_count > 0" name="contract-detail" label="Contract Detail"/>
            </q-tabs>
        </div>
    </div>
    <q-tab-panels v-model="tab" class="bg-grey-3 col-12">
        <q-tab-panel name="transactions">
            <TransactionsTable :account="account" :showTransferLabel="true" :show-pagination-extras="true"/>
        </q-tab-panel>
        <q-tab-panel name="account-data">
            <AccountKeyValueTable title="Account Data" />
        </q-tab-panel>
        <q-tab-panel  name="contract-detail">
            <ContractDetail/>
        </q-tab-panel>
    </q-tab-panels>
</div>
</template>

<style lang="sass">
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
</style>
