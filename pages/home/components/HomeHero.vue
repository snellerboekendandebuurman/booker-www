<template>
  <div class="relative isolate px-6 pt-14 lg:px-8">
    <BaseBackground />
    <div class="mx-auto max-w-2xl py-16">
      <div class="text-center">
        <h1
          class="text-2xl font-bold tracking-tight sm:text-6xl dark:text-slate-200"
        >
          {{ $t("home.hero_leading_text") }}
        </h1>
        <p class="mt-6 text-l sm:text-lgleading-8 text-slate-400">
          {{ $t("home.hero_helper_text") }}
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <NuxtLink :to="localePath('/auth/register')">
            <BaseButton
              :button-theme="themeButtonService.getThemeButtonById(5)"
            >
              <span>{{ $t("global.get_started") }}</span>
            </BaseButton>
          </NuxtLink>
          <NuxtLink :to="localePath('/pricing')">
            <BaseButton
              :button-theme="themeButtonService.getThemeButtonById(4)"
              class="font-bold"
            >
              {{ $t("global.pricing") }} <span aria-hidden="true">→</span>
            </BaseButton>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div
      class="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
    >
      <svg
        class="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
        viewBox="0 0 1155 678"
      >
        <path
          fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
          fill-opacity=".3"
          d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
        />
        <defs>
          <linearGradient
            id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
            x1="1155.49"
            x2="-78.208"
            y1=".177"
            y2="474.645"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#f9a8d4" />
            <stop offset="1" stop-color="#1e3a8a" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { themeButtonService } from "~/services/theme/ThemeButtonService";

import BaseButton from "~/components/base/BaseButton.vue";

const localePath = useLocalePath();
</script>
