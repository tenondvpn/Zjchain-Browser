<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { Error, PaginationSettings } from 'src/types';
import { zjApi } from 'src/api/zjApi';
import { AccountKeyValue } from 'src/types/zj_tpyes/AccountKeyValue';
import AccountFormat from 'components/transaction/AccountFormat.vue';
import TypeFormat from 'components/transaction/TypeFormat.vue';
import TextFormat from 'components/transaction/TextFormat.vue';
import JsonViewer from 'vue-json-viewer';
import { CommonFilter } from 'src/types/zj_tpyes/Block';
import { useRoute } from 'vue-router';

const initialStatePagination = {
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 20,
    rowsNumber: 20,
};

export default defineComponent({
    name: 'AccountKeyValueTable',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    components: { JsonViewer, TextFormat, TypeFormat, AccountFormat },
    props: {
        title: {
            type: String,
            required: true,
        },
        dataType: {
            type: String,
            required:false,
            default: '',
        },
    },
    setup(setupProps) {
        const $q = useQuasar();
        const route = useRoute();
        let account = computed(() => (route.params.account as string) || '');
        const rows = ref<AccountKeyValue[]>([]);
        const pagination = ref(initialStatePagination);

        const columns = [
            {
                name: 'from_field',
                align: 'left',
                label: 'From Field',
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
            {
                name: 'shard_id',
                align: 'left',
                label: 'SHARD ID',
                field: 'shard_id',
            },
            {
                name: 'key',
                align: 'left',
                label: 'KEY',
                field: 'key',
            },
            {
                name: 'value',
                align: 'left',
                label: 'VALUE',
                field: 'value',
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
                const filter = {
                    account:account.value,
                    limit: rowsPerPage,
                    page: page,
                } as CommonFilter;

                if (setupProps.dataType==='contract') {
                    filter.account = '';
                    filter.to = account.value;
                }
                const dataResponse = await zjApi.getAccountKeyValues(filter);

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
                throw e;
            }
        }

        onMounted(async () => {
            await onRequest({
                pagination: pagination.value,
            });
        });

        return {
            account,
            columns,
            rows,
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
    class="row col-12 q-mt-xs justify-center text-left trx-table container-max-width"
    flat
    :bordered="false"
    :square="true"
    :title="title"
    table-header-class="text-grey-7"
    :rows="rows"
    :columns="columns"
    :rows-per-page-options="[20,40,80,160]"
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
    <template v-slot:body="props">
        <q-tr :props="props">
            <q-td key="from_field" :props="props">
                <AccountFormat :account="props.row.from_field" type="account"/>
            </q-td>
            <q-td key="to" :props="props">
                <AccountFormat :account="props.row.to" type="account"/>
            </q-td>
            <q-td key="type" :props="props"><TypeFormat :type="props.row.type"/></q-td>
            <q-td key="shard_id" :props="props">{{ props.row.shard_id }}</q-td>
            <q-td key="key" :props="props"> <TextFormat :text="props.row.key"/></q-td>
            <q-td key="value" :props="props">
                <q-expansion-item
                    dense
                    dense-toggle
                    expand-separator
                >
                    <template v-slot:header><TextFormat :text="props.row.value"/></template>

                    <q-scroll-area
                        class="q-scroll-area"
                    >
                        <JsonViewer
                            :value="props.row.value"
                        />
                    </q-scroll-area>
                </q-expansion-item>
            </q-td>
        </q-tr>
    </template>
</q-table>
</template>

<style scoped lang="sass">
.data-table--main-container
    width: 80%


.q-scroll-area
    height: 150px
    max-width: 300px

</style>
