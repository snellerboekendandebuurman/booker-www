<template>
    <div class="bg-slate-400 dark:bg-slate-700 rounded-lg">
      <DeleteMembershipConfirmation v-if="showModal" :submit-in-progress="submitInProgress" @close-modal="closeModal" @delete-membership="deleteMembership(membership.id)"/>
      <div class="flex flex-col p-8">
            <img class="mx-auto h-28 w-auto flex-shrink-0 rounded-md" :src="membership.club.image" alt="No Image" />
            <h3 class="mt-6">{{ membership.associationNumber || membership.clubNumber }}</h3>
            <dl class="mt-6 flex flex-grow flex-col justify-between">
              <dd class="">{{ membership.authenticationMethod.method }}</dd>
            </dl>
          </div>
          <div>
          </div>
          <div>
        <div class="flex border-2 border-slate-500 rounded-lg hover:border-slate-300 hover:cursor-pointer bg-slate-200 dark:bg-slate-600">
          <div class="flex w-0 flex-1">
            <a @click="showModal = true" class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-md font-semibold text-red-600 dark:text-red-400">
              <TrashIcon class="h-6 w-6" aria-hidden="true" />
              Delete
            </a>
          </div>
        </div>
      </div>
    </div>
</template>
    
<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/20/solid'
import { Membership } from '~/models/membership/Membership';
import { membershipsService } from "~/services/membership/MembershipsService";
import DeleteMembershipConfirmation from "./locals/DeleteMembershipConfirmation.vue";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { toastMessageService } from "~/services/response/ToastMessageService";
import { ToastMessage } from "~/models/response/ToastMessage";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";

const { localeProperties } = useI18n();

interface Props {
  membership: Membership;
}

defineProps<Props>();

const showModal = ref(false);
const submitInProgress = ref(false);

async function deleteMembership(membershipId: number | string) {
  submitInProgress.value = true;
  // delete membership on the server
  const response = await membershipsService.deleteMembership({
    locale: localeProperties.value.iso!,
    membershipId,
  })
  
  submitInProgress.value = false;
  const message = apiResponseHandlerService.handleResponse(response);

  toastMessageService.addToast(
    new ToastMessage({
      id: Math.random(),
      title: message.title,
      message: message.message,
      status: message.status,
    })
  );

  // Catch error
  if (message.status !== EApiResponseStatus.success) {
    return;
  }

  membershipsService._handleSuccesfullMembershipDeletion(membershipId);
  showModal.value = false;
};

function closeModal() {
  showModal.value = false;
}
</script>
