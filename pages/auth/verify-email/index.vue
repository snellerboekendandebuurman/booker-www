<template>
  <div class="flex h-screen">
    <div class="flex flex-1 flex-col overflow-auto">
      <NuxtLink :to="localePath('/home')" class="mt-2 ml-2" aria-label="Home">
        ← {{ $t("auth.home") }}
      </NuxtLink>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img
        class="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1573294184805-e3044b161ace?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { userService } from "~/services/user/UserService";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { modalMessageService } from "~/services/response/ModalMessageService";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";

definePageMeta({
  layout: "auth",
});

const { localeProperties } = useI18n();

modalMessageService.addModal({
  id: Math.random(),
  title: "register.verify_email",
  inProgress: true,
  message: "",
  status: EApiResponseStatus.info,
  buttons: [],
});

onBeforeMount(async () => {
  // Get token from URL
  const token = useRoute().query.token;
  // If no token -> return error response
  if (!token) {
    modalMessageService.removeModal(modalMessageService.displayModalMessage.id);
    modalMessageService.addModal({
      id: Math.random(),
      title: "global.messages.no_token_title",
      message: "global.messages.no_token_message",
      status: EApiResponseStatus.error,
      buttons: [
        {
          id: 1,
          to: "/auth/register",
          themeId: 8,
          label: "auth.register.register",
        },
        {
          id: 2,
          to: "/home",
          themeId: 5,
          label: "auth.home",
        },
      ],
    });
    return;
  }
  // Validate token on the Server
  const response = await userService.userVerifyEmail({
    locale: localeProperties.value.iso!,
    body: {
      token: token.toString(),
    },
  });
  // Remove loading modal
  modalMessageService.removeModal(modalMessageService.displayModalMessage.id);
  // Parse response
  const message = apiResponseHandlerService.handleResponse(response);
  // If not success response -> handle
  if (!message.isSuccess) {
    modalMessageService.addModal({
      id: Math.random(),
      title: message.title,
      message: message.message,
      status: message.status,
      buttons: [
        {
          id: 1,
          to: "/auth/register",
          themeId: 8,
          label: "auth.register.register",
        },
        {
          id: 2,
          to: "/auth/request-verify-email",
          themeId: 5,
          label: "auth.request_verify_email.new_verification_email",
        },
      ],
    });
    return;
  }
  // If success response -> handle
  modalMessageService.addModal({
    id: Math.random(),
    title: message.title,
    message: message.message,
    status: message.status,
    buttons: [
      {
        id: 1,
        to: "/auth/login",
        themeId: 8,
        label: "auth.login.login",
      },
    ],
  });
});

const localePath = useLocalePath();
</script>
