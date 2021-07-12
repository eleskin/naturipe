import {createRouter, createWebHistory} from 'vue-router';
import Home from '/src/views/Home.vue';
import Admin from '/src/views/Admin.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/admin/emails',
    name: 'AdminEmails',
    component: Admin,
  },
  {
    path: '/admin/files',
    name: 'AdminFiles',
    component: Admin,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
