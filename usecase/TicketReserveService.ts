import { RoundTripType } from '../models/RoundTripType';
import { Station } from '../models/Station';
import { Reservation } from '../models/Reservation';
import { AdultChildCategory } from '../models/AdultChildCategory';
import { ReservationRepostiory } from '../repository/ReservationRepostiory';

export class TicketReserveService {
    reserve(roundTripType: RoundTripType, departureStation: Station, destinationStation: Station, passengerCount: number, depatureDate: Date, destinationDate: Date, adultChildCategory: AdultChildCategory) {
        const reservation = new Reservation(passengerCount, depatureDate, destinationDate, departureStation, destinationStation, roundTripType, adultChildCategory);
        const repository = new ReservationRepostiory()
        repository.save(reservation).then(reservation => {
            console.log(reservation)
        })
    }
}