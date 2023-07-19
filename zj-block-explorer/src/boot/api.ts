import { boot } from 'quasar/wrappers';
import { ApiClient } from 'src/types/Api';
import { api } from 'src/api';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $api: ApiClient;
    }
}

export default boot(({ app }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    app.config.globalProperties.$api = api;
});
