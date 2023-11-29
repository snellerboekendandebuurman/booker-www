<template>
  <div>
    <TheHeader />
    <slot></slot>
    <ModalMessage />
    <ToastMessage />
  </div>
</template>

<script setup lang="ts">
import TheHeader from "@/components/header/TheHeader.vue";
import ToastMessage from "~/components/response/ToastMessage.vue";
import ModalMessage from "~/components/response/ModalMessage.vue";
</script>
