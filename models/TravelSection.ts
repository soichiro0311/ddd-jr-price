import { Station } from "./Station";
import { DomainError } from "./error/DomainError";

export class TravelSection {
    private _departureStation: Station;
    private _destinationStation: Station;
    private _distance: number

    constructor(departureStation: Station, destinationStation: Station) {
        this._departureStation = departureStation
        this._destinationStation = destinationStation
        this._distance = this.resolveDistance();
    }

    isDestination(station: Station) {
        return this._destinationStation === station
    }

    distance(): number{
        return this._distance
    }

    private resolveDistance() {
        if (this._departureStation === Station.Tokyo && this._destinationStation === Station.Himeji) {
            return 644
        }

        if (this._departureStation === Station.Tokyo && this._destinationStation === Station.SinOsaka) {
            return 553
        }

        throw new DomainError("DomainError", "マスタ未設定の駅です")
    }


}