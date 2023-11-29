<template>
  <div v-if="clientIdValue && shouldDisplayField(clientIdValue as number, 'kntlb')">
    <label for="club_id" class="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">{{ $t("global.fields.select_club") }}</label>
    <div class="relativemt-1 mt-1">
      <Observer>
      <div class="flex justify-between items-center relative">
        <Field name="club_id" class="hidden" />
        <Field name="club_name" class="hidden" />
        <Field name="club_image" class="hidden" />
        <input
          ref="inputRef"
          :class="{
          'flex-grow h-10 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-inset focus:ring-pink-400 sm:text-sm sm:leading-6 text-slate-700 dark:text-slate-300': true,
          'pr-16': membershipsService.selectedClub?.image,
          'pr-2': !membershipsService.selectedClub?.image
        }" autocomplete="off" type="text" v-model="selectedClubName" />
        <img v-if="membershipsService.selectedClub" :src="membershipsService.selectedClub.image" class="rounded-md h-8 w-auto absolute right-0 mr-6" />
      </div>
        <div v-if="membershipsService.clubs.length !== 0"
          class="absolute z-30 mt-2 w-full bg-white shadow-lg rounded-lg border border-gray-300 divide-y divide-gray-300 overflow-y-auto max-h-[500px]">
          <div v-for="club in membershipsService.clubs" :key="club.id" @click="selectClub(club)"
            class="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-200 hover:rounded-lg">
            <span class="text-black">{{ club.name }}</span>
            <img :src="club.image" class="h-12 w-auto p-px rounded-md mr-6" alt="" />
          </div>
        </div>
      </Observer>
      <ErrorMessage name="club_id" as="p" class="dark:text-pink-200 text-pink-400" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Observer } from "mobx-vue-lite";
import { useField } from "vee-validate";
import { membershipsService } from "~/services/membership/MembershipsService";
import { debounce } from 'lodash-es';
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { ToastMessage } from "~/models/response/ToastMessage";
import { toastMessageService } from "~/services/response/ToastMessageService";

const { localeProperties } = useI18n();

const { value: clientIdValue } = useField("client_id");
const { value: clubIdValue } = useField("club_id");
const { value: clubNameValue } = useField("club_name");
const { value: clubImageValue } = useField("club_image");

const inputRef = ref();
const selectedClubName = ref('');
const isClubSelected = ref(false);

function shouldDisplayField(client_id: string | number, name: string): boolean {
  return membershipsService.getClient(client_id).name.includes(name)!
}

onBeforeMount(() => {
 if (membershipsService.selectedClub) {
  isClubSelected.value = true;
  selectedClubName.value = membershipsService.selectedClub.name;
  clubIdValue.value = membershipsService.selectedClub.id;
  clubNameValue.value = membershipsService.selectedClub.name;
  clubImageValue.value = membershipsService.selectedClub.image;
 }
});

function selectClub(club: any) {
  isClubSelected.value = true;

  membershipsService.selectedClub = club
  selectedClubName.value = club.name
  clubIdValue.value = club.id;
  clubNameValue.value = club.name;
  clubImageValue.value = club.image;

  membershipsService.clearClubs();
  refocusInput();
}

async function handleChange(searchTerm: string) {
  const response = await membershipsService.getClubs({
    locale: localeProperties.value.iso!,
    searchTerm: searchTerm,
  })

  const message = apiResponseHandlerService.handleResponse(response);

  if (message.status !== EApiResponseStatus.success) {
    toastMessageService.addToast(
      new ToastMessage({
        id: Math.random(),
        title: message.title,
        message: message.message,
        status: message.status,
      })
    );
    return;
  }
  membershipsService.setClubs(response.data.value["clubs"]);
  refocusInput();
}

let debouncedApiCall = debounce(handleChange, 300);

watch(selectedClubName, (newValue, oldValue) => {
  if (newValue.length === 0) {
    membershipsService.clearClubs()
    debouncedApiCall.cancel();
    return;
  }
  if (newValue !== oldValue && !isClubSelected.value) {
    debouncedApiCall(newValue);
  }

  isClubSelected.value = false;
});

function refocusInput() {
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus();
    }
  });
}
</script>