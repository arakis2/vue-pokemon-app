import { createRouter, createWebHistory } from 'vue-router'
import PokemonListView from '../views/PokemonListView.vue'
import PokemonDetailViewVue from '@/views/PokemonDetailView.vue'
import PageNotFound from '../views/PageNotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PokemonListView
    },
    {
      path: '/pokemons/:id(\\d+)',
      name: 'detail',
      component: PokemonDetailViewVue,
    },
    {
      path: '/pokemons/edit/:id(\\d+)',
      name: 'editPokemon',
      component: PokemonListView
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'pageNotFound',
      component: PageNotFound
    }
  ]
})

export default router
