// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Home from '../components/Home.vue';
import Register from '../components/Register.vue';
import GuessAccount from "@/components/Guess Account.vue";


const routes = [
    { path: '/', component: Login },
    { path: '/home', component: Home },
    { path: '/register', component: Register },
    { path: '/GuessAccount', component: GuessAccount },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
