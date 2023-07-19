<script lang="ts">
import { defineComponent, ref, onMounted, computed, watch } from 'vue';
import TransactionCard from 'components/transaction/TransactionCard.vue';
import { useStore } from 'src/store';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    name: 'TransactionPage',
    setup() {
        const store = useStore();
        const route = useRoute();
        const router = useRouter();
        const tab = ref<string>((route.query['tab'] as string) || 'actions');
        onMounted(() => {
            store.commit('transaction/setTransactionId', route.params.transaction);
            void store.dispatch('transaction/updateTransaction');
        });
        watch([tab], () => {
            void router.push({
                path: router.currentRoute.value.path,
                query: {
                    tab: tab.value,
                },
            });
        });
        return {
            tab,
            transaction: route.params.transaction,
            actionCount: computed(() => store.state.transaction.actionCount),
            jsonTransaction: computed(() => store.state.transaction.transaction),
            found: computed(() => store.state.transaction.transactionFound),
        };
    },
    components: {
        TransactionCard,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    },
});
</script>

<template>

<div class="row">
    <div class="col-12 header-support">
        <TransactionCard v-if="found" class="q-pa-lg"/>
        <div v-else class="q-pa-lg">
            <div class="row full-width justify-center">
                <div class="col-xs-12 col-md-8 col-lg-6">
                    <q-card class="info-card" flat>
                        <div class="q-pa-md-md q-pa-sm-sm q-pa-xs-xs q-pa-xl-lg">
                            <q-card-section class="q-pl-md">
                                <div class="text-h4 text-bold">Transaction not found.</div>
                            </q-card-section>
                        </div>
                    </q-card>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<style scoped lang="sass">
.bg-blur
    background: rgba(255, 255, 255, 0.2)
    backdrop-filter: blur(5px)
    border-radius: 5px

.full-vw
    width: 100vw
</style>
