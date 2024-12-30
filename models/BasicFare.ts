import { Station } from "./Station";
import { TravelSection } from './TravelSection';
import { AdultChildCategory } from './AdultChildCategory';
import { roundDown } from "./shared/PriceRounder";
import { RoundTripDiscount } from "./RoundTripDiscount";
import { RoundTripType } from "./RoundTripType";
import { v4 as uuidv4 } from 'uuid';

export class BasicFare {
    private _id: string
    private _travelSection: TravelSection;
    private _value: number
    private _adultChildCategory: AdultChildCategory
    private _roundTripType: RoundTripType
    private _passengerCount: number
    private _depatureDate: Date
    private _destinationDate: Date

    constructor(departureStation: Station, destinationStation: Station, adultChildCategory: AdultChildCategory, roundTripType: RoundTripType, passengerCount: number, depatureDate: Date, destinationDate: Date) {
        this._id = uuidv4();
        this._travelSection = new TravelSection(departureStation, destinationStation)
        this._adultChildCategory = adultChildCategory;
        const value = this.resolveAdultChildCategoryValue(this.resolveDestinationValue())
        this._value = roundDown(value)
        this._roundTripType = roundTripType
        this._passengerCount = passengerCount
        this._depatureDate = depatureDate
        this._destinationDate = destinationDate
    }
    id(): string {
        return this._id
    }

    destinationDate(): Date {
        return this._destinationDate
    }
    departureDate(): any {
        return this._depatureDate
    }

    discount(discountRatio: number): void {
        this._value = roundDown(this._value * (1 - discountRatio))
    }

    free(): void {
        this._value = 0
    }

    isRoundTrip(): boolean {
        return this._roundTripType === RoundTripType.RoundTrip
    }

    passengerCount(): number {
        return this._passengerCount
    }

    value(): number {
        return this._value
    }

    travelSection(): TravelSection {
        return this._travelSection
    }


    private resolveDestinationValue(): number {
        if (this._travelSection.isDestination(Station.SinOsaka)) {
            return 8910
        } else if (this._travelSection.isDestination(Station.Himeji)) {
            return 10010
        } else {
            return 0
        }
    }

    private resolveAdultChildCategoryValue(value: number): number {
        if (this._adultChildCategory === AdultChildCategory.Adult) {
            return value
        }
        return value / 2
    }
}