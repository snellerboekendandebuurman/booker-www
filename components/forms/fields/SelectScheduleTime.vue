<template>
  <div>
    <label
      for="schedule_time"
      class="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300"
      >{{ $t("global.fields.schedule_time") }}</label
    >
    <div class="flex mt-1 justify-between items-center relative">
      <Field name="schedule_time" class="hidden" />
      <VueDatePicker v-model="date" time-picker-inline :format="dateFormat"/>
      <ErrorMessage
        name="schedule_time"
        as="p"
        class="dark:text-pink-200 text-pink-400"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const { value: scheduleTimeValue } = useField("schedule_time");

const date = ref(new Date());
const dateFormat = 'dd/MM/yyyy HH:mm' 

watch(date, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    scheduleTimeValue.value = newValue.toISOString();
  }
});
</script>
