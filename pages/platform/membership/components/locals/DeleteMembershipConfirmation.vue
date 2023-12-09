<template>
  <TransitionRoot appear :show="true" as="template">
    <Dialog as="div" class="relative z-30">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div
        @click="$emit('closeModal')"
        class="fixed inset-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity"
      >
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-800 p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg mt-4 font-medium leading-6 dark:text-slate-200 text-slate-900"
              >
                {{
                  $t(
                    "platform.memberships.delete_membership_confirmation_title",
                  )
                }}
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm dark:text-slate-400 text-slate-500">
                  {{
                    $t(
                      "platform.memberships.delete_membership_confirmation_text",
                    )
                  }}
                </p>
              </div>

              <div class="mt-6 flex justify-between">
                <BaseButton
                  :button-theme="themeButtonService.getThemeButtonById(5)"
                  :disabled="submitInProgress"
                  class="font-bold"
                  @click="$emit('closeModal')"
                >
                  {{ $t("global.cancel") }}
                </BaseButton>
                <BaseButton
                  :button-theme="themeButtonService.getThemeButtonById(8)"
                  :disabled="submitInProgress"
                  class="font-bold"
                  @click="$emit('deleteMembership')"
                >
                  <BaseSpinnerSmall
                    :submit-in-progress="submitInProgress"
                    spinner-text="global.deleting"
                    button-text="global.delete"
                  />
                </BaseButton>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import { themeButtonService } from "~/services/theme/ThemeButtonService";

interface Props {
  submitInProgress: boolean;
}

defineProps<Props>();

defineEmits(["closeModal", "deleteMembership"]);
</script>
