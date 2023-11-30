<template>
  <div>
    <p
      class="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300"
    >
      {{ $t("global.fields.sports_type") }}
    </p>
    <Field name="sports_type" class="hidden" />
    <div class="md:col-span-2 z-15 mt-1">
      <div class="relative inline-block w-full">
        <button
          type="button"
          :class="[
            membershipIdValue ? 'cursor-pointer' : 'cursor-auto',
            ,
            'w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
          ]"
          @click="toggleIsOpen"
        >
          <div v-if="sportsTypeValue" class="flex items-center cursor-pointer">
            <span class="ml-4">{{ sportsTypeValue }}</span>
          </div>
          <div
            v-else-if="membershipIdValue"
            class="flex items-center cursor-pointer"
          >
            <span class="ml-4">{{
              $t("global.fields.select_sports_type")
            }}</span>
          </div>
          <div v-else>
            <p>{{ $t("global.fields.select_membership_first") }}</p>
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
          v-if="isOpen && membershipIdValue"
          class="absolute z-20 mt-2 w-full bg-white shadow-lg rounded-lg border border-gray-300 divide-y divide-gray-300"
        >
          <div
            v-for="sportsType in reservationsService.sportsTypes"
            :key="sportsType"
            class="flex items-center p-4 cursor-pointer hover:bg-gray-200 hover:rounded-lg"
            @click="selectSportsType(sportsType)"
          >
            <span class="mr-12">{{ sportsType }}</span>
          </div>
        </div>
      </div>
    </div>
    <ErrorMessage
      name="sports_type"
      as="p"
      class="dark:text-pink-200 text-pink-400"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useField } from "vee-validate";
import { reservationsService } from "~/services/reservation/reservationsService";

const emit = defineEmits(["sports-type-selected"]);

const isOpen = ref(false);

const { value: membershipIdValue } = useField("membership_id");
const { value: sportsTypeValue } = useField("sports_type");

function selectSportsType(option: string) {
  sportsTypeValue.value = option;
  isOpen.value = false;
  emit("sports-type-selected", option);
}

function toggleIsOpen() {
  if (membershipIdValue.value === undefined) {
    return;
  }

  isOpen.value = !isOpen.value;
}
</script>
