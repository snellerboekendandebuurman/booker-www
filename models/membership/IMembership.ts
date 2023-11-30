import { IBaseModel } from "../base/IBaseModel";
import { IAuthenticationMethod } from "./IAuthenticationMethod";
import { IClient } from "./IClient";
import { IClub } from "./IClub";

export interface IMembership extends IBaseModel<IMembership> {
  club: IClub;
  clubNumber: string;
  associationNumber: string;
  authenticationMethod: IAuthenticationMethod;
  client: IClient;
}
