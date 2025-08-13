<script setup lang="ts">
import { useThemeContext } from '@/theme/useThemeContext'

const themeContext = useThemeContext()
</script>

<template>
  <div>
    <div class="gg">
      Шапочка
    </div>

    <hr>

    <div>
      <button
        @click="
          themeContext?.theme.value === 'light' 
            ? themeContext?.setTheme('dark') 
            : themeContext?.setTheme('light')
        "
      >
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
