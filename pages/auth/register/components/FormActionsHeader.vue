<template>
  <div>
    <NuxtLink :to="localePath('/home')" aria-label="Home">
      <BaseLogoTextWhite class="hidden dark:block w-auto h-6 md:h-10" />
      <BaseLogoTextBlue class="block dark:hidden w-auto h-6 md:h-10" />
    </NuxtLink>
    <h2 class="mt-4 text-3xl font-bold tracking-tight">
      {{ $t("auth.register.create_new_account") }}
    </h2>
    <p class="mt-2 text-sm leading-6 text-gray-500">
      {{ $t("auth.register.existing_user") }}
      {{ " " }}
      <NuxtLink :to="localePath('/auth/login')">
        <BaseButton
          :button-theme="themeButtonService.getThemeButtonById(1)"
          class="font-bold"
        >
          {{ $t("auth.register.login_here") }} <span aria-hidden="true">→</span>
        </BaseButton>
      </NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
import { themeButtonService } from "~/services/theme/ThemeButtonService";

const localePath = useLocalePath();
</script>
