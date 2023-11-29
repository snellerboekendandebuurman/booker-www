import { IBaseModel } from "../base/IBaseModel";

export interface IPlayer extends IBaseModel<IPlayer> {
  fullName: string;
  image: string;
}