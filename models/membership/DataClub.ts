import { DataBaseModel } from "../base/DataBaseModel";

export interface DataClub extends DataBaseModel {
  name: string;
  logoUrl?: string;
  image?: string;
}

export interface DataClubClub {
  club: DataClub;
}
