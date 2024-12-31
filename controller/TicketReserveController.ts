import { TicketReserveService } from '../usecase/TicketReserveService';
import { DomainError } from '../models/error/DomainError';
import { myContainer } from '../inversifyConfig';
import { ReservationRepositoryInterface } from '../models/IReservationRepository';
import { TYPES } from '../types';

export class TicketReserveController {

    private ticketReserveService = new TicketReserveService(myContainer.get<ReservationRepositoryInterface>(TYPES.ReservationRepostiory))

    reserveTciket = (request: any, response: any) => {
        try {
            const depatureDate = new Date(request.body.depatureDate)
            const destinationDate = new Date(request.body.destinationDate)
            const reserve = this.ticketReserveService.reserve(request.body.roundTripType, request.body.departureStation, request.body.destinationStation, request.body.adultPassengerCount, request.body.childPassengerCount, depatureDate, destinationDate)
            response.status(200).end()
        } catch (e) {
            if (e instanceof DomainError) {
                response.status(400).send({ errorMessage: e.message })
            }
        }
    }

    allReserveTickets = (request: any, response: any) => {
        try {
            this.ticketReserveService.allTickets().then(reservations => {
                response.status(200).send(reservations)
            })
        } catch (e) {
            if (e instanceof DomainError) {
                response.status(400).send({ errorMessage: e.message })
            }
        }
    }
}

