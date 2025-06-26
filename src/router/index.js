import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import MainDashboard from '../components/MainDashboard.vue';

const routes = [
  { path: '/', component: LoginPage },
  { path: '/dashboard', component: MainDashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
