import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../components/Main.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/ausen',
  },
  { path: '/:slug', component: Main },
  { path: '/notFound(.*)', redirect: '/' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
