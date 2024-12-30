import { BasicFare } from "../../BasicFare";
import { IGroupDiscountStrategy } from "./GroupDiscountStrategyInterface";

/**
 * 50人につき一人分を無料にする団多割引ルール
 */
export class FreePerPassengerCountDiscountStrategy implements IGroupDiscountStrategy {
    private threasholdPassengerCount: number = 51
    private discountSlotPassengerCount: number = 50
    private freeDiscountsPerPassengerCount: number = 0

    constructor(passengerCount: number) {
        this.freeDiscountsPerPassengerCount = Math.floor(passengerCount / this.discountSlotPassengerCount)
    }

    discount(fare: BasicFare): void {
        if (this.freeDiscountsPerPassengerCount != 0) {
            fare.free()
            this.freeDiscountsPerPassengerCount = this.freeDiscountsPerPassengerCount - 1
        }
    }

    applyThreshold(): number {
        return this.threasholdPassengerCount
    }

}