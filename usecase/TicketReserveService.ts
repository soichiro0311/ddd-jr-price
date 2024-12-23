import { RoundTripType } from '../models/RoundTripType';
import { Station } from '../models/Station';
import { Reservation } from '../models/Reservation';
import { AdultChildCategory } from '../models/AdultChildCategory';

export class TicketReserveService {
    reserve(roundTripType: RoundTripType, departureStation: Station, destinationStation: Station, passengerCount: number, depatureDate: Date, destinationDate: Date, adultChildCategory: AdultChildCategory) {
        const reservation = new Reservation(passengerCount, depatureDate, destinationDate, departureStation, destinationStation, roundTripType, adultChildCategory);
        return reservation;
    }
}