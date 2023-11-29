import { DataBaseModel } from "../base/DataBaseModel";
import { DataMembership } from "../membership/DataMembership";
import { DataPlayerApi } from "./DataPlayer";

export interface DataReservation extends DataBaseModel {
    players: DataPlayerApi[],
    task_id: string,
    scheduled_time: string,
    reservation_time: string,
    sport_type: string,
    status: string,
    member_account: DataMembership,
}