<script setup lang="ts">
import { computed } from 'vue';
import { type RouteLocationRaw, RouterLink } from 'vue-router';

const props = withDefaults(
  defineProps<{
    text: string;
    to?: RouteLocationRaw | string;
    noindex?: boolean;
  }>(),
  {
    to: undefined,
  },
);

const isExternalLink = computed(() => {
  if (typeof props.to === 'string') {
    const externalStarts = ['http:', 'https:', 'mailto:', 'tel:'];

    for (const externalStart of externalStarts) {
      if (String(props.to).startsWith(externalStart)) {
        return true;
      }
    }
  }

  return false;
});

const tag = computed(() => {
  if (!props.to) {
    return 'span';
  }

  if (isExternalLink.value) {
    return 'a';
  }

  return RouterLink;
});

const routeBind = computed(() => {
  if (tag.value === 'a') {
    return {
      href: props.to,
      target: '_blank',
    };
  }

  return {
    to: props.to,
  };
});
</script>

<template>
  <component
    :is="tag"
    class="ui-link"
    v-bind="routeBind"
    :noindex="props.noindex"
  >
    {{ props.text }}
  </component>
</template>

<style lang="scss">
.ui-link {
  cursor: pointer;
  color: var(--primary-color);

  &:hover {
    opacity: 0.8;
  }
}
</style>
