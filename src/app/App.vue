<script setup lang="ts">
import { ThemeProvider } from '@/app/providers/ThemeProvider';
</script>

<template>
  <div class="app">
    <ThemeProvider>
      <RouterView />
    </ThemeProvider>
  </div>
</template>
