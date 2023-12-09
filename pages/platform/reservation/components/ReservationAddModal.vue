<template>
  <TransitionRoot as="template" :show="modalOpen">
    <Dialog as="div" class="relative z-30" @close="closeStep">
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
          class="z-5 fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block"
        />
      </TransitionChild>

      <div class="fixed inset-0 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            enter-to="opacity-100 translate-y-0 md:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 md:scale-100"
            leave-to="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
          >
            <DialogPanel
              class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl"
            >
              <div
                class="relative w-full rounded items-center sm:overflow-hidden md:overflow-visible px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 bg-slate-300 dark:bg-slate-900"
              >
                <button
                  type="button"
                  class="absolute right-4 top-4 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                  @click="closeStep"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon
                    class="h-6 w-6 dark:text-slate-300"
                    aria-hidden="true"
                  />
                </button>
                <FormHeaderSteps
                  class="mt-8 md:mt-12 my-4"
                  :steps="addMembershipSteps"
                />
                <AddReservationForm
                  class="mt-8"
                  @next-step="nextStep"
                  @previous-step="previousStep"
                  @close-step="closeStep"
                />
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
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import { EStepStatus } from "~/types/add-membership-modal/EStepStatus";

import FormHeaderSteps from "~/components/forms/components/FormHeaderSteps.vue";
import AddReservationForm from "~/components/forms/AddReservationForm.vue";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { membershipsService } from "~/services/membership/MembershipsService";
import { ToastMessage } from "~/models/response/ToastMessage";
import { toastMessageService } from "~/services/response/ToastMessageService";

const { localeProperties } = useI18n();

interface Props {
  modalOpen: boolean;
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "toggleModal"): void;
}>();

await onBeforeMount(async () => {
  const response = await membershipsService.getMemberships({
    locale: localeProperties.value.iso!,
  });
  const message = apiResponseHandlerService.handleResponse(response);

  if (message.status !== EApiResponseStatus.success) {
    toastMessageService.addToast(
      new ToastMessage({
        id: Math.random(),
        title: message.title,
        message: message.message,
        status: message.status,
      }),
    );
    return;
  }

  membershipsService.setMemberships(response.data.value);
});

const addMembershipSteps = reactive([
  { id: 1, name: "platform.reservations.details", status: EStepStatus.current },
  { id: 2, name: "platform.reservations.players", status: EStepStatus.empty },
  { id: 3, name: "platform.reservations.dates", status: EStepStatus.empty },
]);

function nextStep(step: number) {
  if (addMembershipSteps[step].status !== EStepStatus.complete) {
    addMembershipSteps[step].status = EStepStatus.current;
  }
  addMembershipSteps[step - 1].status = EStepStatus.complete;
}

function previousStep(step: number) {
  addMembershipSteps[step].status = EStepStatus.current;

  if (addMembershipSteps[step + 1].status !== EStepStatus.complete) {
    addMembershipSteps[step + 1].status = EStepStatus.empty;
  }
}

function closeStep() {
  addMembershipSteps[0].status = EStepStatus.current;
  addMembershipSteps[1].status = EStepStatus.empty;
  addMembershipSteps[2].status = EStepStatus.empty;
  emit("toggleModal");
}
</script>
