<template>
  <!-- Bars Icon (visible until XL screen size) -->
  <button
    type="button"
    class="-m-2.5 p-2.5 xl:hidden text-slate-700 dark:text-slate-300"
    @click="$emit('toggleSidebar')"
  >
    <span class="sr-only">Open sidebar</span>
    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
  </button>

  <!-- Separator (visible until XL screen size) -->
  <div
    class="hidden sm:block h-6 w-px bg-gray-200 xl:hidden"
    aria-hidden="true"
  />

  <!-- Theme Color Switch -->
  <div class="hidden sm:block flex items-center">
    <SwitchThemeColor />
  </div>

  <!-- Separator -->
  <div
    class="hidden sm:block h-6 w-px bg-gray-200 xl:hidden"
    aria-hidden="true"
  />

  <!-- Language Switch -->
  <div class="hidden sm:block flex items-center">
    <SwitchLanguage />
  </div>
</template>

<script setup lang="ts">
import { Bars3Icon } from "@heroicons/vue/20/solid";

defineEmits<{
  (e: "toggleSidebar"): void;
}>();
</script>
