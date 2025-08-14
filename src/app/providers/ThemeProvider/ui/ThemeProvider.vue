<script setup lang="ts">
import { ref, provide, watch, readonly } from 'vue'
import { 
  type Theme, 
  type ThemeContext, 
  THEME, 
  LOCAL_STORAGE_THEME_KEY, 
  THEME_CONTEXT_NAME, 
} from '../lib/useThemeContext'

const currentTheme = ref<Theme>((localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || THEME.LIGHT);

const setTheme = (theme: Theme) => {
  currentTheme.value = theme
  localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme)
}

const applyThemeToDOM = () => {
  document.documentElement.setAttribute('data-theme', currentTheme.value)
}
  
watch(currentTheme, () => {
  applyThemeToDOM();
}, { immediate: true })

provide<ThemeContext>(THEME_CONTEXT_NAME, {
  theme: readonly(currentTheme),
  setTheme,
})
</script>

<template>
  <slot />
</template>
