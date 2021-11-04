import Vue from 'vue'
import VueRouter from 'vue-router'
import Editoras from '../views/Editoras.vue'
import Usuarios from '../views/Usuarios.vue'
import Livros from '../views/Livros.vue'
import Alugueis from '../views/Alugueis.vue'
import Inicio from '../views/Inicio.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: Inicio
  },
  {
    path: '/editoras',
    name: 'Editoras',
    component: Editoras
  },
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: Usuarios
  },
  {
    path: '/livros',
    name: 'Livros',
    component: Livros
  },
  {
    path: '/alugueis',
    name: 'Alugueis',
    component: Alugueis
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
