import makeAutoObservable from "mobx-store-inheritance";
import { BaseModel } from "../base/BaseModel";
import { DataPlayer } from "./DataPlayer";
import { IPlayer } from "./IPlayer";

export class Player
  // eslint-disable-next-line no-use-before-define
  extends BaseModel<Player>
  implements IPlayer
{
  /**
   * Class that acts like an object, which contains all the information regarding a Player.
   *
   * @remarks
   * This class is a so-called 'model', which purpose is to represent the data for a Player.
   * A Player basically holds information regarding; the fullName & image.
   * The Player extends the BaseModel model and implements an interface called IPlayer.
   *
   * @param DataPlayer - That contains the following: id, fullName, image, @param DataPlayer
   * @returns The implemented model of a Player which can be used throughout the codebase.
   *
   */
  fullName: string;
  image: string;

  constructor(data: DataPlayer) {
    super(data);
    makeAutoObservable(this);
    const mappedData = this.mapResponseKeys(data);
    this.fullName = mappedData.fullName || "";
    this.image = mappedData.image || "";
  }
}