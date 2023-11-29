import { ParamsBaseApi } from "../base/TypesBaseService";

// PARAMETER INPUT PART
export interface ParamsGetPlayers extends ParamsBaseApi {
    searchTerm: string;
    membershipId: string | number;
}

export interface ParamsCreateReservation extends ParamsBaseApi {
    body: {
        member_account_id: number,
        sport_type: string,
        players: [
            {
                id: string,
                full_name: string
            },
            {
                id: string,
                full_name: string
            },
            {
                id?: string,
                full_name?: string
            },
            {
                id?: string,
                full_name?: string
            }
        ],
        scheduled_time: Date,
        reservation_time: Date
    }
}

export interface ParamsCancelReservation extends ParamsBaseApi {
    reservationId: number | string;
}
