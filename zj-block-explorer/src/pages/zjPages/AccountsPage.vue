<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { api } from 'src/api';
import { useStore } from 'src/store';
import AccountsTab from 'components/zjcomponents/AccountsTab.vue';

export default defineComponent({
    name: 'AccountsPage',
    components: {
        AccountsTab,
    },
    setup() {
        const store = useStore();
        const blockProducers = ref<string[]>([]);
        const account = computed(() => store.state.account.accountName);
        const isAuthenticated = computed(() => store.state.account.isAuthenticated);

        onMounted(async () => {
            const producers = await api.getProducers();
            const producersAccount = [] as string[];

            for (let index = 0; index < producers.rows.length; index++) {
                const item = producers.rows[index];
                if (item.is_active === 1) {
                    producersAccount.push(item.owner);
                }
            }

            blockProducers.value = producersAccount;
        });

        return {
            account,
            isAuthenticated,
            blockProducers,
        };
    },
});
</script>

<template>
<q-page padding class="trx-table container-max-width">
    <q-tab-panel class="q-pa-none" name="allAccounts">
        <div class="q-py-lg">
            <AccountsTab
                title="All Accounts"
                type="allAccounts"
                :account="account"
                :blockProducers="blockProducers"
            />
        </div>
    </q-tab-panel>
</q-page>
</template>
