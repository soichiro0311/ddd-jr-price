
import { TYPES } from "./types";
import { Container } from "./node_modules/inversify/lib/cjs";
import { ReservationRepostiory } from "./repository/ReservationRepostiory";
import { ReservationRepositoryMock } from "./repository/__tests__/ReservationRepositoryMock";
import { TicketReserveController } from "./controller/TicketReserveController";
import { ReservationRepositoryInterface } from "./models/IReservationRepository";

const myContainer = new Container();
myContainer.bind<ReservationRepositoryInterface>(TYPES.ReservationRepostiory).to(process.env.NODE_ENV === "test" ? ReservationRepositoryMock : ReservationRepostiory);

export { myContainer };