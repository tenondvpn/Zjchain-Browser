<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import WalletModal from 'src/components/WalletModal.vue';
import { useStore } from 'src/store';

export default defineComponent({
    name: 'LoginHandlerDropdown',
    components: { WalletModal },
    setup() {
        const store = useStore();
        const account = computed(() => store.state.account.selfAccountAddress);
        const showModal = ref(false);

        const onLogout = (): void => {
            clearAccount();
        };

        const clearAccount = (): void => {
            void store.dispatch('account/logout');
        };
        return {
            account,
            showModal,
            disconnectLabel: 'Disconnect',
            onLogout,
        };
    },
});
</script>
<template>

<q-btn-dropdown
    class="connect-button"
    color="primary"
    :label="account.toString().slice(0,8).concat('...')"
    :content-style="{ backgroundColor: '#172c6c' }"
>
    <q-card class="buttons-container">
        <q-card-section>
            <div class="row ">
                <div class="col-12 " ><a class="text-white hover-dec"  :href=" '/account/' + account">{{ account.toString().slice(0,20).concat('...')}}</a>
                </div>
            </div>
        </q-card-section>
        <q-separator dark/>
        <q-card-section>
            <div class="q-px-sm q-pb-sm">
                <q-btn
                    class="full-width"
                    color="primary"
                    label="Disconect"
                    @click="onLogout"
                />
            </div>
        </q-card-section>
    </q-card>
</q-btn-dropdown>
<WalletModal v-model="showModal"/>

</template>
<style lang="sass" scoped>
.q-menu
    background-color: blue
    min-width: unset

.q-list
    width: 12rem

.account-button
    width: 110px
    margin: 15px

.connect-button
    width: fit-content
    height: 40px
    text-transform: lowercase

.buttons-container
    width: 220px
    max-width: 80vw
    background: var(--q-color-dropdown-card)
</style>
