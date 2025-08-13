<script setup lang="ts">
import { 
  THEME, LOCAL_STORAGE_THEME_KEY, 
  THEME_CONTEXT_NAME, 
  useTheme, type Theme, 
  type ThemeContext, 
} from '@/theme/useTheme';
import { provide } from 'vue';

const defaultTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme || THEME.LIGHT;

const theme = useTheme(defaultTheme);
provide<ThemeContext>(THEME_CONTEXT_NAME, theme);
</script>

<template>
  <div
    class="app"
    :class="`${theme.theme.value}`"
  >
    <RouterView />
  </div>
</template>
