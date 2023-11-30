import { DataBaseModel } from "../base/DataBaseModel";
import { DataAuthenticationMethod } from "./DataAuthenticationMethod";

export interface DataClient extends DataBaseModel {
  name: string;
  image: string;
  authentiationMethods: DataAuthenticationMethod[];
}
