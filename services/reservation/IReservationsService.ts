import { ParamsBaseApi } from "../base/TypesBaseService";
import { TypePromiseApiResponse } from "../response/TypesApiResponseHandler";
import {
  ParamsCancelReservation,
  ParamsCreateReservation,
  ParamsGetPlayers,
} from "./TypeReservationsService";
import { IReservation } from "~/models/reservation/IReservation";
import { IPlayer } from "~/models/reservation/IPlayer";
import { DataPlayer, DataPlayerPlayer } from "~/models/reservation/DataPlayer";
import { DataReservation } from "~/models/reservation/DataReservation";

export interface IReservationsService {
  reservations: IReservation[];
  players: IPlayer[];

  selectedPlayer1: IPlayer | null;
  selectedPlayer2: IPlayer | null;
  selectedPlayer3: IPlayer | null;
  selectedPlayer4: IPlayer | null;

  sportsTypes: string[];

  setPlayers(data: DataPlayer[]): void;
  getPlayers(params: ParamsBaseApi): TypePromiseApiResponse;
  clearPlayers(): void;

  setReservations(data: DataReservation[]): void;
  getReservation(id: number | string): IReservation;

  getPlayers(params: ParamsGetPlayers): TypePromiseApiResponse;

  getReservations(params: ParamsBaseApi): TypePromiseApiResponse;

  createReservation(params: ParamsCreateReservation): TypePromiseApiResponse;
  cancelReservation(params: ParamsCancelReservation): TypePromiseApiResponse;

  _handleSuccessfullGetPlayers(response: DataPlayerPlayer): DataPlayer[];
  _handleSuccessfullReservationCreation(apiResponse: DataReservation): void;
  _handleSuccesfullReservationCancel(reservationId: number | string): void;
}
