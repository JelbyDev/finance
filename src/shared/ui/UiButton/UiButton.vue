<script setup lang="ts">
const props =   defineProps<{
  text: string;
  disable?: boolean;
}>()
</script>

<template>
  <button
    class="ui-button"
    :disabled="props.disable"
  >
    {{ props.text }}
  </button>
</template>

<style lang="scss">
.ui-button {
  cursor: pointer;
  color: var(--primary-color);
  padding: 6px 15px;

  &:hover {
    opacity: 0.8;
  }
}
</style>
