<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { Error, PaginationSettings } from 'src/types';
import { zjApi } from 'src/api/zjApi';
import { AccountKeyValue } from 'src/types/zj_tpyes/AccountKeyValue';
import AccountFormat from 'components/transaction/AccountFormat.vue';
import TypeFormat from 'components/transaction/TypeFormat.vue';
import { useRouter } from 'vue-router';

const initialStatePagination = {
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 20,
    rowsNumber: 20,
};

export default defineComponent({
    name: 'ContractsTable',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    components: { TypeFormat, AccountFormat },
    props: {
        title: {
            type: String,
            required: false,
            default:'',
        },
        account: {
            type: String,
            required: false,
            default:'',
        },
    },
    setup() {
        const $q = useQuasar();

        const router = useRouter();

        const rows = ref<AccountKeyValue[]>([]);
        const pagination = ref(initialStatePagination);

        const columns = [
            {
                name: 'from_field',
                align: 'left',
                label: 'From',
                field: 'from_field',
            },
            {
                name: 'to',
                align: 'left',
                label: 'TO',
                field: 'to',
            },
            {
                name: 'type',
                align: 'left',
                label: 'TYPE',
                field: 'type',
            },
        ];

        async function onRequest(props: { pagination: PaginationSettings }) {
            const {
                page,
                rowsPerPage,
                sortBy,
                descending,
            } = props.pagination;
            try {
                const dataResponse = await zjApi.getContracts({
                    limit: rowsPerPage,
                    page: page,
                });

                pagination.value = {
                    rowsNumber: dataResponse.data.total,
                    page: page,
                    rowsPerPage: rowsPerPage,
                    sortBy: sortBy,
                    descending: descending,
                };

                rows.value = dataResponse.data.dataList;
            } catch (e) {
                const error = JSON.parse(JSON.stringify(e)) as Error;
                $q.notify({
                    color: 'negative',
                    message: error?.cause?.json?.error?.what || 'Unable load proposals',
                    actions: [
                        {
                            label: 'Dismiss',
                            color: 'white',
                        },
                    ],
                });
            }
        }

        function jump2AccountContract(accountId : string) {
            void router.push({
                path: '/account/' + accountId,
                query: {
                    tab: 'contract-detail',
                },
            });
            console.log(router.currentRoute.value);
        }

        onMounted(async () => {
            await onRequest({
                pagination: pagination.value,
            });
        });

        return {
            jump2AccountContract,
            columns,
            rows,
            cardContainerClass: computed(() => $q.screen.gt.xs
                ? 'grid-masonry grid-masonry--' + ($q.screen.gt.sm ? '3' : '2')
                : null),
            rowsPerPageOptions: computed(() => $q.screen.gt.xs
                ? $q.screen.gt.sm ? [3, 6, 9] : [3, 6]
                : [3]),
            pagination,
            onRequest,
        };
    },
});
</script>

<template>


<q-table
    v-model:pagination="pagination"
    color="primary"
    :card-container-class="cardContainerClass"
    grid
    card-class=""
    :bordered="false"
    :square="true"
    :title="title"
    table-header-class="text-grey-7"
    :rows="rows"
    :columns="columns"
    :rows-per-page-options="rowsPerPageOptions"
    @request="onRequest"
>
    <template v-slot:top>
        <div class="q-table__control full-width justify-between">
            <div class="q-table__title" v-text="title"></div>
        </div>
    </template>
    <template v-slot:no-data>
        <span class="q-pa-md full-width text-center text-body2"> No Data </span>
    </template>
    <template v-slot:item="props">
        <div class=" q-pa-md col-xs-12 col-sm-6 col-md-4 ">
            <q-item clickable class="q-card clickable  producer-card" @click="jump2AccountContract(props.row.to)">

                <q-card-section class="q-pa-sm">
                    <q-card-section horizontal class="q-mt-sm-sm">
                        <q-card-section key="from_field" class="col  justify-center ">
                            <AccountFormat :account="props.row.from_field" type="account" not-tip/>
                        </q-card-section>
                        <q-icon size="30px" class="self-center" name="mdi-arrow-right-thin-circle-outline"/>
                        <q-card-section key="to" class="col justify-center q-pt-md">
                            <AccountFormat :account="props.row.to" type="account" not-tip/>
                        </q-card-section>
                    </q-card-section>
                    <TypeFormat class="self-left" :type="props.row.type"/>
                </q-card-section>
            </q-item>
        </div>
    </template>
</q-table>

</template>

<style scoped lang="sass">
.data-table--main-container
    width: 80%

.q-card-table
    height: 30px
.q-scroll-area
    height: 150px
    max-width: 300px
.vd-table
    &__list
        width: 100%

        &-row
            overflow-x: auto

        &-col
            min-width: 1000px

.producer-card
    background: var(--q-color-producer-card-background)

.select-box
    background: var(--q-color-select-box-background)

.hover-dec
    text-decoration: none

    &:hover
        text-decoration: underline
        color: black
.producer-card
    background: #cdccec
    height: 100px
.grid-masonry
    flex-direction: column
    height: 700px

    &--2
        > div
            &:nth-child(2n + 1)
                order: 1
            &:nth-child(2n)
                order: 2

        &:before
            content: ''
            flex: 1 0 100% !important
            width: 0 !important
            order: 1
    &--3
        > div
            &:nth-child(3n + 1)
                order: 1
            &:nth-child(3n + 2)
                order: 2
            &:nth-child(3n)
                order: 3

        &:before,
        &:after
            content: ''
            flex: 1 0 100% !important
            width: 0 !important
            order: 2

</style>
