<template>
    <div v-if="membershipIdIdValue">
      <label for="player_2_id" class="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">{{ $t("global.fields.select_player_2") }}</label>
      <div class="relativemt-1 mt-1">
        <Observer>
        <div class="flex justify-between items-center relative">
          <Field name="player_2_id" class="hidden" />
          <Field name="player_2_full_name" class="hidden" />
          <input
            ref="inputRef"
            @click="selectInputField"
            :class="{
            'flex-grow h-10 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-inset focus:ring-pink-400 sm:text-sm sm:leading-6 text-slate-700 dark:text-slate-300': true,
            'pr-16': reservationsService.selectedPlayer2?.image,
            'pr-2': !reservationsService.selectedPlayer2?.image
          }" autocomplete="off" type="text" v-model="selectedPlayerFullName" />
          <img v-if="reservationsService.selectedPlayer2" :src="reservationsService.selectedPlayer2.image" class="rounded-md h-8 w-auto absolute right-0 mr-6" />
        </div>
          <div v-if="reservationsService.players.length !== 0 && inputSelected"
            class="absolute z-30 mt-2 w-full bg-white shadow-lg rounded-lg border border-gray-300 divide-y divide-gray-300 overflow-y-auto max-h-[500px]">
            <div v-for="player in reservationsService.players" :key="player.id" @click="selectPlayer(player)"
              class="flex justify-between items-center p-2 cursor-pointer hover:bg-gray-200 hover:rounded-lg">
              <span class="text-black">{{ player.fullName }}</span>
              <img :src="player.image" class="h-12 w-auto p-px rounded-md mr-6" alt="" />
            </div>
          </div>
        </Observer>
        <ErrorMessage name="player_2_id" as="p" class="dark:text-pink-200 text-pink-400" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { Observer } from "mobx-vue-lite";
  import { useField } from "vee-validate";
  import { reservationsService } from "~/services/reservation/ReservationsService";
  import { debounce } from 'lodash-es';
  import { Player } from "~/models/reservation/Player";
  import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";
  import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
  import { ToastMessage } from "~/models/response/ToastMessage";
  import { toastMessageService } from "~/services/response/ToastMessageService";
  
  const { localeProperties } = useI18n();
  
  const { value: membershipIdIdValue } = useField("membership_id");
  const { value: playerIdValue } = useField("player_2_id");
  const { value: playerFullNameValue } = useField("player_2_full_name");
  
  const inputRef = ref();
  const inputSelected = ref(false);
  const selectedPlayerFullName = ref('');
  const isPlayerSelected = ref(false);
  
  onBeforeMount(() => {
   if (reservationsService.selectedPlayer2) {
    isPlayerSelected.value = true;
    selectedPlayerFullName.value = reservationsService.selectedPlayer2.fullName;
    playerIdValue.value = reservationsService.selectedPlayer2.id;
    playerFullNameValue.value = reservationsService.selectedPlayer2.fullName;
   }
  });

  function selectInputField() {
    inputSelected.value = true;
  }
  
  function selectPlayer(player: Player) {
    isPlayerSelected.value = true;
    inputSelected.value = false;
  
    reservationsService.selectedPlayer2 = player;
    selectedPlayerFullName.value = player.fullName;

    playerIdValue.value = player.id;
    playerFullNameValue.value = player.fullName;
  
    reservationsService.clearPlayers();
    refocusInput();
  }
  
  async function handleChange(searchTerm: string) {
    const response = await reservationsService.getPlayers({
      locale: localeProperties.value.iso!,
      searchTerm: searchTerm,
      membershipId: membershipIdIdValue.value,
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

    const playersData = reservationsService._handleSuccessfullGetPlayers(response.data.value);

    reservationsService.setPlayers(playersData);
    refocusInput();
  }
  
  let debouncedApiCall = debounce(handleChange, 300);
  
  watch(selectedPlayerFullName, (newValue, oldValue) => {
    if (newValue.length === 0) {
      reservationsService.clearPlayers()
      debouncedApiCall.cancel();
      return;
    }
    if (newValue !== oldValue && !isPlayerSelected.value) {
      debouncedApiCall(newValue);
    }
  
    isPlayerSelected.value = false;
  });
  
  function refocusInput() {
    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.focus();
      }
    });
  }
  </script>