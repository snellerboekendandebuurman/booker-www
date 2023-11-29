import makeAutoObservable from "mobx-store-inheritance";
import { BaseModel } from "../base/BaseModel";
import { DataAuthenticationMethod } from "./DataAuthenticationMethod";
import { IAuthenticationMethod } from "./IAuthenticationMethod";


export class AuthenticationMethod
  // eslint-disable-next-line no-use-before-define
  extends BaseModel<AuthenticationMethod>
  implements IAuthenticationMethod
{
  /**
   * Class that acts like an object, which contains all the information regarding an Authentication Method.
   *
   * @remarks
   * This class is a so-called 'model', which purpose is to represent the data for an Authentication Method.
   * an Authentication Method holds information regarding how the 'client' can be logged-in.
   * The Authenticatin Method extends the BaseModel model and implements an interface called IAuthenticationMethod.
   *
   * @param DataAuthenticationMethod - That contains the following: id & method
   * @returns The implemented model of an Authentication Method which can be used throughout the codebase in order to represent Device and/or Session information.
   *
   */
  method: string;

  constructor(data: DataAuthenticationMethod) {
    super(data);
    makeAutoObservable(this);
    const mappedData = this.mapResponseKeys(data);
    this.method = mappedData.method || "";
    }
}