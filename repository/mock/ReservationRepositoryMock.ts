import { ReservationRepositoryInterface } from "../../models/IReservationRepository";
import { Reservation } from "../../models/Reservation";
import { injectable } from "inversify/lib/cjs";

@injectable()
export class ReservationRepositoryMock implements ReservationRepositoryInterface {
    private store = new Array<Reservation>();

    save(reservation: Reservation): Promise<Reservation> | Reservation {
        this.store.push(reservation)
        return reservation
    }

}