import { ParamsBaseApi } from "../base/TypesBaseService";

// PARAMETER INPUT PART
export interface ParamsGetClubs extends ParamsBaseApi {
  searchTerm: string;
}

export interface ParamsPostMemberAccount extends ParamsBaseApi {
  body: {
    client_id: number;
    authentication_method_id: number;
    club_id: string;
    club_name: string;
    club_image: string;
    club_number: number;
    association_number: string;
    password: string;
  };
}

export interface ParamsDeleteMembership extends ParamsBaseApi {
  membershipId: number | string;
}

// API RESPONSE PART
export interface ApiResponseMembership {
  id: number;
  club: {
    id: string;
    name: string;
    image: string;
  };
  club_number: number | null;
  association_number: number | null;
  authentication_method: {
    id: number;
    method: string;
  };
  client: {
    id: number;
    name: string;
    image: string;
    authentication_methods: [
      {
        id: number;
        method: string;
      },
      {
        id: number;
        method: string;
      },
    ];
  };
}
