import { createRouter, createWebHistory } from 'vue-router'
import PokemonListView from '../views/PokemonListView.vue'
import PokemonDetailViewVue from '@/views/PokemonDetailView.vue'
import PageNotFound from '../views/PageNotFound.vue'
import PokemonEditViewVue from '@/views/PokemonEditView.vue'
import PokemonAddViewwVue from '@/views/PokemonAddVieww.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PokemonListView
    },
    {
      path: '/pokemons',
      name: 'pokemons',
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
      component: PokemonEditViewVue
    },
    {
      path: '/pokemons/add',
      name: 'addPokemon',
      component: PokemonAddViewwVue
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'pageNotFound',
      component: PageNotFound
    }
  ]
})

export default router
