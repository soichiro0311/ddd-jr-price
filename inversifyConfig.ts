
import { TYPES } from "./types";
import { Container } from "./node_modules/inversify/lib/cjs";
import { ReservationRepostiory } from "./infrastracture/ReservationRepostiory";
import { ReservationRepositoryInterface } from "./domain/IReservationRepository";
import { ReservationRepositoryMock } from "./infrastracture/mock/ReservationRepositoryMock";

const myContainer = new Container();
myContainer.bind<ReservationRepositoryInterface>(TYPES.ReservationRepostiory).to(process.env.NODE_ENV === "test" ? ReservationRepositoryMock : ReservationRepostiory);

export { myContainer };