import { RoundTripType } from '../models/RoundTripType';
import { Station } from '../models/Station';
import { Reservation } from '../models/Reservation';
import { AdultChildCategory } from '../models/AdultChildCategory';
import { ReservationRepositoryInterface } from "../models/IReservationRepository";
import { TYPES } from '../types';
import { inject } from '../node_modules/inversify/lib/cjs';

export class TicketReserveService {
    private repository: ReservationRepositoryInterface;

    constructor(@inject(TYPES.ReservationRepostiory) repository: ReservationRepositoryInterface) {
        this.repository = repository
    }

    reserve(roundTripType: RoundTripType, departureStation: Station, destinationStation: Station, adultPassengerCount: number, childPassengerCount: number, depatureDate: Date, destinationDate: Date) {
        const reservation = new Reservation(adultPassengerCount, childPassengerCount, depatureDate, destinationDate, departureStation, destinationStation, roundTripType);

        return this.repository.save(reservation).then(reservation => {
            return reservation
        })
    }
}