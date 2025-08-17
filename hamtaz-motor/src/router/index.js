import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '../Layouts/AuthLayout.vue'
import MainLayout from '../Layouts/MainLayout.vue'
import { useAuthStore } from '../stores/auth.js'

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('../view/LoginView.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('../view/RegisterView.vue')
      }
    ]
  },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'ObjectList',
        component: () => import('../view/ListItems.vue')
      },
      {
        path: 'create',
        name: 'CreateObject',
        component: () => import('../view/CreateItemView.vue')
      },
      {
        path: 'item/:id', 
        name: 'SingleItem',
        component: () => import('../view/SingleItemView.vue')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('../view/404Page.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/auth/login')
  } else {
    next()
  }
})

export default router