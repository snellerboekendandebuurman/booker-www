<template>
  <div>
    <label for="club_number" class="block text-sm font-medium leading-6 text-slate-700 dark:text-slate-300">{{
      $t("global.fields.club_number")
    }}</label>
    <div class="mt-1">
      <Field
        name="club_number"
        label="club number"
        type="text"
        autocomplete="off"
        class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-inset focus:ring-pink-400 sm:text-sm sm:leading-6 text-slate-700 dark:text-slate-300"
      />
      <ErrorMessage
        name="club_number"
        as="p"
        class="dark:text-pink-200 text-pink-400"
      />
    </div>
  </div>
</template>
