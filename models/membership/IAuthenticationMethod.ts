import { IBaseModel } from "../base/IBaseModel";

export interface IAuthenticationMethod
  extends IBaseModel<IAuthenticationMethod> {
  method: string;
}
