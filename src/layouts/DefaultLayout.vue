<script setup lang="ts">
import { type ThemeContext, THEME_CONTEXT_NAME } from '@/theme/useTheme';
import { inject } from 'vue';


const theme = inject<ThemeContext>(THEME_CONTEXT_NAME); 
</script>

<template>
  <div>
    <div class="gg">
      Шапочка
    </div>

    <hr>

    <div>
      <button @click="theme?.toggleTheme">
        Смена темы
      </button>

      <RouterLink :to="{name: 'shares'}">
        Акции
      </RouterLink>

      <RouterLink :to="{name: 'bonds'}">
        Облигации
      </RouterLink>
    </div>

    <hr>

    <RouterView />
  </div>
</template>
