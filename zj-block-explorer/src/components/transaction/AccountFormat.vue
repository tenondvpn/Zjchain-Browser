<script lang="ts">
import { computed, defineComponent } from 'vue';
import { copyToClipboard } from 'quasar';

export default defineComponent({
    name: 'AccountFormat',
    props: {
        account: {
            type: String,
            default: () => '',
        },
        type: {
            type: String,
            required: true,
        },
    },
    methods: {
        copy(value: string) {
            copyToClipboard(value)
                .then((): void => {
                    this.$q.notify({
                        color: 'green-4',
                        textColor: 'white',
                        message: 'Copied to clipboard',
                        timeout: 1000,
                    });
                })
                .catch(() => {
                    this.$q.notify({
                        color: 'red-8',
                        textColor: 'white',
                        message: 'Could not copy',
                        timeout: 1000,
                    });
                });
        } },
    setup(props) {
        const accAccount = computed(() => props.account);
        const accText = computed(() => props.account ? props.account : '');
        const longText: boolean = accText.value.length > 8;
        return {
            textDes: longText ? accText.value.slice(0, 8).concat('...') : accText.value,
            longText,
            accText,
            accType: props.type,
            accAccount,
        };
    },
});
</script>

<template>
<a
    class="hover-dec"
    :href=" '/' + type + '/' + accAccount"
>{{ type === 'transaction' || 'block' ? accAccount.slice(0, 8) : accAccount }}</a>
<q-tooltip v-if="longText">
    {{ accText }}
</q-tooltip>
<q-btn
    v-if="longText"
    flat
    round
    color="black"
    icon="content_copy"
    size="sm"
    @click="copy(accText)"
/>
</template>

<style lang="sass" scoped>
.hover-dec
    text-decoration: none

    &:hover
        text-decoration: underline
</style>
