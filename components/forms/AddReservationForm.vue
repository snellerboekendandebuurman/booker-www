<template>
  <div>
    <FormWizard
      :validation-schema="validationSchema"
      @submit="onSubmit"
      @next-step="nextStep"
      @previous-step="previousStep"
      @close-step="closeStep"
    >
      <FormStep>
        <SelectMembershipField />
        <SelectSportsField @sports-type-selected="handleSportsTypeSelected" />
      </FormStep>

      <FormStep>
        <SelectPlayerField1 />
        <SelectPlayerField2 />
        <SelectPlayerField3 />
        <SelectPlayerField4 />
      </FormStep>

      <FormStep>
        <SelectScheduleTime />
        <SelectReservationTime />
      </FormStep>
    </FormWizard>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { object, string, number, date } from "yup";
import FormWizard from "./components/FormWizard.vue";
import FormStep from "./components/FormStep.vue";
import SelectMembershipField from "@/components/forms/fields/SelectMembershipField.vue";
import SelectSportsField from "@/components/forms/fields/SelectSportsField.vue";
import SelectPlayerField1 from "@/components/forms/fields/SelectPlayerField1.vue";
import SelectPlayerField2 from "@/components/forms/fields/SelectPlayerField2.vue";
import SelectPlayerField3 from "@/components/forms/fields/SelectPlayerField3.vue";
import SelectPlayerField4 from "@/components/forms/fields/SelectPlayerField4.vue";
import SelectReservationTime from "@/components/forms/fields/SelectReservationTime.vue";
import SelectScheduleTime from "@/components/forms/fields/SelectScheduleTime.vue";
import { AuthenticationMethod } from "~/models/membership/AuthenticationMethod";
import { toastMessageService } from "~/services/response/ToastMessageService";
import { ToastMessage } from "~/models/response/ToastMessage";
import { reservationsService } from "~/services/reservation/ReservationsService";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";

const { t } = useI18n();

const { localeProperties } = useI18n();

const emit = defineEmits(["nextStep", "previousStep", "closeStep"]);

const submitInProgress = ref(false);
const selectedMembership: Ref<null | AuthenticationMethod> = ref(null);

const arePlayerIdsUnique = (playerIds: string[]) => {
  const filteredIds = playerIds.filter((id) => id !== undefined && id !== "");
  return new Set(filteredIds).size === filteredIds.length;
};

// break down the validation steps into multiple schemas
const validationSchema = [
  object({
    membership_id: number().required(
      t("global.messages.field_membership_id_required"),
    ),
    sports_type: string().required(
      t("global.messages.field_sports_type_required"),
    ),
  }),
  object({
    player_1_id: string()
      .test(
        "unique-player-1-id",
        t("global.messages.player_1_unique"),
        function (value) {
          const {
            player_2_id: Player2ID,
            player_3_id: player3ID,
            player_4_id: player4ID,
          } = this.parent;
          return !(
            value === Player2ID ||
            value === player3ID ||
            value === player4ID
          );
        },
      )
      .when("sports_type", (sportsType, schema) =>
        playerFieldIsRequired(sportsType[0], 1)
          ? schema.required(t("global.messages.player_1_required"))
          : schema,
      ),
    player_1_full_name: string(),
    player_2_id: string()
      .test(
        "unique-player-2-id",
        t("global.messages.player_2_unique"),
        function (value) {
          const {
            player_1_id: player1ID,
            player_3_id: player3ID,
            player_4_id: player4ID,
          } = this.parent;
          return !(
            value === player1ID ||
            value === player3ID ||
            value === player4ID
          );
        },
      )
      .when("sports_type", (sportsType, schema) =>
        playerFieldIsRequired(sportsType[0], 2)
          ? schema.required(t("global.messages.player_2_required"))
          : schema,
      ),
    player_2_full_name: string(),
    player_3_id: string()
      .when("sports_type", (sportsType, schema) =>
        playerFieldIsRequired(sportsType[0], 3)
          ? schema.required(t("global.messages.player_3_required"))
          : schema,
      )
      .test(
        "unique-player-3-id",
        t("global.messages.player_3_unique"),
        function (value) {
          const {
            player_1_id: player1ID,
            player_2_id: player2ID,
            player_4_id: player4ID,
          } = this.parent;
          return arePlayerIdsUnique([player1ID, player2ID, value, player4ID]);
        },
      ),
    player_3_full_name: string(),
    player_4_id: string()
      .when("sports_type", (sportsType, schema) =>
        playerFieldIsRequired(sportsType[0], 4)
          ? schema.required(t("global.messages.player_4_required"))
          : schema,
      )
      .test(
        "unique-player-4-id",
        t("global.messages.player_4_unique"),
        function (value) {
          const {
            player_1_id: player1ID,
            player_2_id: player2ID,
            player_3_id: player3ID,
          } = this.parent;
          return arePlayerIdsUnique([player1ID, player2ID, value, player3ID]);
        },
      ),
    player_4_full_name: string(),
  }),
  object({
    schedule_time: date().required(t("global.messages.schedule_date_required")),
    reservation_time: date()
      .required(t("global.messages.reservation_date_required"))
      .test(
        "is-later-than-schedule-time",
        t("global.messages.reservation_date_future"),
        function (value) {
          const { schedule_time: scheduleTime } = this.parent;
          return scheduleTime && value && value > scheduleTime;
        },
      ),
  }),
];

const { setErrors } = useForm({
  validationSchema,
});

function handleSportsTypeSelected(authenticationMethod: AuthenticationMethod) {
  selectedMembership.value = authenticationMethod;
}

function playerFieldIsRequired(sports: string, playerNumber: number): boolean {
  if (sports === "undefined") {
    return false;
  }
  if (sports.toLowerCase() === "padel") {
    return true;
  }

  if (sports.toLowerCase() === "tennis" && playerNumber <= 2) {
    return true;
  }

  return false;
}

function nextStep(step: number) {
  emit("nextStep", step);
}

function previousStep(step: number) {
  emit("previousStep", step);
}

function closeStep() {
  emit("closeStep");
}

async function onSubmit(values: any) {
  submitInProgress.value = true;

  const players = [
    {
      id: values.player_1_id,
      full_name: values.player_1_full_name,
    },
    {
      id: values.player_2_id,
      full_name: values.player_2_full_name,
    },
  ];

  if (values.player_3_id && values.player_3_full_name) {
    players.push({
      id: values.player_3_id,
      full_name: values.player_3_full_name,
    });
  }

  if (values.player_4_id && values.player_4_full_name) {
    players.push({
      id: values.player_4_id,
      full_name: values.player_4_full_name,
    });
  }

  const response = await reservationsService.createReservation({
    locale: localeProperties.value.iso!,
    body: {
      member_account_id: values.membership_id,
      sport_type: values.sports_type,
      players,
      scheduled_time: values.schedule_time,
      reservation_time: values.reservation_time,
    },
  });

  if (response.error.value && response.error.value.data) {
    setErrors(response.error.value.data);
  }

  const message = apiResponseHandlerService.handleResponse(response);

  if (message.status !== EApiResponseStatus.success) {
    toastMessageService.addToast(
      new ToastMessage({
        id: Math.random(),
        title: message.title,
        message: message.message,
        status: message.status,
      }),
    );

    return;
  }

  reservationsService._handleSuccessfullReservationCreation(
    response.data.value,
  );

  emit("closeStep");

  toastMessageService.addToast(
    new ToastMessage({
      id: Math.random(),
      title: message.title,
      message: message.message,
      status: message.status,
    }),
  );
}
</script>
