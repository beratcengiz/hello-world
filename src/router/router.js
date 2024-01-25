/* eslint-disable */
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorldVue from '@/components/HelloWorld.vue';
import HelloDeneme from '@/components/HelloDeneme.vue'
import LoginPage from '@/components/LoginPage.vue';
import AdminPage from '@/components/AdminPage.vue'
import MealOfDay from '@/components/MealOfDayPage.vue'

const routes = [
    {
        path: '/',
        name: 'home', // Ana sayfa rotası için benzersiz isim
        component: HelloWorldVue,
    },
    {
        path: '/admin',
        name: 'adminPage', // '/das' rotası için benzersiz isim
        component: AdminPage,
    },
    {
        path: '/login',
        name: 'login', // '/das' rotası için benzersiz isim
        component: HelloDeneme,
    },
    {
        path: '/mealoftheday',
        name: 'mealofday', // '/das' rotası için benzersiz isim
        component: MealOfDay,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
