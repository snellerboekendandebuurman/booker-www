<template>
    <div>
      <label for="membership_id" class="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">{{ $t("global.fields.membership") }}</label>
    <Field
        name="membership_id"
        class="hidden"
      />
    <div class="md:col-span-2 mt-1">
      <div class="relative inline-block w-full">
        <button @click="isOpen = !isOpen" type="button"
          class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <div v-if="membershipIdIdValue" class="flex justify-between items-center cursor-pointer">
          <span class="ml-4">{{ membershipsService.getMembership(membershipIdIdValue as number).associationNumber || membershipsService.getMembership(membershipIdIdValue as number).clubNumber }}</span>
          <img :src="membershipsService.getMembership(membershipIdIdValue as number).club.image" class="h-8 w-auto p-px mr-6" alt="" />
        </div>
          <div v-else>
            <p>{{ $t("global.fields.select_membership") }}</p>
          </div>
          <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
              fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clip-rule="evenodd" />
            </svg>
          </span>
        </button>
        <div v-if="isOpen"
          class="absolute z-30 mt-2 w-full bg-white shadow-lg rounded-lg border border-gray-300 divide-y divide-gray-300">
          <div v-for="membership in membershipsService.memberships" :key="membership.id" @click="selectMembership(membership)"
            class="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-200 hover:rounded-lg">
            <span class="mr-12">{{ membership.associationNumber || membership.clubNumber }}</span>
            <img :src="membership.club.image" class="h-12 w-auto p-px rounded-md mr-6" alt="image" />
          </div>
        </div>
      </div>
    </div>
    <ErrorMessage
      name="membership_id"
      as="p"
      class="dark:text-pink-200 text-pink-400"
    />
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { membershipsService } from "~/services/membership/MembershipsService";
import { Membership } from "@/models/memberhip/Membership"


const isOpen = ref(false)

const { value: membershipIdIdValue } = useField("membership_id");

function selectMembership(option: Membership) {
    membershipIdIdValue.value = option.id;

    membershipsService.selectedClient = option;

    isOpen.value = false;
};

</script>