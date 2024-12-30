
import { TYPES } from "./types";
import { Container } from "inversify/lib/cjs";
import { ReservationRepostiory } from "./repository/ReservationRepostiory";
import { ReservationRepositoryMock } from "./repository/__tests__/ReservationRepositoryMock";
import { ReservationRepositoryInterface } from "./models/IReservationRepository";

const myContainer = new Container();
myContainer.bind<ReservationRepositoryInterface>(TYPES.ReservationRepostiory).to(process.env.NODE_ENV === "test" ? ReservationRepositoryMock : ReservationRepostiory);

export { myContainer };