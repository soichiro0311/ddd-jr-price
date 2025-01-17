import { TravelSection } from '../../TravelSection';
import { BasicFare } from '../../BasicFare';
import { DiscountBase } from '../IDiscount';

const DiscountDistanceThreshold = 601

export class RoundTripDiscount extends DiscountBase {

    private _travelSection: TravelSection
    private _discountRatio: number

    constructor(travelSection: TravelSection) {
        super()
        this._travelSection = travelSection
        this._discountRatio = 0.1
    }

    apply(fare: BasicFare): void {
        fare.discount(this._discountRatio)
    }

    isApplyable(fare: BasicFare): boolean {
        return this._travelSection.distance() >= DiscountDistanceThreshold && fare.isRoundTrip()
    }
}