import { IBaseModel } from "../base/IBaseModel";

export interface IClub extends IBaseModel<IClub> {
  name: string;
  image: string;
}
