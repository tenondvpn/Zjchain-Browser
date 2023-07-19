<script  lang="ts">
import { computed, defineComponent } from 'vue';
import ContractsTable from 'components/zjcomponents/ContractsTable.vue';
import { useStore } from 'src/store';
import NewContract from 'components/zjcomponents/NewContract.vue';

export default defineComponent({
    name: 'ContractPage',
    components: { NewContract, ContractsTable },
    setup() {
        const store = useStore();
        const vNewContract =  computed(() => !!store.state.account.selfAccountAddress);
        return {
            vNewContract,
        };
    },
});
</script>

<template>
<div class="vd-table q-pa-md ">
    <div class="vd-table q-pa-md ">
        <div class="row col-12  q-pa-md  text-left trx-table container-max-width">
            <q-card-section class="col-12 q-pa-md">
                <div class="row q-col-gutter-sm justify-between">
                    <div class="col-auto text-h4 text-bold">Contracts</div>
                    <div v-if="vNewContract" ><NewContract/></div>
                </div>
            </q-card-section>
            <q-separator/>
            <q-card-section>
                <ContractsTable/>
            </q-card-section>
        </div>
    </div>
</div>
</template>

<style scoped lang="sass">
.vd-table
    &__list
        width: 100%

        &-row
            overflow-x: auto

        &-col
            min-width: 1000px
</style>
