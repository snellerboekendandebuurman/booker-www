<template>
  <div class="flex h-screen">
    <div class="flex flex-1 flex-col overflow-auto">
      <NuxtLink
        :to="localePath('/platform/dashboard')"
        class="mt-2 ml-2"
        aria-label="Home"
      >
        ← {{ $t("platform.billing.platform") }}
      </NuxtLink>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { modalMessageService } from "~/services/response/ModalMessageService";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";

definePageMeta({
  layout: "auth",
});

const sessionId = useRoute().query.session_id;
setTimeout(() => 2000);
// If no sessionId -> return error response
if (!sessionId) {
  modalMessageService.addModal({
    id: Math.random(),
    title: "global.messages.setup_intent_failed_title",
    message: "global.messages.setup_intent_failed_message",
    status: EApiResponseStatus.error,
    buttons: [
      {
        id: 1,
        to: "/auth/login",
        themeId: 8,
        label: "Login",
      },
    ],
  });

  setTimeout(() => {
    navigateTo(localePath("/auth/login"));
  }, 5000);
}

const modalMessageId = Math.random();
// If success response -> handle
modalMessageService.addModal({
  id: modalMessageId,
  title: "global.messages.setup_intent_success_title",
  message: "global.messages.setup_intent_success_message",
  status: EApiResponseStatus.success,
  buttons: [
    {
      id: 1,
      to: "/auth/login",
      themeId: 8,
      label: "Login",
    },
  ],
});
setTimeout(() => {
  navigateTo(localePath("/auth/login"));
  modalMessageService.removeModal(modalMessageId);
}, 5000);
const localePath = useLocalePath();
</script>
