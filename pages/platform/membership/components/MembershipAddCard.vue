<template>
<li class="flex flex-col divide-y divide-gray-200 rounded-lg bg-pink-100 shadow justify-center items-center text-center cursor-pointer hover:border hover:border-2 hover:border-gray-200 hover:dark:border-gray-900 hover:bg-pink-200 text-slate-700 hover:text-slate-800" @click="$emit('toggleModal')">
    <component
        :is="PlusIcon"
        class="h-32 w-32 flex-shrink-0 rounded-full my-6"
        aria-hidden="true"
    />
    <div class="flex items-center justify-center py-2">
        {{ $t("platform.memberships.add_membership") }}
        <UserIcon class="ml-2 h-7 w-7" aria-hidden="true" />
    </div>
</li>
</template>

<script setup lang="ts">
import {
  UserIcon,
} from "@heroicons/vue/24/outline";
import { PlusIcon } from '@heroicons/vue/20/solid'

defineEmits<{
    (e: "toggleModal"): void;
  }>();
</script>
