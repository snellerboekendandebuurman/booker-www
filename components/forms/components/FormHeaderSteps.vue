<template>
    <nav aria-label="Progress">
      <ol role="list" class="divide-y divide-gray-300 rounded-md border border-white md:flex md:divide-y-0">
        <li v-for="(step, stepIdx) in steps" :key="step.name" class="relative md:flex md:flex-1" @click="$emit('goToStep', step.id)">
          <a v-if="step.status === EStepStatus.complete" class="group flex w-full items-center">
            <span class="flex items-center px-6 py-4 text-sm font-medium">
              <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-slate-600">
                <CheckIcon class="h-6 w-6 text-white" aria-hidden="true" />
              </span>
              <span class="ml-4 text-sm font-medium text-slate-600">{{ $t(step.name) }}</span>
            </span>
          </a>
          <a v-else-if="step.status === EStepStatus.current" class="flex items-center px-6 py-4 text-sm font-medium" aria-current="step">
            <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-pink-300">
              <span class="text-pink-300">{{ step.id }}</span>
            </span>
            <span class="ml-4 text-sm font-medium text-pink-300">{{ $t(step.name) }}</span>
          </a>
          <a v-else-if="step.status === EStepStatus.empty" class="group flex items-center">
          <span class="flex items-center px-6 py-4 text-sm font-medium">
            <span class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-300">
              <span class="text-gray-500">{{ step.id }}</span>
            </span>
            <span class="ml-4 text-sm font-medium text-gray-500">{{ $t(step.name) }}</span>
          </span>
        </a>
        </li>
      </ol>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { CheckIcon } from '@heroicons/vue/24/solid'
  import { EStepStatus } from "~/types/add-membership-modal/EStepStatus"
  import { IMembershipStep } from "~/types/add-membership-modal/IMembershipStep"

  interface Props {
    steps: IMembershipStep[];
  }

  defineProps<Props>();
  
  defineEmits<{
    (e: "goToStep", step: number): void;
  }>();

  </script>