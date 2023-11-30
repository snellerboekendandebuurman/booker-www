import makeAutoObservable from "mobx-store-inheritance";
import { BaseModel } from "../base/BaseModel";
import { AuthenticationMethod } from "./AuthenticationMethod";
import { DataClient } from "./DataClient";
import { IClient } from "./IClient";

export class Client
  // eslint-disable-next-line no-use-before-define
  extends BaseModel<Client>
  implements IClient
{
  /**
   * Class that acts like an object, which contains all the information regarding a Client.
   *
   * @remarks
   * This class is a so-called 'model', which purpose is to represent the data for a Client.
   * A Client basically holds information regarding; the name, image & Authentication Methods.
   * The Client extends the BaseModel model and implements an interface called IClient.
   *
   * @param DataClient - That contains the following: id, name, image and a list of Authentication Methods
   * @returns The implemented model of a Client.
   *
   */
  name: string;
  image: string;
  authenticationMethods: AuthenticationMethod[];

  constructor(data: DataClient) {
    super(data);
    makeAutoObservable(this);
    const mappedData = this.mapResponseKeys(data);
    this.name = mappedData.name || "";
    this.image = mappedData.image || "";
    this.authenticationMethods =
      mappedData.authenticationMethods?.map(
        (authenticationMethodData) =>
          new AuthenticationMethod(authenticationMethodData),
      ) || [];
  }
}
