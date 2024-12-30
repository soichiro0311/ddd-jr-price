import { Station } from "./Station";
import { TravelSection } from "./TravelSection";
import { BasicFare } from './BasicFare';
import { AdultChildCategory } from "./AdultChildCategory";
import { RoundTripType } from './RoundTripType';
import { RoundTripDiscount } from './discount/roundtrip/RoundTripDiscount';
import { GroupDiscount } from './discount/group/GroupDiscount';
import { v4 as uuidv4 } from '../node_modules/uuid/dist/cjs'

export class Reservation {
    private _id: string
    private _passengerCount: number
    private _travelSection: TravelSection;
    private _fares = new Array<BasicFare>();

    constructor(adultPassengerCount: number, childPassengerCount: number, depatureDate: Date, destinationDate: Date, departureStation: Station, destinationStation: Station, roundTripType: RoundTripType) {
        this._id = uuidv4()
        this._passengerCount = adultPassengerCount + childPassengerCount;
        this._travelSection = new TravelSection(departureStation, destinationStation)

        const groupDiscount = new GroupDiscount(this._passengerCount);

        for (let i = 0; i < adultPassengerCount; i++) {
            const fare = new BasicFare(departureStation, destinationStation, AdultChildCategory.Adult, roundTripType, this._passengerCount, depatureDate, destinationDate)
            const roundTripDiscount = new RoundTripDiscount(fare.travelSection());
            if (roundTripDiscount.isApplyable(fare)) {
                roundTripDiscount.apply(fare);
            }
            if (groupDiscount.isApplyable(fare)) {
                groupDiscount.apply(fare);
            }
            this._fares.push(fare)
        }
        for (let i = 0; i < childPassengerCount; i++) {
            const fare = new BasicFare(departureStation, destinationStation, AdultChildCategory.Child, roundTripType, this._passengerCount, depatureDate, destinationDate)
            const roundTripDiscount = new RoundTripDiscount(fare.travelSection());
            if (roundTripDiscount.isApplyable(fare)) {
                roundTripDiscount.apply(fare);
            }
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

    passengerCount(): number {
        return this._passengerCount
    }
    basicFares(): BasicFare[] {
        return this._fares
    }


    id(): string {
        return this._id
    }

    destinationStation(): string {
        return this._travelSection.destinationStation().toString()
    }
    depatureStation(): string {
        return this._travelSection.departureStation().toString()
    }
}