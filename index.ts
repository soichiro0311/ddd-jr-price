import express from "express";
import { myContainer } from "./inversifyConfig";
import { TicketReserveController } from "./controller/TicketReserveController";
import { TYPES } from "./types";

export const server = express();

server.use(express.json());
server.use(express.urlencoded({
    extended: true
}));

const reservationController = new TicketReserveController()

server.post("/reservation", reservationController.reserveTciket)

server.listen(3000)
