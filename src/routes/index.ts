import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: { name: 'Home' }
    },
    {
        path: '/home/:index?',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFound.vue')
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes
});