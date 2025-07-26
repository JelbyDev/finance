<script setup lang="ts">
  import { ref } from 'vue';
  import { RouterView } from 'vue-router';

  const ff = ref('1');
</script>

<template>
  <div>Заглушка</div>

  <div v-if="true" class="123" :style="`height: ${ff}`" :class="ff" v-text="ff" />
  <RouterView />
</template>
