<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { Dialog, DialogChainObject, useQuasar } from 'quasar';
import { useStore } from 'src/store';
import { isHexadecimal } from 'src/utils/string-utils';
import { process_global_private_key } from 'src/utils/zjUtils';
import BN from 'bn.js';
import { PublicKey } from 'src/store/account/state';
import { getStorePassword } from 'src/api/zjChainApi';


export default defineComponent({
    name: 'WalletModal',
    setup() {
        const $q = useQuasar();
        const store = useStore();
        const error = ref<string>(null);
        const account = computed(() => store.state.account.selfAccountAddress);
        const needReLogin = computed(() => store.state.account.needReLogin);

        const loading = {};
        const walletDialog = ref<DialogChainObject>(null);
        const iconSize = computed(() => {
            if ($q.screen.width > 420) {
                return '3em';
            }
            return '1.5em';
        });

        watch(needReLogin,  () => {
            if (needReLogin.value === true) {
                void onLogin();
                store.commit('account/setNeedReLogin', false);
                console.log('reLogin');
            }
        });

        const onLogin = async () => {
            try {
                let password = store.state.account.selfPrivateKey?.toString(16) || '';
                if (password === '') {
                    password = await loginHandler();
                }
                const {
                    selfAccountAddress,
                    selfPrivateKey,
                    selfPublicKey,
                    keepSecKey,
                }: {
                    selfAccountAddress: string,
                    selfPrivateKey: BN,
                    selfPublicKey: PublicKey,
                    keepSecKey: string
                } = process_global_private_key(password);
                await store.dispatch('account/login', {
                    selfAccountAddress,
                    selfPrivateKey,
                    selfPublicKey,
                    keepSecKey,
                });
            } catch (e) {
                const error = e as string;
                $q.notify({
                    color: 'green-4',
                    textColor: 'white',
                    icon: 'cloud_done',
                    message: error,
                });
                console.error(error);
            }
            walletDialog.value.hide();
        };

        async function loginHandler() {
            let password = await getStorePassword() as string;
            if (password) {
                return password;
            } else {
                await new Promise((resolve) => {
                    Dialog.create({
                        color: 'primary',
                        title: 'Setup your private key',
                        message: 'private key hex code length must 64.',
                        prompt: {
                            model: '',
                            type: 'password',
                            isValid: val => isHexadecimal(val),
                        },
                        cancel: true,
                        persistent: true,
                    })
                        .onOk((data: string) => {
                            password = data;
                        })
                        .onCancel(() => {
                            throw 'Cancelled!';
                        })
                        .onDismiss(() => {
                            resolve(true);
                        });
                });
            }
            return password;
        }



        return {
            error,
            loading,
            account,
            walletDialog,
            onLogin,
            iconSize,
        };
    },
});
</script>
<template>
<q-dialog ref="walletDialog" class="modal-container">
    <div class="modal-header-container">
        <q-icon name="add_circle_outline" color="white" :size="iconSize"/>
        <h3 class="modal-header">Attach an account</h3>
    </div>
    <q-separator/>
    <q-list>
        <q-item class ='items ' >
            <q-item-section class="cursor-pointer" avatar @click="onLogin()">
                <q-icon name="account_circle" size='35px'/>
            </q-item-section>
            <q-item-section class="cursor-pointer " @click="onLogin()">login
            </q-item-section>
        </q-item>
        <q-item v-if="error" :active="!!error" active-class="bg-red-1 text-grey-8">
            <q-item-section>{{ error }}</q-item-section>
        </q-item>
    </q-list>
</q-dialog>
</template>

<style lang="sass">
.fixed-full
    flex-direction: column


.items
    background-color: #3c51a4
    color: white
.modal-container
    background: radial-gradient(50% 67.35% at 50% 67.35%, #8A65D4 0%, rgb(9, 26, 98, 100))

.modal-header
    margin-left: 0.6rem
    color: white
    font-size: 2.25rem
    width: 100%

.modal-header-container
    display: flex
    align-items: center
    box-shadow: unset !important

// on resolutions smaller than 420px h3.modal-header will have smaller text
  // and a smaller .modal-header-container q-icon
@media screen and (max-width: 420px)
    h3.modal-header
        font-size: 1.5rem
    .modal-header-container
        padding: 0 1rem
    .modal-container .q-dialog__inner
        padding: 0 1rem
</style>
