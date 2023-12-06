<template>
  <form @submit="onSubmit">
    <slot />

    <div class="mt-8 md:mt-12 flex justify-between">
      <BaseButton
        v-if="hasPrevious"
        type="button"
        :button-theme="themeButtonService.getThemeButtonById(5)"
        @click="goToPrev"
      >
        {{ $t("global.previous") }}
      </BaseButton>
      <BaseButton
        v-else-if="!hasPrevious"
        type="button"
        :button-theme="themeButtonService.getThemeButtonById(5)"
        @click="goCloseStep"
      >
        {{ $t("global.close") }}
      </BaseButton>
      <div v-if="!hasPrevious" class="flex-grow"></div>
      <BaseButton
        v-if="!isLastStep"
        type="button"
        :button-theme="themeButtonService.getThemeButtonById(8)"
        @click="onSubmit"
        >{{ $t("global.next") }}</BaseButton
      >
      <!-- <BaseButton
        v-else
        :button-theme="themeButtonService.getThemeButtonById(8)"
        >{{ $t("global.save") }}</BaseButton
      > -->
      <BaseButton
        v-else
        :button-theme="themeButtonService.getThemeButtonById(8)"
        :disabled="submitInProgress"
      >
        <BaseSpinnerSmall
          :submit-in-progress="submitInProgress"
          spinner-text="global.saving"
          button-text="global.save"
        />
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { ref, computed, provide } from "vue";

import { themeButtonService } from "~/services/theme/ThemeButtonService";

import BaseButton from "@/components/base/BaseButton.vue";

const props = defineProps({
  validationSchema: {
    type: Array,
    required: true,
  },
  submitInProgress: Boolean
});

const emit = defineEmits(["submit", "nextStep", "previousStep", "closeStep"]);
const currentStepIdx = ref(0);

// Injects the starting step, child <form-steps> will use this to generate their ids
const stepCounter = ref(0);
provide("STEP_COUNTER", stepCounter);

// Inject the live ref of the current index to child components
// will be used to toggle each form-step visibility
provide("CURRENT_STEP_INDEX", currentStepIdx);

// if this is the last step
const isLastStep = computed(() => {
  return currentStepIdx.value === stepCounter.value - 1;
});

// If the `previous` button should appear
const hasPrevious = computed(() => {
  return currentStepIdx.value > 0;
});

// extracts the indivdual step schema
const currentSchema = computed(() => {
  return props.validationSchema[currentStepIdx.value];
});

const { handleSubmit } = useForm({
  // vee-validate will be aware of computed schema changes
  validationSchema: currentSchema,
  // turn this on so each step values won't get removed when you move back or to the next step
  keepValuesOnUnmount: true,
});

const onSubmit = handleSubmit((values) => {
  if (!isLastStep.value) {
    currentStepIdx.value++;
    emit("nextStep", currentStepIdx.value);
    return;
  }

  // Let the parent know the form was filled across all steps
  emit("submit", values);
});

function goToPrev() {
  if (currentStepIdx.value === 0) {
    return;
  }

  currentStepIdx.value--;
  emit("previousStep", currentStepIdx.value);
}

function goCloseStep() {
  emit("closeStep");
}
</script>
