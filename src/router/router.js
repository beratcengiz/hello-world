import { createRouter, createWebHistory } from 'vue-router';
import HelloWorldVue from '@/components/HelloWorld.vue';
import HelloDenemeVue from '@/components/HelloDeneme.vue';

const routes = [
    {
        path: '/',
        name: 'home', // Ana sayfa rotası için benzersiz isim
        component: HelloWorldVue,
    },
    {
        path: '/das',
        name: 'deneme', // '/das' rotası için benzersiz isim
        component: HelloDenemeVue,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
