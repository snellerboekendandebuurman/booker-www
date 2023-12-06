<template>
  <div>
    <label
      for="reservation_time"
      class="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300"
      >{{ $t("global.fields.reservation_time") }}</label
    >
    <div class="relative">
      <div class="flex justify-between items-center relative">
        <Field name="reservation_time" class="hidden" />
        <VueDatePicker v-model="date" time-picker-inline :format="dateFormat"/>
      </div>
      <ErrorMessage
        name="reservation_time"
        as="p"
        class="dark:text-pink-200 text-pink-400"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const { value: reservationTimeValue } = useField("reservation_time");

const date = ref(new Date());
const dateFormat = 'dd/MM/yyyy HH:mm' 

watch(date, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    reservationTimeValue.value = newValue.toISOString();
  }
});
</script>
