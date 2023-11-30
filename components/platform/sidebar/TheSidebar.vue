<template>
  <div>
    <SidebarDesktop :links="links" />
    <SidebarMobile
      :links="links"
      :sidebar-open="sidebarOpen"
      @toggle-sidebar="$emit('toggleSidebar')"
    />
  </div>
</template>

<script setup lang="ts">
import {
  UsersIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/vue/24/outline";
import SidebarDesktop from "./locals/SidebarDesktop.vue";
import SidebarMobile from "./locals/SidebarMobile.vue";

const links = [
  {
    text: "platform.sidebar.memberships",
    to: "/platform/membership",
    icon: UsersIcon,
  },
  {
    text: "platform.sidebar.reservations",
    to: "/platform/reservation",
    icon: ClipboardDocumentListIcon,
  },
];
interface Props {
  sidebarOpen: boolean;
}

defineProps<Props>();

defineEmits<{
  (e: "toggleSidebar"): void;
}>();
</script>
