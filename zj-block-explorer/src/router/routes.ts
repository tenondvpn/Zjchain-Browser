import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('layouts/MainLayout.vue'),
        children: [{
            path: '',
            component: () => import('pages/Network.vue'),
        }],
    },
    {
        path: '/account/:account',
        name: 'account',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: '',
                component: () => import('pages/zjPages/AccountPage.vue'),
            },
        ],
    },
    {
        path: '/transaction/:transaction',
        name: 'transaction',
        component: () => import('layouts/MainLayout.vue'),
        children: [{
            path: '',
            component: () => import('src/pages/TransactionPage.vue'),
        }],
    },
    {
        path: '/block/:block',
        name: 'block',
        component: () => import('layouts/MainLayout.vue'),
        children: [{
            path: '',
            component: () => import('pages/Block.vue'),
        }],
    },
    {
        path: '/network',
        name: 'network',
        component: () => import('layouts/MainLayout.vue'),
        children: [{
            path: '',
            component: () => import('pages/Network.vue'),
        }],
    },
    {
        path: '/accountTab',
        name: 'accountTab',
        component: () => import('layouts/MainLayout.vue'),
        children: [{
            path: '',
            component: () => import('pages/zjPages/AccountsPage.vue'),
        }],
    },
    {
        path: '/contracts',
        name: 'contractsPage',
        component: () => import('layouts/MainLayout.vue'),
        children: [{
            path: '',
            component: () => import('pages/zjPages/ContractPage.vue'),
        }],
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/Error404.vue'),
    },
];

export default routes;
