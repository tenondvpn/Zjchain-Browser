<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { Error, PaginationSettings } from 'src/types';
import { zjApi } from 'src/api/zjApi';
import { Account } from 'src/types/zj_tpyes/Account';

const initialStatePagination = {
    sortBy: 'desc',
    descending: false,
    page: 1,
    rowsPerPage: 20,
    rowsNumber: 20,
};

export default defineComponent({
    name: 'ProposalTable',
    props: {
        title: {
            type: String,
            required: true,
        },
        account: {
            type: String,
            required: true,
        },
        type: {
            type: String as PropType<
                'needsYourSignature' | 'proposalsCreated' | 'allAccounts'
            >,
            required: true,
        },
        blockProducers: {
            type: Array as PropType<string[]>,
        },
    },
    setup(setupProps) {
        const $q = useQuasar();

        const rows = ref<Account[]>([]);
        const pagination = ref(initialStatePagination);
        const isSigned = ref(false);
        const isExecuted = ref(false);
        const blockProducer = ref('');
        const filterDropdown = ref(false);

        const hasSomeFilterActive = computed(
            () => isSigned.value || isExecuted.value || blockProducer.value,
        );
        const columns = [
            {
                name: 'id',
                align: 'left',
                label: 'ACCOUNT',
                field: 'id',
            },
            {
                name: 'shard_id',
                align: 'left',
                label: 'SHARD ID',
                field: 'shard_id',
            },
            {
                name: 'pool_index',
                align: 'left',
                label: 'POOL INDEX',
                field: 'pool_index',
            },
            {
                name: 'balance',
                align: 'left',
                label: 'BALANCE',
                field: 'balance',
            },
        ];

        async function onRequest(props: { pagination: PaginationSettings }) {
            const {
                page,
                rowsPerPage,
                sortBy,
                descending,
            } = props.pagination;
            // let requested = '';
            // requested = blockProducer.value;

            try {
                const dataResponse = await zjApi.getAccounts({
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

        onMounted(async () => {
            await onRequest({
                pagination: pagination.value,
            });
        });

        watch([isSigned, isExecuted, blockProducer], async () => {
            filterDropdown.value = false;
            pagination.value = initialStatePagination;
            await onRequest({
                pagination: pagination.value,
            });
        });

        const optionsBlockProducers = ref<string[]>(setupProps.blockProducers);

        function onFilterBlockProducer(
            inputValue: string,
            update: (callback: () => void) => void,
        ) {
            if (inputValue === '') {
                update(() => {
                    optionsBlockProducers.value = setupProps.blockProducers;
                });
                return;
            }

            update(() => {
                const formattedValue = inputValue.toLowerCase();
                optionsBlockProducers.value = setupProps.blockProducers.filter(
                    item => item.toLowerCase().indexOf(formattedValue) > -1,
                );
            });
        }

        return {
            columns,
            rows,
            pagination,
            isSigned,
            isExecuted,
            blockProducer,
            hasSomeFilterActive,
            optionsBlockProducers,
            filterDropdown,
            onRequest,
            onFilterBlockProducer,
        };
    },
});
</script>

<template>
<q-table
    v-model:pagination="pagination"
    color="primary"
    flat
    :bordered="false"
    :square="true"
    :title="title"
    table-header-class="text-grey-7"
    :rows="rows"
    :columns="columns"
    row-key="proposalName"
    :rows-per-page-options="[20,40,80,160]"
    @request="onRequest"
>
    <template v-slot:top>
        <div class="q-table__control full-width justify-between">
            <div class="q-table__title" v-text="title"></div>
        </div>
    </template>
    <template v-slot:no-data><span class="q-pa-md full-width text-center text-body2">
        No proposals
    </span></template>
    <template v-slot:body="props">
        <q-tr :props="props">
            <q-td key="id" :props="props">
                <router-link
                    class="text-primary cursor-pointer text-no-decoration"
                    :to="'/account/' + props.row.id"
                >{{ props.row.id }}
                </router-link>
            </q-td>
            <q-td key="shard_id" :props="props"><span>{{ props.row.shard_id }}</span></q-td>
            <q-td key="pool_index" :props="props">{{ props.row.pool_index }}</q-td>
            <q-td key="balance" :props="props">
                <q-badge
                    :color="props.row.balance > 0 ? 'green' : 'orange'"
                    :label="props.row.balance"
                />
            </q-td>
        </q-tr>
    </template>
</q-table>
</template>
