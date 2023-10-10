import { createRouter, createWebHistory } from 'vue-router'
import store from '../store';
import Home from '../components/Home.vue';
import Signup from '../components/Signup.vue';
import Signin from '../components/Signin.vue';
import Add from '../components/Add.vue';
import Post from '../components/Post.vue';
import Edit from '../components/Edit.vue';
import notFound from '../components/notFound.vue';
import { nextTick } from 'vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/signin',
    component: Signin
  },
  {
    path: '/add',
    component: Add,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/:creationDate/:urlSlug',
    component: Post
  },
  {
    path: '/edit/:creationDate/:urlSlug',
    component: Edit,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:catchAll(.*)',
    component: notFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.beforeEach((to, from, next)=>{
  const isAuth=to.matched.some((record)=> record.meta.requiresAuth);
  if(isAuth && !store.getters.getToken){
    return next('/signin');
  }
  next();
});

export default router
