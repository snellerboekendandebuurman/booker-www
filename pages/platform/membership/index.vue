<template>
  <div class="m-4">
    <MembershipAddModal
      :modal-open="modalAddOpen"
      @toggle-modal="toggleAddModal"
    />
    <ul
      role="list"
      class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <MembershipAddCard @toggle-modal="toggleAddModal" />
      <Observer>
        <li
          v-for="membership in membershipsService.memberships"
          :key="membership.id"
          class="col-span-1 flex flex-col divide-y divide-gray-200 text-center shadow"
        >
          <MembershipInfoCard :membership="membership" />
        </li>
      </Observer>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Observer } from "mobx-vue-lite";
import MembershipInfoCard from "./components/MembershipInfoCard.vue";
import MembershipAddModal from "./components/MembershipAddModal.vue";
import MembershipAddCard from "./components/MembershipAddCard.vue";
import { membershipsService } from "~/services/membership/MembershipsService";
import { toastMessageService } from "~/services/response/ToastMessageService";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";
import { ToastMessage } from "~/models/response/ToastMessage";

const { localeProperties } = useI18n();

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

const modalAddOpen = ref(false);

function toggleAddModal() {
  membershipsService.selectedClub = null;
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
