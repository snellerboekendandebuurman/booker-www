<template>
  <HeaderContainer>
    <!-- Header Desktop -->
    <header class="hidden lg:block">
      <HeaderDesktop :links="links" />
    </header>
    <!-- Header Mobile -->
    <header class="lg:invisible lg:collapse">
      <HeaderMobile :links="links" />
    </header>
  </HeaderContainer>
</template>

<script setup lang="ts">
import HeaderDesktop from "./locals/HeaderDesktop.vue";
import HeaderMobile from "./locals/HeaderMobile.vue";
import HeaderContainer from "./locals/HeaderContainer.vue";

import { PropsHeaderLink } from "@/types/PropsHeaderLink";

const links: PropsHeaderLink[] = [
  // Text comes from Translations
  { text: "global.pricing", to: "/pricing" },
];
</script>
