import { ReservationRepositoryInterface } from "../../models/IReservationRepository";
import { Reservation } from "../../models/Reservation";
import { injectable } from "../../node_modules/inversify/lib/cjs";

@injectable()
export class ReservationRepositoryMock implements ReservationRepositoryInterface {
    private store = new Array<Reservation>();
    save(reservation: Reservation) {
        this.store.push(reservation)
    }

}