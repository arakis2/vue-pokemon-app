<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <div className="nav-wrapper teal">
        <div className="center brand-logo">
          <RouterLink to="/">Pokédex</RouterLink>
        </div>         
      </div>
    </nav>    
  </header>

  <RouterView />
</template>

