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
            const reserve = this.ticketReserveService.reserve(request.body.roundTripType, request.body.departureStation, request.body.destinationStation, request.body.passengerCount, depatureDate, destinationDate, request.body.adultChildCategory)
            response.status(200).end()
        } catch (e) {
            if (e instanceof DomainError) {
                response.status(400).send({ errorMessage: e.message })
            }
        }
    }
}

