<template>
  <NuxtLink :to="localePath('/home')" class="mt-2 ml-2" aria-label="Home">
    ← {{ $t("auth.home") }}
  </NuxtLink>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
</script>
