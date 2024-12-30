import { BasicFare } from "../../BasicFare";
import { IGroupDiscountStrategy } from "./GroupDiscountStrategyInterface";

export class FreeDiscountStrategy implements IGroupDiscountStrategy {
    private threasholdPassengerCount: number = 31
    private isAlreadyApply: boolean = false

    discount(fare: BasicFare): void {
        if (!this.isAlreadyApply) {
            fare.free()
            this.isAlreadyApply = true
            return;
        }
    }

    applyThreshold(): number {
        return this.threasholdPassengerCount
    }

}