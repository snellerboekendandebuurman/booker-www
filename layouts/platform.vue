<template>
  <div>
    <Portal class="z-50">
      <ModalMessage />
      <ToastMessage />
    </Portal>
    <TheSidebar :sidebar-open="sidebarOpen" @toggle-sidebar="toggleSidebar" />
    <TheTopbar :sidebar-open="sidebarOpen" @toggle-sidebar="toggleSidebar" />
    <div class="xl:pl-72">
      <slot class="bg-slate-100 dark:bg-slate-900"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Portal } from "@headlessui/vue";
import TheSidebar from "@/components/platform/sidebar/TheSidebar.vue";
import TheTopbar from "@/components/platform/topbar/TheTopbar.vue";
// This import is here to make sure the proper theme is set
// when reloading one of the Auth pages
import { themeColorService } from "~/services/theme/ThemeColorService";
import ToastMessage from "~/components/response/ToastMessage.vue";
import ModalMessage from "~/components/response/ModalMessage.vue";

themeColorService.getTheme();

const sidebarOpen = ref(false);

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}
</script>
