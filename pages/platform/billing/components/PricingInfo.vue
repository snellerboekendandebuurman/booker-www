<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl sm:text-center">
        <h2
          class="text-3xl font-bold tracking-tight dark:text-slate-200 sm:text-4xl"
        >
          {{ $t("platform.billing.hero_leading_text") }}
        </h2>
        <p class="mt-6 text-lg leading-8 text-pink-400">
          {{ $t("platform.billing.hero_helper_text") }}
        </p>
      </div>
      <div
        class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none relative light:bg-white shadow-2xl"
      >
        <div class="p-8 sm:p-10 lg:flex-auto">
          <h3 class="text-2xl font-bold tracking-tight dark:text-slate-200">
            {{ $t("platform.billing.card_leading_text") }}
          </h3>
          <p class="mt-6 text-base leading-7 text-slate-400">
            {{ $t("pricing.card_helper_text") }}
          </p>
          <div class="mt-10 flex items-center gap-x-4">
            <h4
              class="flex-none text-sm font-semibold leading-6 dark:text-pink-200 text-pink-400"
            >
              {{ $t("pricing.card_benefits_text") }}
            </h4>
            <div class="h-px flex-auto dark:bg-pink-200 bg-pink-400" />
          </div>
          <ul
            role="list"
            class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 sm:grid-cols-2 sm:gap-6"
          >
            <li
              v-for="feature in includedFeatures"
              :key="feature"
              class="flex gap-x-3"
            >
              <CheckIcon
                class="h-6 w-5 flex-none dark:text-pink-200 text-pink-400"
                aria-hidden="true"
              />
              <p class="text-slate-400">
                {{ $t(feature) }}
              </p>
            </li>
          </ul>
        </div>
        <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
          <div
            class="rounded-2xl bg-gray-100 dark:bg-gray-800 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16"
          >
            <div class="mx-auto max-w-xs px-8">
              <p class="text-base font-semibold">
                {{ $t("pricing.card_price_text") }}
              </p>
              <p class="mt-6 flex items-baseline justify-center gap-x-2">
                <span class="text-5xl font-bold tracking-tight">€1</span>
                <span class="text-sm font-semibold leading-6 tracking-wide"
                  >EUR</span
                >
              </p>
              <div class="mt-10">
                <slot> </slot>
              </div>
              <p class="mt-6 text-xs leading-5 text-slate-400">
                {{ $t("pricing.card_email_text") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckIcon } from "@heroicons/vue/20/solid";

const includedFeatures = [
  "pricing.card_benefit_1",
  "pricing.card_benefit_2",
  "pricing.card_benefit_3",
  "pricing.card_benefit_4",
];
</script>
