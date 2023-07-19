<script lang="ts">
import { defineComponent, computed, ComputedRef } from 'vue';
import { useStore } from 'src/store';

export default defineComponent({
    name: 'MapData',
    setup() {
        const store = useStore();

        const AllZjc: ComputedRef<string> = computed((): string => store.state.chain.all_zjc?.toString() || '0');
        const AllAddress: ComputedRef<string> = computed((): string => store.state.chain.all_address?.toString() || '0');
        const AllContracts: ComputedRef<string> = computed((): string => store.state.chain.all_contracts?.toString() || '0');
        const AllTransactions: ComputedRef<string> = computed((): string => store.state.chain.all_transactions?.toString() || '0');
        const Qps: ComputedRef<string> = computed((): string => store.state.chain.qps?.toString() || '0');
        const AllNodes: ComputedRef<string> = computed((): string => store.state.chain.all_nodes?.toString() || '0');
        const BlockNum: ComputedRef<string> = computed((): string => store.state.chain.block_num?.toString() || '0');



        return {
            AllZjc,
            AllAddress,
            AllContracts,
            AllTransactions,
            Qps,
            AllNodes,
            BlockNum,
        };
    },
});
</script>

<template>
<div class="row  full-width q-gutter-md q-pt-xl q-pb-lg text-center justify-center actor-font" :class="{'text-grey-3' : false}">
    <div class="col">
        <q-card class="q-pt-md my-card">
            <div class="col-12 text-h6 text-weight-thin text-uppercase">TOTAL COIN</div>
            <div class="col-12 text-subtitle1 text-bold">{{ AllZjc }}</div>
        </q-card>
    </div>
    <div class="col " >
        <q-card class="q-pt-md my-card">
            <div class="col-12 text-h6 text-weight-thin text-uppercase">AVERAGE QPS</div>
            <div class="col-12 text-subtitle1 text-bold">{{ Qps }}</div>
        </q-card>
    </div>
    <div class="col">
        <q-card class="q-pt-md my-card">
            <div class="col-12 text-h6 text-weight-thin text-uppercase">NODES</div>
            <div class="col-12 text-subtitle1 text-bold">{{ AllNodes }}</div>
        </q-card>
    </div>

</div>
<div class="row  full-width q-gutter-md q-pb-lg text-center justify-center actor-font" >
    <div class="col">
        <q-card class="q-pt-md my-card">
            <div class="col-12 text-h6 text-weight-thin text-uppercase">ADDRESS</div>
            <div class="col-12 text-subtitle1 text-bold">{{ AllAddress }}</div>
        </q-card>
    </div>
    <div class="col">
        <q-card class="q-pt-md my-card">
            <div class="col-12 text-h6 text-weight-thin text-uppercase">BLOCKS</div>
            <div class="col-12 text-subtitle1 text-bold">{{ BlockNum }}</div>
        </q-card>
    </div>
    <div class="col">
        <q-card class="q-pt-md my-card">
            <div class="col-12 text-h6 text-weight-thin text-uppercase">TRANSACTIONS</div>
            <div class="col-12 text-subtitle1 text-bold">{{ AllTransactions }}</div>
        </q-card>
    </div>

    <div class="col">
        <q-card class="q-pt-md my-card">
            <div class="col-12 text-h6 text-weight-thin text-uppercase">CONTRACTS</div>
            <div class="col-12 text-subtitle1 text-bold">{{ AllContracts }}</div>
        </q-card>
    </div>
</div>
</template>

<style scoped lang="sass">
.container
    margin-top: 9rem

hr
    content: ""
    display: block
    width: 50%
    border-size: 0.5rem
    border: 0px
    border-top: 2px solid var(--q-primary)
    margin-left: 1rem
    margin-right: 1rem

.hr-vertical
    content: ""
    display: block
    height: 100%
    border-size: 0.5rem
    border: 0px
    border-right: 2px solid var(--q-primary)
    margin-left: 1rem
    margin-right: 1rem
    margin-top: -0.1rem
.my-card
    border-radius: 12px

@media screen and (max-width: 420px)
    .actor-font
        .text-bold
            font-size: 18px

        .text-weight-thin
            font-size: 10px
</style>
