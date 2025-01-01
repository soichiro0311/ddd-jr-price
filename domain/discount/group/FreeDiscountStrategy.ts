import { BasicFare } from "../../BasicFare";
import { IGroupDiscountStrategy } from "./GroupDiscountStrategyInterface";
import { RoundTripType } from '../../RoundTripType';

export class FreeDiscountStrategy implements IGroupDiscountStrategy {
    private threasholdPassengerCount: number = 31
    private appliedCount: number = 0
    private roundTripType: RoundTripType;

    constructor(roundTripType: RoundTripType) {
        this.roundTripType = roundTripType
    }

    discount(fare: BasicFare): void {
        if (!this.isApplied()) {
            fare.free()
            this.appliedCount++
            return;
        }
    }

    applyThreshold(): number {
        return this.threasholdPassengerCount
    }

    isApplied() {
        if (this.roundTripType === RoundTripType.OneWay) {
            return this.appliedCount == 1
        } else {
            return this.appliedCount == 2
        }
    }

}