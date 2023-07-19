<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { OptionsObj } from 'src/types';
import { zjApi } from 'src/api/zjApi';

export default defineComponent({
    name: 'HeaderSearch',
    setup() {
        const router = useRouter();
        const inputValue = ref('');
        const options = ref<OptionsObj[]>([]);
        const isLoading = ref(false);

        watch(inputValue, async () => {
            if (inputValue.value === '') {
                options.value = [];
                return;
            }

            isLoading.value = true;
            const queryValue = inputValue.value.toLowerCase();

            await Promise.all([
                searchAccounts(queryValue),
                searchBlocks(queryValue),
                searchTransactions(queryValue),
            ]).then((results) => {
                options.value = ([] as OptionsObj[]).concat.apply([], results);
            });

            isLoading.value = false;
        });

        async function searchBlocks(value: string):Promise<OptionsObj[]> {
            try {
                const results = [] as OptionsObj[];
                const blocks = await zjApi.getBlocks({
                    query: value,
                    limit: 5,
                });

                if (blocks?.data?.dataList?.length > 0) {
                    results.push({
                        label: 'Blocks',
                        to: '',
                        isHeader: true,
                    });

                    blocks?.data?.dataList?.forEach((block) => {
                        results.push({
                            label: block.hash,
                            to: `/block/${block.hash}`,
                            isHeader: false,
                        });
                    });
                }
                return results;
            } catch (error) {
                return [] as OptionsObj[];
            }
        }
        async function searchAccounts(value: string): Promise<OptionsObj[]> {
            try {
                const results = [] as OptionsObj[];
                const accounts = await zjApi.getAccounts({
                    query:value,
                    limit:5,
                });

                if (accounts?.data?.dataList?.length > 0) {
                    results.push({
                        label: 'Accounts',
                        to: '',
                        isHeader: true,
                    });

                    accounts?.data?.dataList?.forEach((account) => {
                        results.push({
                            label: account.id,
                            to: `/account/${account.id}`,
                            isHeader: false,
                        });
                    });
                }
                return results;
            } catch (error) {
                return [] as OptionsObj[];
            }
        }


        async function searchTransactions(value: string): Promise<OptionsObj[]> {
            const results = [] as OptionsObj[];

            if (!value) {
                return results;
            }

            try {
                const transactions = await zjApi.getTransactions({
                    limit:5,
                    query:value,
                });

                if (transactions?.data?.dataList) {
                    results.push({
                        label: 'Transactions',
                        to: '',
                        isHeader: true,
                    });
                    transactions?.data.dataList.forEach((tx) => {
                        results.push({
                            label: tx.tx_hash,
                            to: `/transaction/${tx.tx_hash}`,
                            isHeader: false,
                        });
                    });
                }
                return results;
            } catch (error) {
                return;
            }
        }

        async function handleGoTo(path?: string) {
            if (!inputValue.value) {
                return;
            }

            if (typeof path === 'string') {
                await router.push(path);
                router.go(0);
                return;
            }
        }

        return {
            inputValue,
            options,
            isLoading,
            handleGoTo,
        };
    },
});
</script>

<template>
<q-select
    borderless
    dense
    filled
    use-input
    hide-selected
    fill-input
    hide-bottom-space
    input-style="color:white"
    color="white"
    :loading="isLoading"
    :model-value="inputValue"
    :options="options"
    :option-disable="(item) => item.isHeader"
    class="search-input"
    @input-value="(value) => inputValue = value"
    @keyup.enter="handleGoTo"
>
    <template #prepend>
        <q-icon
            class="rotate-90"
            name="search"
            color="white"
            size="20px"
        />
    </template>
    <template #no-option>
        <q-item>
            <q-item-section class="text-center">
                <q-item-label v-if="isLoading">Searching...</q-item-label>
                <q-item-label v-else>
                    {{ inputValue ? 'Nothing found' : 'Search by accounts, blocks and transactions' }}
                </q-item-label>
            </q-item-section>
        </q-item>
    </template>
    <template #option="scope">
        <q-item-label v-if="scope.opt.isHeader" header>{{ scope.opt.label }}</q-item-label>
        <q-item
            v-else
            v-bind="scope.itemProps"
            exact="exact"
            clickable="clickable"
            @click="handleGoTo(scope.opt.to)"
        >
            <q-item-section>
                <q-item-label>{{ scope.opt.label }}</q-item-label>
            </q-item-section>
        </q-item>
    </template>
</q-select>
</template>

<style lang="sass">
.search-input
    background: rgba(255, 255, 255, 0.15)
    border-radius: 4px

.search-input .q-select__dropdown-icon
    color: white
</style>
