import { Reservation } from "./Reservation";

export interface ReservationRepositoryInterface {
    save(reservation: Reservation): Promise<Reservation>
    list(): Promise<Reservation[]>
}