import { ReservationRepositoryInterface } from "../../models/IReservationRepository";
import { Reservation } from "../../models/Reservation";
import { injectable } from "../../node_modules/inversify/lib/cjs";

@injectable()
export class ReservationRepositoryMock implements ReservationRepositoryInterface {

    private store = new Array<Reservation>();

    save(reservation: Reservation): Promise<Reservation> {
        return new Promise((resolve, reject) => {
            this.store.push(reservation)
            resolve(reservation);
        })
    }

    list(): Promise<Reservation[]> {
        return new Promise((resolve, reject) => {
            resolve(this.store);
        })
    }

}