import makeAutoObservable from "mobx-store-inheritance";
import { ParamsBaseApi } from "../base/TypesBaseService";
import { TypePromiseApiResponse } from "../response/TypesApiResponseHandler";
import { BaseService } from "../base/BaseService";
import { IBillingService } from "./IBillingService";

export class BillingService extends BaseService implements IBillingService {
  /**
   * Class that holds all information regarding Billing.
   *
   * @remarks
   * This class is a so-called 'service', which (in this case), provides the overall tier, pricing & intervals information.
   * The ProductsService implements the IProductsService
   *
   */
  static CREATE_STRIPE_SETUP_INTENT = `api/v1/billing/setup-intent/`;
  static CREATE_STRIPE_BILLING_PORTAL = `api/v1/billing/portal/`;

  constructor() {
    super();
    makeAutoObservable(this, {}, { autoBind: true });
  }

  async getStripeSetupIntent(params: ParamsBaseApi): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: BillingService.CREATE_STRIPE_SETUP_INTENT,
      method: "GET",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
    });
  }

  async getStripeBillingPortal(params: ParamsBaseApi): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: BillingService.CREATE_STRIPE_BILLING_PORTAL,
      method: "GET",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
    });
  }
}

export const billingService = new BillingService();
