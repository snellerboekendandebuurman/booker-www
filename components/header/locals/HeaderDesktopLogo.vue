<template>
  <NuxtLink :to="localePath('/home')" aria-label="Home">
    <BaseLogoTextWhite class="hidden dark:block w-auto h-6 md:h-16" />
    <BaseLogoTextBlack class="block dark:hidden w-auto h-6 md:h-16" />
  </NuxtLink>
</template>

<script setup lang="ts">
import BaseLogoTextWhite from "../../base/BaseLogoTextWhite.vue";
import BaseLogoTextBlack from "../../base/BaseLogoTextBlack.vue";

const localePath = useLocalePath();
</script>
