<template>
  <div>
    <label
      for="client_id"
      class="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300"
      >{{ $t("global.fields.client") }}</label
    >
    <Field name="client_id" class="hidden" />
    <div class="md:col-span-2 mt-1">
      <div class="relative inline-block w-full">
        <button
          type="button"
          class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          @click="isOpen = !isOpen"
        >
          <div
            v-if="clientIdValue"
            class="flex justify-between items-center cursor-pointer"
          >
            <span class="ml-4">{{
              membershipsService.getClient(clientIdValue as number).name
            }}</span>
            <img
              :src="membershipsService.getClient(clientIdValue as number).image"
              class="h-8 w-auto p-px mr-6"
              alt=""
            />
          </div>
          <div v-else>
            <p>{{ $t("global.fields.select_client") }}</p>
          </div>
          <span
            class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
          >
            <svg
              class="w-5 h-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </button>
        <div
          v-if="isOpen"
          class="absolute z-30 mt-2 w-full bg-white shadow-lg rounded-lg border border-gray-300 divide-y divide-gray-300"
        >
          <div
            v-for="client in membershipsService.clients"
            :key="client.id"
            class="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-200 hover:rounded-lg"
            @click="selectClient(client)"
          >
            <span class="mr-12">{{ client.name }}</span>
            <img
              :src="client.image"
              class="h-12 w-auto p-px rounded-md mr-6"
              alt="image"
            />
          </div>
        </div>
      </div>
    </div>
    <ErrorMessage
      name="client_id"
      as="p"
      class="dark:text-pink-200 text-pink-400"
    />
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { membershipsService } from "~/services/membership/MembershipsService";
import { Client } from "@/models/memberhip/Client";

const isOpen = ref(false);

const { value: clientIdValue } = useField("client_id");

function selectClient(option: Client) {
  clientIdValue.value = option.id;

  membershipsService.selectedClient = option;

  isOpen.value = false;
}
</script>
