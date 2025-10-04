<script setup lang="ts">
import { ROUTE_NAMES } from '@/shared/config/routeConfig';
import { useRouter } from 'vue-router';

const router = useRouter();

router.replace({ name: ROUTE_NAMES.SHARES })
</script>

<template>
  <div>
    Главная
  </div>
</template>
