<template>
  <li
    class="col-span-1 flex flex-col divide-y divide-gray-200 hover:divide-gray-400 rounded-lg text-center shadow bg-slate-400 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-500 hover:cursor-pointer"
    @click="toggleModal"
  >
    <ReservationInfoModal
      :modal-open="showModal"
      :reservation="reservation"
      @toggle-modal="toggleModal"
    />
    <div class="flex flex-col p-6">
      <img
        class="mx-auto h-16 w-auto flex-shrink-0 rounded-md"
        :src="reservation.membership.club.image"
        :alt="reservation.getImage()"
      />
      <h3 class="mt-6">{{ reservation.membership.club.name }}</h3>
      <dl class="mt-4 flex flex-grow flex-col justify-between font-bold">
        <dd class="">{{ reservation.getFormattedReservationTime() }}</dd>
      </dl>
    </div>
    <div class="flex justify-evenly p-2 m-2">
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
        v-if="reservation.status === EReservationStatus.Rescheduled"
        class="inline-flex items-center rounded-full bg-cyan-50 px-2 py-1 text-xs font-medium text-cyan-700 ring-1 ring-inset ring-cyan-600/20"
        >{{ reservation.status }}</span
      >
    </div>
  </li>
</template>

<script setup lang="ts">
import ReservationInfoModal from "./ReservationInfoModal.vue";
import { Reservation } from "~/models/reservation/Reservation";
import { EReservationStatus } from "~/models/reservation/EReservation";

interface Props {
  reservation: Reservation;
}

defineProps<Props>();

const showModal = ref(false);

function toggleModal() {
  showModal.value = !showModal.value;
}
</script>
