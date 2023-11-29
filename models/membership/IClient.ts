import { IBaseModel } from "../base/IBaseModel";
import { IAuthenticationMethod } from "./IAuthenticationMethod";

export interface IClient extends IBaseModel<IClient> {
  name: string;
  image: string;
  authenticationMethods: IAuthenticationMethod[];
}