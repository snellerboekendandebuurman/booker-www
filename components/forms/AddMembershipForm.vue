<template>
  <div>
    <FormWizard
      :validation-schema="validationSchema"
      :submit-in-progress="submitInProgress"
      @submit="onSubmit"
      @next-step="nextStep"
      @previous-step="previousStep"
      @close-step="closeStep"
    >
      <FormStep>
        <SelectClientField />
        <SelectAuthenticationMethodField
          @authentication-method-selected="handleAuthenticationMethodSelected"
        />
      </FormStep>

      <FormStep>
        <SelectClubField />
        <ClubNumberField v-if="shouldDisplayField('club')" />
        <AssociationNumberField v-if="shouldDisplayField('association')" />
        <PasswordField v-if="shouldDisplayField('password')" />
      </FormStep>
    </FormWizard>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { object, string, number } from "yup";
import FormWizard from "./components/FormWizard.vue";
import FormStep from "./components/FormStep.vue";
import SelectClientField from "@/components/forms/fields/SelectClientField.vue";
import SelectAuthenticationMethodField from "@/components/forms/fields/SelectAuthenticationMethodField.vue";
import SelectClubField from "@/components/forms/fields/SelectClubField.vue";
import AssociationNumberField from "~/components/forms/fields/AssociationNumberField.vue";
import PasswordField from "~/components/forms/fields/PasswordField.vue";
import ClubNumberField from "~/components/forms/fields/ClubNumberField.vue";
import { AuthenticationMethod } from "~/models/membership/AuthenticationMethod";
import { toastMessageService } from "~/services/response/ToastMessageService";
import { ToastMessage } from "~/models/response/ToastMessage";
import { membershipsService } from "~/services/membership/MembershipsService";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";

const { t } = useI18n();

const { localeProperties } = useI18n();

const emit = defineEmits(["nextStep", "previousStep", "closeStep"]);

const submitInProgress = ref(false);
const selectedAuthenticationMethod: Ref<null | AuthenticationMethod> =
  ref(null);

// break down the validation steps into multiple schemas
const validationSchema = [
  object({
    client_id: number().required(t("global.messages.field_client_id_required")),
    authentication_method_id: number().required(
      t("global.messages.field_authentication_method_id_required"),
    ),
  }),
  object({
    club_id: string().when("client_id", (_, schema) =>
      shouldDisplayFieldBasedOnClient(
        membershipsService.selectedClient?.id || 0,
        "kntlb",
      )
        ? schema.required(t("global.messages.field_club_id_required"))
        : schema,
    ),
    club_name: string(),
    club_image: string(),
    club_number: number().when("authentication_method_id", (_, schema) =>
      shouldDisplayField("club")
        ? schema.required(t("global.messages.field_club_number_required"))
        : schema,
    ),
    association_number: number().when(
      "authentication_method_id",
      (_, schema) =>
        shouldDisplayField("association")
          ? schema.required(
              t("global.messages.field_association_number_required"),
            )
          : schema,
    ),
    password: string().when("authentication_method_id", (_, schema) =>
      shouldDisplayField("password")
        ? schema.required(t("global.messages.field_password_required"))
        : schema,
    ),
  }),
];

const { setErrors } = useForm({
  validationSchema,
});

function handleAuthenticationMethodSelected(
  authenticationMethod: AuthenticationMethod,
) {
  selectedAuthenticationMethod.value = authenticationMethod;
}

function shouldDisplayField(name: string): boolean | undefined {
  return selectedAuthenticationMethod.value?.method.includes(name);
}

function shouldDisplayFieldBasedOnClient(
  clientId: string | number,
  name: string,
): boolean {
  return membershipsService.getClient(clientId)?.name.includes(name) || false;
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

  const response = await membershipsService.createMemberAccount({
    locale: localeProperties.value.iso!,
    body: {
      client_id: values.client_id,
      authentication_method_id: values.authentication_method_id,
      club_id: values.club_id,
      club_name: values.club_name,
      club_image: values.club_image,
      club_number: values.club_number,
      association_number: values.association_number,
      password: values.password,
    },
  });

  submitInProgress.value = false;

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

  membershipsService._handleSuccessfullMembershipCreation(response.data.value);

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
