<template>
  <div class="flex h-screen">
    <div class="flex flex-1 flex-col">
      <div class="ml-2">
        <ButtonLogout />
      </div>
      <Observer>
        <PricingInfo>
          <BaseButton
            :button-theme="themeButtonService.getThemeButtonById(8)"
            @click="createStripeSetupIntent"
          >
            <BaseSpinnerSmall
              :submit-in-progress="submitInProgress"
              spinner-text="platform.billing.setting_up_payment_intent"
              button-text="platform.billing.setup_payment_intent"
            />
          </BaseButton>
        </PricingInfo>
      </Observer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ButtonLogout from "./components/ButtonLogout.vue";
import PricingInfo from "./components/PricingInfo.vue";

import { billingService } from "~/services/billing/BillingService";
import { apiResponseHandlerService } from "~/services/response/ApiResponseHandlerService";
import { EApiResponseStatus } from "~/services/response/EApiResponseHandler";
import { ToastMessage } from "~/models/response/ToastMessage";
import { toastMessageService } from "~/services/response/ToastMessageService";
import { themeButtonService } from "~/services/theme/ThemeButtonService";

const { localeProperties } = useI18n();

const submitInProgress = ref(false);

async function createStripeSetupIntent() {
  submitInProgress.value = true;

  const response = await billingService.getStripeSetupIntent({
    locale: localeProperties.value.iso!,
  });
  submitInProgress.value = false;

  const message = apiResponseHandlerService.handleResponse(response);

  // Unable to create a Stripe session
  if (message.status !== EApiResponseStatus.success) {
    toastMessageService.addToast(
      new ToastMessage({
        id: Math.random(),
        title: message.title,
        message: message.message,
        status: message.status,
      }),
    );
    if (
      response.error.value!.status === 401 ||
      response.error.value!.status === 403
    ) {
      return navigateTo({
        path: localePath("/auth/login"),
      });
    }
    return;
  }

  // Redirect user to Stripe Setup Intent page
  navigateTo(response.data.value.setup_intent_url, { external: true });
}

definePageMeta({
  layout: "auth",
  middleware: ["check-logged-in-user-tokens"],
});
</script>
