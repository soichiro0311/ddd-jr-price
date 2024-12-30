
import { TYPES } from "./types";
import { Container } from "./node_modules/inversify/lib/cjs";
import { ReservationRepostiory } from "./repository/ReservationRepostiory";
import { ReservationRepositoryInterface } from "./models/IReservationRepository";
import { ReservationRepositoryMock } from "./repository/mock/ReservationRepositoryMock";

const myContainer = new Container();
myContainer.bind<ReservationRepositoryInterface>(TYPES.ReservationRepostiory).to(process.env.NODE_ENV === "test" ? ReservationRepositoryMock : ReservationRepostiory);

export { myContainer };