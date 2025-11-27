<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Remove loader if exists (equivalent to Flutter's loader removal)
  const loader = document.querySelector('.loading')
  if (loader) {
    loader.remove()
  }
})
</script>

<template>
  <div id="app" class="fade-in">
    <router-view />
  </div>
</template>

<style lang="scss">
// Global app styles are in main.scss
#app {
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
</style>
