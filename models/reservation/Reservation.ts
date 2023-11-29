import makeAutoObservable from "mobx-store-inheritance";
import { BaseModel } from "../base/BaseModel";
import { Player } from "./Player"
import { DataReservation } from "./DataReservation";
import { IReservation } from "./IReservation";
import { EReservationSportsType, EReservationStatus } from "./EReservation";
import { Membership } from "../membership/Membership";

export class Reservation
  // eslint-disable-next-line no-use-before-define
  extends BaseModel<Reservation>
  implements IReservation
{
  /**
   * Class that acts like an object, which contains all the information regarding a Reservation.
   *
   * @remarks
   * This class is a so-called 'model', which purpose is to represent the data for a Reservation.
   * A reservation basically holds information regarding; the id, players, task_id, schedule time, reservation time, sports type and the status.
   * The Reservation extends the BaseModel model and implements an interface called IReservation.
   *
   * @param DataReservation - That contains the following: id, name, @param DataReservation
   * @returns The implemented model of a Reservation which can be used throughout the codebase in order to represent Reservation.
   *
   */
  taskId: string;
  scheduledTime: string;
  reservationTime: string;
  sportType: EReservationSportsType;
  status: EReservationStatus;
  membership: Membership;
  players: Player[];


  constructor(data: DataReservation) {
    super(data);
    makeAutoObservable(this);
    const mappedData = this.mapResponseKeys(data);
    this.taskId = mappedData.taskId!;
    this.scheduledTime = new Date(mappedData.scheduledTime!).toISOString();
    this.reservationTime = new Date(mappedData.reservationTime!).toISOString();
    this.sportType = this.getSportsType(mappedData.sportType!);
    this.status = this.getStatus(mappedData.status!);
    this.membership = new Membership(mappedData.memberAccount!);
    this.players =
        mappedData.players?.map((player) => new Player(player)) || [];
    }

    getImage(): string {
      if (this.sportType === EReservationSportsType.Padel) {
        return "https://images.unsplash.com/photo-1612534847738-b3af9bc31f0c?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }

      return "https://plus.unsplash.com/premium_photo-1663011107235-7cdc458bce48?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }

    getSportsType(sportsType: string): EReservationSportsType {
        return this.sportType = EReservationSportsType[sportsType as keyof typeof EReservationSportsType];
    }

    getStatus(status: string): EReservationStatus {
      return EReservationStatus[status as keyof typeof EReservationStatus];
    }

    getFormattedScheduleTime() {
      return this.formatDate(this.scheduledTime)
    }

    getFormattedReservationTime() {
      return this.formatDate(this.reservationTime)
    }

    formatDate(dateString: string) {
      const date = new Date(dateString);
  
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
      const dayOfWeek = days[date.getDay()];
      const dayOfMonth = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
  
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
  
      return `${dayOfWeek} - ${dayOfMonth} ${month} ${year} @ ${hours}:${minutes}`;
  }
}