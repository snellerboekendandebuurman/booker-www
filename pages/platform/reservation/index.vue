<template>
  <div class="m-4">
    <ReservationAddModal
      :modal-open="modalAddOpen"
      @toggle-modal="toggleAddModal"
    />
    <ul
      role="list"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <ReservationAddCard @toggle-modal="toggleAddModal" />
      <Observer>
        <ReservationInfoCard
          v-for="reservation in reservationsService.reservations"
          :key="reservation.id"
          :reservation="reservation"
        />
      </Observer>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Observer } from "mobx-vue-lite";
import ReservationAddCard from "./components/ReservationAddCard.vue";
import ReservationAddModal from "./components/ReservationAddModal.vue";
import ReservationInfoCard from "./components/ReservationInfoCard.vue";
import { reservationsService } from "~/services/reservation/ReservationsService";
import { toastMessageService } from "~/services/response/ToastMessageService";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";
import { ToastMessage } from "~/models/response/ToastMessage";

const { localeProperties } = useI18n();

await onBeforeMount(async () => {
  const response = await reservationsService.getReservations({
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

  reservationsService.setReservations(response.data.value);
});

const modalAddOpen = ref(false);

function toggleAddModal() {
  // This is a little trick, to prevent the user from closing
  // the modal while they actually press the close button
  // from a toastmessage.
  // if (toastMessageService.toastMessagesQueue.length !== 0) {
  //   return;
  // }

  reservationsService.selectedPlayer1 = null;
  reservationsService.selectedPlayer2 = null;
  reservationsService.selectedPlayer3 = null;
  reservationsService.selectedPlayer4 = null;
  modalAddOpen.value = !modalAddOpen.value;
}

definePageMeta({
  layout: "platform",
  middleware: [
    "check-logged-in-user-tokens",
    "check-logged-in-user-account-status",
  ],
});
</script>
