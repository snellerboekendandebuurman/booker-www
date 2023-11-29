import { DataBaseModel } from "../base/DataBaseModel";

export interface DataClubClub {
  club: DataClub
}

export interface DataClub extends DataBaseModel {
    name: string;
    logoUrl?: string;
    image?: string;
}