import { IBaseModel } from "../base/IBaseModel";
import { IMembership } from "../membership/IMembership";
import { EReservationSportsType, EReservationStatus } from "./EReservation";
import { IPlayer } from "./IPlayer";

export interface IReservation extends IBaseModel<IReservation> {
  taskId: string;
  scheduledTime: string;
  reservationTime: string;
  sportType: EReservationSportsType;
  status: EReservationStatus;
  membership: IMembership;
  players: IPlayer[];

  getImage(): string;
  getSportsType(sportsType: string): EReservationSportsType;
  getStatus(status: string): EReservationStatus;
  getFormattedScheduleTime(): string;
  getFormattedReservationTime(): string;
  formatDate(dateString: string): string;
}
