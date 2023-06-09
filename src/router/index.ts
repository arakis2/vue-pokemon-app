import { createRouter, createWebHistory } from 'vue-router'
import PokemonListView from '../views/PokemonListView.vue'
import PokemonDetailViewVue from '@/views/PokemonDetailView.vue'
import PageNotFound from '../views/PageNotFound.vue'
import PokemonEditViewVue from '@/views/PokemonEditView.vue'
import PokemonAddViewVue from '@/views/PokemonAddView.vue'
import LoginViewVue from '@/views/LoginView.vue'
import AuthenticationService from '@/services/authentication-service'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PokemonListView,
    },
    {
      path: '/pokemons',
      name: 'pokemons',
      component: PokemonListView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginViewVue
    },
    {
      path: '/pokemons/:id(\\d+)',
      name: 'detail',
      component: PokemonDetailViewVue,
    },
    {
      path: '/pokemons/edit/:id(\\d+)',
      name: 'editPokemon',
      component: PokemonEditViewVue
    },
    {
      path: '/pokemons/add',
      name: 'addPokemon',
      component: PokemonAddViewVue
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'pageNotFound',
      component: PageNotFound
    }
  ]
})

router.beforeEach((to) => {
  if (!AuthenticationService.isAuthenticate && (to.name !== 'login' && to.name !== 'pageNotFound')) {
    return {name: 'login'};
  }
});

export default router
