<script setup lang="ts">
import { useThemeContext } from '@/shared/lib/composables/useThemeContext';
import UiButton from '@/shared/ui/UiButton';

const themeContext = useThemeContext();
</script>

<template>
  <UiButton
    text="Смена темы"
    @click="
      themeContext?.theme.value === 'light' 
        ? themeContext?.setTheme('dark') 
        : themeContext?.setTheme('light')
    "
  />
</template>
