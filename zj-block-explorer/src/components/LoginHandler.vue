<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import LoginHandlerDropdown from 'src/components/LoginHandlerDropdown.vue';
import WalletModal from 'src/components/WalletModal.vue';
import { useStore } from 'src/store';

export default defineComponent({
    name: 'LoginHandler',
    components: {
        LoginHandlerDropdown,
        WalletModal,
    },
    setup() {
        const store = useStore();
        const showDropdown = ref(false);
        const showModal = ref(false);
        const account = computed(() => store.state.account.selfAccountAddress);

        onMounted(() => {
            const storedAccount = localStorage.getItem('selfAccountAddress');
            if (storedAccount) {
                void store.commit('account/setSelfAccountAddress', storedAccount);
            }
        });

        return {
            showDropdown,
            showModal,
            account,
        };
    },
});
</script>

<template>
<div class="col-xs-5 col-sm-3 col-md-2 col-lg-2">
    <div class="q-px-xs-xs q-px-sm-xs q-px-md-md q-px-lg-md">
        <LoginHandlerDropdown v-if="account"/>
        <q-btn
            v-else
            class="button-primary btn-login"
            label="Connect"
            @click="showModal = true"
        />
        <WalletModal v-model="showModal"/>
    </div>
</div>
</template>

<style scoped lang="sass">
.btn-login
    width: 60%
    min-width: 120px
    max-width: 140px
    height: 40px
</style>
