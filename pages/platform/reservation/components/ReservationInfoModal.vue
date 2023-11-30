<!-- <template>
  <TransitionRoot as="template" :show="modalOpen">
    <Dialog as="div" class="relative z-10" @close="toggleModal">
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
              <CancelReservationConfirmation
                v-if="showCancelConfirmationModal"
                :submit-in-progress="submitInProgress"
                @close-modal="closeModal"
                @cancel-reservation="cancelReservation(reservation.id)"
              />
              <div
                class="relative w-full rounded items-center sm:overflow-hidden md:overflow-visible px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 bg-slate-300 dark:bg-slate-800"
              >
                <button
                  type="button"
                  class="absolute right-4 top-4 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
                  @click="toggleModal"
                >
                  <span class="sr-only">Close</span>
                  <XMarkIcon
                    class="h-6 w-6 dark:text-slate-300"
                    aria-hidden="true"
                  />
                </button>
                <div class="flex flex-1 flex-col p-4">
                  <img
                    class="mx-auto h-32 w-auto flex-shrink-0 rounded-md"
                    :src="reservation.membership.club.image"
                    alt=""
                  />
                  <h3
                    class="mt-6 font-bold text-lg text-gray-900 dark:text-slate-200 text-center"
                  >
                    {{ reservation.membership.club.name }}
                  </h3>

                  <div class="flex justify-center space-x-4 m-6">
                    <span
                      class="inline-flex items-center rounded-full bg-fuchsia-50 px-2 py-1 text-xs font-medium text-fuchsia-700 ring-1 ring-inset ring-fuchsia-600/20"
                      >{{ reservation.sportType }}</span
                    >
                    <span
                      v-if="reservation.status === EReservationStatus.Success"
                      class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                      >{{ reservation.status }}</span
                    >
                    <span
                      v-if="reservation.status === EReservationStatus.Canceled"
                      class="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20"
                      >{{ reservation.status }}</span
                    >
                    <span
                      v-if="reservation.status === EReservationStatus.Failed"
                      class="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20"
                      >{{ reservation.status }}</span
                    >
                    <span
                      v-if="reservation.status === EReservationStatus.Scheduled"
                      class="inline-flex items-center rounded-full bg-cyan-50 px-2 py-1 text-xs font-medium text-cyan-700 ring-1 ring-inset ring-cyan-600/20"
                      >{{ reservation.status }}</span
                    >
                    <span
                      v-if="
                        reservation.status === EReservationStatus.Rescheduled
                      "
                      class="inline-flex items-center rounded-full bg-cyan-50 px-2 py-1 text-xs font-medium text-cyan-700 ring-1 ring-inset ring-cyan-600/20"
                      >{{ reservation.status }}</span
                    >
                  </div>

                  <div
                    class="mt-8 grid grid-cols-2 px-6 py-4 gap-x-4 text-md text-gray-600 justify-center"
                  >
                    <div>
                      <dt class="font-bold text-gray-900 dark:text-slate-200">
                        {{ $t("platform.reservations.scheduled_time") }}
                      </dt>
                      <dd class="mt-2">
                        <address class="not-italic">
                          <span class="block dark:text-slate-300">{{
                            reservation.getFormattedScheduleTime()
                          }}</span>
                        </address>
                      </dd>
                    </div>
                    <div class="text-right">
                      <dt class="font-bold text-gray-900 dark:text-slate-200">
                        {{ $t("platform.reservations.reservation_time") }}
                      </dt>
                      <dd class="mt-2">
                        <address class="not-italic">
                          <span class="block dark:text-slate-300">{{
                            reservation.getFormattedReservationTime()
                          }}</span>
                        </address>
                      </dd>
                    </div>
                  </div>

                  <dl
                    class="-my-3 divide-y divide-gray-100 px-6 py-4 text-md leading-6 mt-6"
                  >
                    <div
                      v-for="(player, i) in reservation.players"
                      :key="player.id"
                      class="flex justify-between gap-x-4 py-3"
                    >
                      <dt class="text-gray-900 dark:text-slate-200 font-bold">
                        Player {{ i + 1 }}
                      </dt>
                      <dd class="dark:text-slate-300">
                        {{ player.fullName }}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div
                  class="flex border-2 border-slate-500 rounded-lg hover:border-slate-300 hover:cursor-pointer bg-slate-200 dark:bg-slate-600"
                >
                  <div class="flex w-0 flex-1">
                    <a
                      class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-md font-semibold text-red-600 dark:text-red-400"
                      @click="showCancelConfirmationModal = true"
                    >
                      <TrashIcon class="h-6 w-6" aria-hidden="true" />
                      {{ $t("global.cancel") }}
                    </a>
                  </div>
                </div>
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
import { TrashIcon } from "@heroicons/vue/20/solid";
import CancelReservationConfirmation from "./locals/CancelReservationConfirmation.vue";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { ToastMessage } from "~/models/response/ToastMessage";
import { toastMessageService } from "~/services/response/ToastMessageService";
import { Reservation } from "~/models/reservation/Reservation";
import { EReservationStatus } from "~/models/reservation/EReservation";
import { reservationsService } from "~/services/reservation/reservationsService";

const { localeProperties } = useI18n();

interface Props {
  modalOpen: boolean;
  reservation: Reservation;
}

defineProps<Props>();

const showCancelConfirmationModal = ref(false);
const submitInProgress = ref(false);

const emit = defineEmits<{
  (e: "toggleModal"): void;
}>();

function toggleModal() {
  emit("toggleModal");
}

function closeModal() {
  showCancelConfirmationModal.value = false;
}

async function cancelReservation(reservationId: string | number) {
  submitInProgress.value = true;
  // delete membership on the server
  const response = await reservationsService.cancelReservation({
    locale: localeProperties.value.iso!,
    reservationId,
  });

  submitInProgress.value = false;
  const message = apiResponseHandlerService.handleResponse(response);

  toastMessageService.addToast(
    new ToastMessage({
      id: Math.random(),
      title: message.title,
      message: message.message,
      status: message.status,
    }),
  );

  // Catch error
  if (message.status !== EApiResponseStatus.success) {
    return;
  }

  reservationsService._handleSuccesfullReservationCancel(reservationId);
  showCancelConfirmationModal.value = false;
}
</script> -->

<template>
  <p>PPPP</p>
</template>
