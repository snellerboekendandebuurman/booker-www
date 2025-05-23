<template>
  <div class="flex justify-end flex-1">
    <!-- Profile Dropdown -->
    <Menu as="div" class="relative">
      <MenuButton
        class="-m-1.5 flex items-center p-1.5 hover:text-gray-500 dark:hover:text-slate-200"
      >
        <Observer>
          <Cog6ToothIcon class="ml-2 h-6 w-6" aria-hidden="true" />
          <span class="hidden sm:flex sm:items-center">
            <span
              class="ml-4 text-sm font-semibold leading-6"
              aria-hidden="true"
              >{{ userService.getAuthenticatedUserFullName() }}</span
            >
          </span>
          <ChevronDownIcon class="ml-2 h-5 w-5" aria-hidden="true" />
        </Observer>
      </MenuButton>
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95"
      >
        <MenuItems
          class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white dark:bg-slate-700 py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
        >
          <MenuItem v-slot="{ close }">
            <div @click="close">
              <NuxtLink
                :to="localePath('/platform/account/settings')"
                active-class="bg-pink-100 text-pink-900"
                class="block w-full flex rounded-md items-center space-x-2 text-left px-3 py-1 text-sm leading-6 hover:bg-slate-300 hover:dark:bg-slate-500"
                @click="close"
              >
                <Cog6ToothIcon
                  class="h-5 w-5 align-middle"
                  aria-hidden="true"
                />
                <span>{{ $t("platform.topbar.settings") }}</span>
              </NuxtLink>
            </div>
          </MenuItem>
          <MenuItem>
            <button
              class="block w-full flex items-center space-x-2 text-left px-3 py-1 text-sm leading-6 hover:bg-slate-300 hover:dark:bg-slate-500 rounded-md mt-2"
              @click="userLogout"
            >
              <ArrowRightOnRectangleIcon class="h-5 w-5" />
              <span>{{ $t("platform.topbar.logout") }}</span>
            </button>
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { Observer } from "mobx-vue-lite";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import {
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/vue/24/outline";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";

import { userService } from "~/services/user/UserService";

const { localeProperties } = useI18n();

async function userLogout() {
  await userService.userLogout({
    locale: localeProperties.value.iso!,
  });
  // Refresh page in order to make sure that all the tokens are removed
  window.location.reload();
  navigateTo({
    path: localePath("/auth/login"),
  });
}

const localePath = useLocalePath();
</script>
