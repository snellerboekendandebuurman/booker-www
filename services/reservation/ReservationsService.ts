import makeAutoObservable from "mobx-store-inheritance";
import { TypePromiseApiResponse } from "../response/TypesApiResponseHandler";
import { BaseService } from "../base/BaseService";
import { ParamsBaseApi } from "../base/TypesBaseService";
import {
  ParamsGetPlayers,
  ParamsCreateReservation,
  ParamsCancelReservation,
} from "./TypeReservationsService";
import { IReservationsService } from "./IReservationsService";
import { DataPlayer, DataPlayerPlayer } from "~/models/reservation/DataPlayer";
import { Reservation } from "~/models/reservation/Reservation";
import { Player } from "~/models/reservation/Player";
import { DataReservation } from "~/models/reservation/DataReservation";
import { EReservationStatus } from "~/models/reservation/EReservation";

export class ReservationsService
  extends BaseService
  implements IReservationsService
{
  /**
   * Class that holds all information regarding the Reservations of the application.
   *
   * @remarks
   * This class is a so-called 'service', which (in this case), provides the overall brokers information.
   * The ReservationsService implements the IReservationsService
   *
   */
  static PLAYERS_URL = `api/v1/reservation/search-player/`;
  static RESERVATION_URL = `api/v1/reservation/reservation/`;
  static RESERVATIONS_URL = `api/v1/reservation/reservations/`;
  static RESERVATION_ITEM_URL = `api/v1/reservation/reservation/{reservationTaskId}/`;

  reservations: Reservation[] = [];
  players: Player[] = [];

  selectedPlayer1: Player | null = null;
  selectedPlayer2: Player | null = null;
  selectedPlayer3: Player | null = null;
  selectedPlayer4: Player | null = null;

  sportsTypes: string[] = ["Padel", "Tennis"];

  constructor() {
    super();
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setPlayers(data: DataPlayer[]): void {
    this.players = data.map((data: DataPlayer) => new Player(data));
  }

  setReservations(data: DataReservation[]) {
    this.reservations = data.map(
      (reservationData) => new Reservation(reservationData),
    );
  }

  getReservation(id: number | string): Reservation {
    return this.reservations.find((reservation) => reservation.id === id)!;
  }

  clearPlayers() {
    this.players = [];
  }

  async getPlayers(params: ParamsGetPlayers): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: this.parseUrl({
        url: ReservationsService.PLAYERS_URL,
        queryParams: {
          search_term: params.searchTerm,
          member_account_id: params.membershipId,
        },
      }),
      method: "GET",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
    });
  }

  async getReservations(params: ParamsBaseApi): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: this.parseUrl({
        url: ReservationsService.RESERVATIONS_URL,
      }),
      method: "GET",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
    });
  }

  async createReservation(
    params: ParamsCreateReservation,
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: ReservationsService.RESERVATION_URL,
      method: "POST",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
      body: params.body,
    });
  }

  async cancelReservation(
    params: ParamsCancelReservation,
  ): TypePromiseApiResponse {
    const fetch = useCustomFetch();

    return await fetch.request({
      url: this.parseUrl({
        url: ReservationsService.RESERVATION_ITEM_URL,
        urlParams: { reservationTaskId: params.reservationId },
      }),
      method: "DELETE",
      locale: params.locale,
      accessToken: true,
      refreshToken: true,
    });
  }

  _handleSuccessfullGetPlayers(response: DataPlayerPlayer): DataPlayer[] {
    return response.club_members.map((member) => ({
      id: member.club_member.names[0].name.id,
      fullName: member.club_member.names[0].name.display_name,
      image:
        member.club_member.assets[0]?.avatar.url ||
        "https://images.unsplash.com/photo-1583275478661-1c31970669fa?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    }));
  }

  _handleSuccessfullReservationCreation(apiResponse: DataReservation): void {
    const reservation = new Reservation(apiResponse);

    this.reservations.unshift(reservation);
  }

  _handleSuccesfullReservationCancel(reservationId: number | string): void {
    const reservation = this.getReservation(reservationId);

    reservation.status = EReservationStatus.Canceled;
  }
}

export const reservationsService = new ReservationsService();
