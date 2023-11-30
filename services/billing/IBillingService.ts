import { ParamsBaseApi } from "../base/TypesBaseService";
import { TypePromiseApiResponse } from "../response/TypesApiResponseHandler";

export interface IBillingService {
  getStripeSetupIntent(params: ParamsBaseApi): TypePromiseApiResponse;
  getStripeBillingPortal(params: ParamsBaseApi): TypePromiseApiResponse;
}
