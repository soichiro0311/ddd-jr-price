import { Station } from "./Station";

export class TravelSection {
    private _departureStation: Station;
    private _destinationStation: Station;

    constructor(departureStation: Station, destinationStation: Station) {
        this._departureStation = departureStation
        this._destinationStation = destinationStation
    }

    isDestination(station: Station) {
        return this._destinationStation === station
    }
}