import { Station } from "./Station";
import { TravelSection } from "./TravelSection";
import { BasicFare } from './BasicFare';
import { AdultChildCategory } from "./AdultChildCategory";
import { RoundTripType } from './RoundTripType';
import { RoundTripDiscount } from './RoundTripDiscount';
import { GroupDiscount } from './GroupDiscount';

export class Reservation {
    private _passengerCount: number
    private _depatureDate: Date
    private _destinationDate: Date
    private _travelSection: TravelSection;
    private _fares = new Array<BasicFare>();

    constructor(passengerCount: number, depatureDate: Date, destinationDate: Date, departureStation: Station, destinationStation: Station, roundTripType: RoundTripType, adultChildCategory: AdultChildCategory) {
        this._passengerCount = passengerCount;
        this._depatureDate = depatureDate;
        this._destinationDate = destinationDate;
        this._travelSection = new TravelSection(departureStation, destinationStation)

        for (let i = 0; i < passengerCount; i++) {
            const fare = new BasicFare(departureStation, destinationStation, adultChildCategory, roundTripType, passengerCount, depatureDate, destinationDate)
            const roundTripDiscount = new RoundTripDiscount(fare.travelSection());
            if (roundTripDiscount.isApplyable(fare)) {
                roundTripDiscount.apply(fare);
            }
            const groupDiscount = new GroupDiscount();
            if (groupDiscount.isApplyable(fare)) {
                groupDiscount.apply(fare);
            }
            this._fares.push(fare)
        }
    }

    sumPrice() {
        return this._fares.reduce((acc, fare) => {
            return acc + fare.value()
        }, 0)
    }


}