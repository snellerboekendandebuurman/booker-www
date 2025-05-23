<template>
  <Observer>
    <div v-if="modalMessageService.showModalMessage" class="z-50">
      <TransitionRoot as="template" :show="true">
        <Dialog
          as="div"
          class="relative z-50"
          @click="
            modalMessageService.removeModal(
              modalMessageService.displayModalMessage.id,
            )
          "
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <div
              class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />
          </TransitionChild>

          <div class="fixed inset-0 z-10 overflow-y-auto">
            <div
              class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
            >
              <TransitionChild
                as="template"
                enter="ease-out duration-300"
                enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enter-to="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leave-from="opacity-100 translate-y-0 sm:scale-100"
                leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <DialogPanel
                  class="relative z-50 transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
                >
                  <div>
                    <div
                      class="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
                    >
                      <component
                        :is="modalMessageService.displayModalMessage.icon"
                        v-if="modalMessageService.displayModalMessage.icon"
                        :class="[
                          modalMessageService.displayModalMessage.styling,
                          'h-16 w-16',
                        ]"
                      />
                    </div>
                    <div class="mt-3 text-center sm:mt-5">
                      <DialogTitle
                        as="h3"
                        class="text-lg font-semibold leading-6 dark:text-slate-300 text-slate-900"
                        >{{
                          $t(modalMessageService.displayModalMessage.title)
                        }}</DialogTitle
                      >
                      <div
                        v-if="
                          modalMessageService.displayModalMessage.inProgress
                        "
                      >
                        <svg
                          aria-hidden="true"
                          role="status"
                          class="mt-4 inline w-10 h-10 mr-3 text-blue-700 animate-spin"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                      <div v-else class="mt-2">
                        <p class="text-md dark:text-slate-500 text-slate-700">
                          {{
                            $t(modalMessageService.displayModalMessage.message)
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="mt-5 sm:mt-6 flex flex-wrap justify-center gap-3">
                    <template
                      v-for="button in modalMessageService.displayModalMessage
                        .buttons"
                    >
                      <NuxtLink
                        v-if="button.to"
                        :key="button.id"
                        :to="localePath(button.to)"
                        @click="
                          modalMessageService.removeModal(
                            modalMessageService.displayModalMessage.id,
                          )
                        "
                      >
                        <BaseButton
                          :key="button.id"
                          :button-theme="
                            themeButtonService.getThemeButtonById(
                              button.themeId,
                            )
                          "
                        >
                          {{ $t(button.label) }}
                        </BaseButton>
                      </NuxtLink>
                      <BaseButton
                        v-else
                        :key="button.label"
                        :button-theme="
                          themeButtonService.getThemeButtonById(button.themeId)
                        "
                        @click="
                          modalMessageService.removeModal(
                            modalMessageService.displayModalMessage.id,
                          )
                        "
                      >
                        {{ $t(button.label) }}
                      </BaseButton>
                    </template>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </Observer>
</template>

<script setup lang="ts">
import { Observer } from "mobx-vue-lite";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { modalMessageService } from "~/services/response/ModalMessageService";
import BaseButton from "~/components/base/BaseButton.vue";

import { themeButtonService } from "~/services/theme/ThemeButtonService";

const localePath = useLocalePath();
</script>
