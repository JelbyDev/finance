<script setup lang="ts">
import { ROUTE_NAMES } from '@/shared/config/routeConfig';
import ThemeSwitcher from '@/features/ThemeSwitcher';
import UiLink from '@/shared/ui/UiLink';

const links = [
  { path: { name: ROUTE_NAMES.HOME }, name: 'Главная' },
  { path: { name: ROUTE_NAMES.SHARES }, name: 'Акции' },
  { path: { name: ROUTE_NAMES.BONDS }, name: 'Облигации' },
];
</script>

<template>
  <div class="layout-header">
    <ThemeSwitcher />

    <div class="layout-header__menu">
      <UiLink
        v-for="link in links"
        :key="link.name"
        :to="link.path"
        :text="link.name"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout-header {
  width: 100%;
  height: var(--layout-header-height);
  background: var(--inverted-bg-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  &__menu {
    display: flex;
    align-items: center;
    gap: 12px;
  }
}
</style>
