import makeAutoObservable from "mobx-store-inheritance";
import { BaseModel } from "../base/BaseModel";
import { AuthenticationMethod } from "./AuthenticationMethod";
import { DataMembership } from "./DataMembership";
import { IMembership } from "./IMembership";
import { Club } from "./Club";
import { Client } from "./Client";

export class Membership
  // eslint-disable-next-line no-use-before-define
  extends BaseModel<Membership>
  implements IMembership
{
  /**
   * Class that acts like an object, which contains all the information regarding a Membership.
   *
   * @remarks
   * This class is a so-called 'model', which purpose is to represent the data for a Membership.
   * A Membership basically holds information regarding; id, club, authentication methods, client and club number or association number.
   * The Membership extends the BaseModel model and implements an interface called IMembership.
   *
   * @param Membership - That contains the following: id, club, club number, association number, authentication method & client.
   * @returns The implemented model of a Membership which can be used throughout the codebase.
   *
   */
  club: Club;
  clubNumber: string;
  associationNumber: string;
  authenticationMethod: AuthenticationMethod;
  client: Client;

  constructor(data: DataMembership) {
    super(data);
    makeAutoObservable(this);
    const mappedData = this.mapResponseKeys(data);
    this.clubNumber = mappedData.clubNumber || "";
    this.associationNumber = mappedData.associationNumber || "";
    this.club = new Club(mappedData.club!);
    this.authenticationMethod = new AuthenticationMethod(
      mappedData.authenticationMethod!,
    );
    this.client = new Client(mappedData.client!);
  }
}
