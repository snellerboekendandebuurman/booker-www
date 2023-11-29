import { IClient } from "~/models/membership/IClient";
import { ParamsBaseApi } from "../base/TypesBaseService";
import { TypePromiseApiResponse } from "../response/TypesApiResponseHandler";
import { IClub } from "~/models/membership/IClub";
import { IMembership } from "~/models/membership/IMembership";
import { DataClient } from "~/models/membership/DataClient";
import { DataClubClub } from "~/models/membership/DataClub";
import { IAuthenticationMethod } from "~/models/membership/IAuthenticationMethod";
import { DataMembership } from "~/models/membership/DataMembership";
import { ApiResponseMembership, ParamsDeleteMembership, ParamsGetClubs, ParamsPostMemberAccount } from "./TypeMembershipsService";

export interface IMembershipsService {
    clients: IClient[];
    selectedClient: IClient | null;

    clubs: IClub[];
    selectedClub: IClub | null;

    memberships: IMembership[];
    selectedMembership: IMembership | null;

    setClients(data: DataClient[]): void
    getClients(params: ParamsBaseApi): TypePromiseApiResponse;

    setClubs(data: DataClubClub[]): void;
    clearClubs(): void;

    getAuthenticationMethod(clientId: number | string, authentiationMethodId: number | string): IAuthenticationMethod;

    setMemberships(data: DataMembership[]): void;
    getMembership(id: number | string): IMembership;
    setSelectedMembership(membership: IMembership): void;

    getClients(params: ParamsBaseApi): TypePromiseApiResponse;
    getClubs(params: ParamsGetClubs): TypePromiseApiResponse;
    createMemberAccount(params: ParamsPostMemberAccount): TypePromiseApiResponse;
    getMemberships(params: ParamsBaseApi): TypePromiseApiResponse;
    deleteMembership(params: ParamsDeleteMembership): TypePromiseApiResponse;
    
    _handleSuccessfullMembershipCreation(apiResponse: ApiResponseMembership): void;
    _handleSuccesfullMembershipDeletion(membershipId: number | string): void;
}