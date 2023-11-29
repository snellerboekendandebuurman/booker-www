import { IBaseModel } from "../base/IBaseModel";
import { IAuthenticationMethod } from "./IAuthenticationMethod";

export interface IClub extends IBaseModel<IClub> {
  name: string;
  image: string;
}