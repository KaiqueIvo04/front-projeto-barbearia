<!-- HTML -->
<template>
  <RouterView />
</template>

<!-- script -->
<script setup>
import { RouterView, RouterLink } from 'vue-router';
</script>


<style lang="scss">
@import "@css/styles.scss";

body {
  background-color: map-get($background-colors, escuro);
}
</style>