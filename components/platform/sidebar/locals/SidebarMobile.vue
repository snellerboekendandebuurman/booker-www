<template>
  <!-- Dynamic sidebar for Mobile -->
  <TransitionRoot as="template" :show="sidebarOpen" class="">
    <Dialog
      as="div"
      class="relative z-30 xl:hidden"
      @close="$emit('toggleSidebar')"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-slate-100/70 dark:bg-gray-900/70" />
      </TransitionChild>
      <div class="fixed inset-0 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div
                class="absolute left-full top-0 flex w-16 justify-center pt-5"
              >
                <button
                  type="button"
                  class="-m-2.5 p-2.5"
                  @click="$emit('toggleSidebar')"
                >
                  <span class="sr-only">Close sidebar</span>
                  <XMarkIcon
                    class="h-6 w-6 text-slate-700 dark:text-slate-300"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </TransitionChild>
            <!-- Sidebar component -->
            <div
              class="flex grow flex-col gap-y-5 overflow-y-auto bg-slate-300 dark:bg-gray-900 px-6 ring-1 ring-white/10"
            >
              <!-- Logo -->
              <div class="flex h-16 shrink-0 items-center">
                <BaseLogo class="w-auto h-10" />
              </div>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <!-- Navigation items -->
                    <ul role="list" class="-mx-2 space-y-1">
                      <li
                        v-for="item in links"
                        :key="item.text"
                        @click="$emit('toggleSidebar')"
                      >
                        <NuxtLink
                          :to="localePath(item.to)"
                          active-class="bg-gray-800 text-white"
                          class="text-gray-400 hover:text-white hover:bg-gray-800 text-slate-700 dark:text-slate-300 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        >
                          <component
                            :is="item.icon"
                            class="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {{ $t(item.text) }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { PropsSidebarLink } from "~/components/types/SidebarLink";
import BaseLogo from "@/components/base/BaseLogo.vue";

interface Props {
  links: PropsSidebarLink[];
  sidebarOpen: boolean;
}

defineProps<Props>();

defineEmits<{
  (e: "toggleSidebar"): void;
}>();

const localePath = useLocalePath();
</script>