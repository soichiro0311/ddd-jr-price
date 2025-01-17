import { ReservationRepositoryInterface } from "../domain/IReservationRepository";
import { Reservation } from "../domain/Reservation";
import { PrismaClient } from "@prisma/client"
import { injectable } from "../node_modules/inversify/lib/cjs";

@injectable()
export class ReservationRepostiory implements ReservationRepositoryInterface {

    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'], });
    }


    async save(reservation: Reservation) {
        await this.prisma.reservation.create({
            data: {
                id: reservation.id(),
                departureStation: reservation.depatureStation(),
                destinationStation: reservation.destinationStation(),
                passengerCount: reservation.passengerCount(),
                basicFares: {
                    create: reservation.basicFares().map(fare => {
                        return {
                            id: fare.id(),
                            price: fare.value(),
                            roundTripType: fare.roundTripType(),
                            adultChildType: fare.adultChildCategory(),
                            depatureDate: fare.departureDateStr(),
                            destinationDate: fare.destinationDateStr(),
                        }
                    })
                }
            }
        })

        return reservation;
    }

    async list(): Promise<Reservation[]> {
        return await this.prisma.reservation.findMany({
            include: {
                basicFares: true,
            },
        }).then(dataObj => {
            return dataObj.map(data => {
                return Reservation.fromData(data)
            })
        })
    }
}