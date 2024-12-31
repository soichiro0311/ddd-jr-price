import { Station } from "./Station";
import { TravelSection } from './TravelSection';
import { AdultChildCategory } from './AdultChildCategory';
import { roundDown } from "./shared/PriceRounder";
import { RoundTripType } from './RoundTripType';
import { v4 as uuidv4 } from '../node_modules/uuid/dist/cjs'
import { format } from "date-fns";

export class BasicFare {
    private _id: string
    private _travelSection: TravelSection;
    private _value: number
    private _adultChildCategory: AdultChildCategory
    private _roundTripType: RoundTripType
    private _passengerCount: number
    private _depatureDate: Date
    private _destinationDate: Date

    constructor(travelSection: TravelSection, adultChildCategory: AdultChildCategory, roundTripType: RoundTripType, passengerCount: number, depatureDate: Date, destinationDate: Date) {
        this._id = uuidv4()
        this._travelSection = travelSection
        this._adultChildCategory = adultChildCategory;
        const value = this.resolveAdultChildCategoryValue(this.resolveDestinationValue())
        this._value = roundDown(value)
        this._roundTripType = roundTripType
        this._passengerCount = passengerCount
        this._depatureDate = depatureDate
        this._destinationDate = destinationDate
    }

    static fromData(dataObj: any, depatureStation: Station, destinationStation: Station, passengerCount: number): BasicFare {
        const basicFare = new BasicFare(
            new TravelSection(depatureStation, destinationStation),//
            Number(dataObj.adultChildType), //
            Number(dataObj.roundTripType), //
            passengerCount, //
            new Date(dataObj.depatureDate), //
            new Date(dataObj.destinationDate)//
        )
        basicFare._id = dataObj.id
        basicFare._value = dataObj.price
        return basicFare
    }

    id(): string {
        return this._id
    }

    destinationDate(): Date {
        return this._destinationDate
    }
    departureDate(): Date {
        return this._depatureDate
    }
    destinationDateStr(): string {
        return format(this._destinationDate, "yyyy-MM-dd HH:mm");

    }
    departureDateStr(): string {
        return format(this._depatureDate, "yyyy-MM-dd HH:mm");
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

    roundTripType(): RoundTripType {
        return this._roundTripType
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

    adultChildCategory(): AdultChildCategory {
        return this._adultChildCategory
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