import makeAutoObservable from "mobx-store-inheritance";
import { BaseModel } from "../base/BaseModel";
import { DataClub } from "./DataClub";
import { IClub } from "./IClub";

export class Club
  // eslint-disable-next-line no-use-before-define
  extends BaseModel<Club>
  implements IClub
{
  /**
   * Class that acts like an object, which contains all the information regarding a Club.
   *
   * @remarks
   * This class is a so-called 'model', which purpose is to represent the data for a Club.
   * A Club basically holds information regarding; the name, image, info & Sessions.
   * The Club extends the BaseModel model and implements an interface called IClub.
   *
   * @param DataClub - That contains the following: id, name & image, @param DataDevice
   * @returns The implemented model of a Club which can be used throughout the codebase.
   *
   */
  name: string;
  image: string;

  constructor(data: DataClub) {
    super(data);
    makeAutoObservable(this);
    const mappedData = this.mapResponseKeys(data);
    this.name = mappedData.name || "";
    this.image =
      mappedData.logoUrl ||
      mappedData.image ||
      "https://images.unsplash.com/photo-1573294184805-e3044b161ace";
  }
}
