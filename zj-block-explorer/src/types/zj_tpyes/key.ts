import { InjectionKey, Ref } from 'vue/dist/vue';
import { Account } from 'src/types/zj_tpyes/Account';

export const accountDataInjectKey = Symbol() as InjectionKey<Ref<Account>>;
