import { DataBaseModel } from "../base/DataBaseModel";

export interface DataMembership extends DataBaseModel {
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
