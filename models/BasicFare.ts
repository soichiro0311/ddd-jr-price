import { Station } from "./Station";
import { TravelSection } from './TravelSection';
import { AdultChildCategory } from './AdultChildCategory';
import { roundDown } from "./shared/PriceRounder";

export class BasicFare {
    private _travelSection: TravelSection;
    private _value: number
    private _adultChildCategory: AdultChildCategory

    constructor(departureStation: Station, destinationStation: Station, adultChildCategory: AdultChildCategory) {
        this._travelSection = new TravelSection(departureStation, destinationStation)
        this._adultChildCategory = adultChildCategory;
        const value = this.resolveAdultChildCategoryValue(this.resolveDestinationValue())
        this._value = roundDown(value)
    }

    value(): number {
        return this._value
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