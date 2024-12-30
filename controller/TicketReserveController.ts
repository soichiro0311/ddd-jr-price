import { TicketReserveService } from '../usecase/TicketReserveService';
import { DomainError } from '../models/error/DomainError';

export class TicketReserveController {

    private ticketReserveService = new TicketReserveService()

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

