<script setup lang="ts">
import ThemeProvider from '@/theme/ThemeProvider.vue';
</script>

<template>
  <div class="app">
    <ThemeProvider>
      <RouterView />
    </ThemeProvider>
  </div>
</template>
