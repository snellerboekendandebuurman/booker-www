import makeAutoObservable from "mobx-store-inheritance";
import { ParamsBaseApi } from "../base/TypesBaseService";
import { TypePromiseApiResponse } from "../response/TypesApiResponseHandler";
import { BaseService } from "../base/BaseService";
import { IMembershipsService } from "./IMembershipsService";
import {
  ParamsGetClubs,
  ParamsPostMemberAccount,
  ApiResponseMembership,
  ParamsDeleteMembership,
} from "./TypeMembershipsService";
import { DataClient } from "~/models/membership/DataClient";
import { DataClubClub } from "~/models/membership/DataClub";
import { DataMembership } from "~/models/membership/DataMembership";
import { Client } from "~/models/membership/Client";
import { Club } from "~/models/membership/Club";
import { Membership } from "~/models/membership/Membership";
import { IAuthenticationMethod } from "~/models/membership/IAuthenticationMethod";

export class MembershipsService
  extends BaseService
  implements IMembershipsService
{
  /**
   * Class that holds all information regarding the Memberships of the application.
   *
   * @remarks
   * This class is a so-called 'service', which (in this case), provides the overall brokers information.
   * The MembershipsService implements the IMembershipsService
   *
   */
  static CLIENTS_URL = `api/v1/member/clients/`;
  static CLUBS_URL = `api/v1/member/search-club/`;
  static MEMBER_ACCOUNT_URL = `api/v1/member/account/`;
  static MEMBER_ACCOUNT_ITEM_URL = `api/v1/member/account/{membershipId}/`;
  static MEMBER_ACCOUNTS_URL = `api/v1/member/accounts/`;

  clients: Client[] = [
    new Client({
      id: 0,
      name: "Select a Client",
      image: "",
      authentiationMethods: [],
    }),
  ];

  selectedClient: Client | null = null;

  clubs: Club[] = [];
  selectedClub: Club | null = null;

  memberships: Membership[] = [];
  selectedMembership: Membership | null = null;

  constructor() {
    super();
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setClients(data: DataClient[]) {
    this.clients = data.map((membershipData) => new Client(membershipData));
  }

  getClient(id: number | string): Client {
    return this.clients.find((client) => client.id === id)!;
  }

  setClubs(data: DataClubClub[]) {
    this.clubs = data.map((clubData) => new Club(clubData.club));
  }

  clearClubs() {
    this.clubs = [];
  }

  getAuthenticationMethod(
    clientId: number | string,
    authenticationMethodId: number | string,
  ): IAuthenticationMethod {
    const client = this.getClient(clientId);

    return client.authenticationMethods.find(
      (authenticationMethod) =>
        authenticationMethod.id === authenticationMethodId,
    )!;
  }

  setMemberships(data: DataMembership[]) {
    this.memberships = data.map(
      (membershipData) => new Membership(membershipData),
    );
  }

  getMembership(id: number | string): Membership {
    return this.memberships.find((membership) => membership.id === id)!;
  }

  setSelectedMembership(membership: Membership): void {
    this.selectedMembership = membership;
  }

  async getClients(params: ParamsBaseApi): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: MembershipsService.CLIENTS_URL,
      method: "GET",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
    });
  }

  async getClubs(params: ParamsGetClubs): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: this.parseUrl({
        url: MembershipsService.CLUBS_URL,
        queryParams: { search_term: params.searchTerm },
      }),
      method: "GET",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
    });
  }

  async createMemberAccount(
    params: ParamsPostMemberAccount,
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: MembershipsService.MEMBER_ACCOUNT_URL,
      method: "POST",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
      body: params.body,
    });
  }

  async getMemberships(params: ParamsBaseApi): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: MembershipsService.MEMBER_ACCOUNTS_URL,
      method: "GET",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
    });
  }

  async deleteMembership(
    params: ParamsDeleteMembership,
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: this.parseUrl({
        url: MembershipsService.MEMBER_ACCOUNT_ITEM_URL,
        urlParams: { membershipId: params.membershipId },
      }),
      method: "DELETE",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
    });
  }

  _handleSuccessfullMembershipCreation(apiResponse: ApiResponseMembership) {
    const membership = new Membership(apiResponse);

    this.memberships.unshift(membership);
  }

  _handleSuccesfullMembershipDeletion(membershipId: number | string) {
    const membershipIndex = this.memberships.findIndex(
      (membership) => membership.id === membershipId,
    );

    // Remove the membership from the list
    this.memberships.splice(membershipIndex, 1);
  }
}

export const membershipsService = new MembershipsService();
