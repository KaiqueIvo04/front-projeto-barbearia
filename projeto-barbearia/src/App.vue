<!-- script -->
<script setup>
import { RouterView, RouterLink} from 'vue-router';
</script>

<!-- HTML -->
<template>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/register">Register</RouterLink>
  <RouterView />
</template>