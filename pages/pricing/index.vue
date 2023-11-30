<template>
  <PricingInfo>
    <NuxtLink :to="localePath('/auth/register')">
      <BaseButton :button-theme="themeButtonService.getThemeButtonById(8)">
        <span>{{ $t("global.get_started") }}</span>
      </BaseButton>
    </NuxtLink>
  </PricingInfo>
</template>

<script setup lang="ts">
import PricingInfo from "~/components/pricing/PricingInfo.vue";
import BaseButton from "~/components/base/BaseButton.vue";
import { themeButtonService } from "~/services/theme/ThemeButtonService";

const localePath = useLocalePath();
</script>
