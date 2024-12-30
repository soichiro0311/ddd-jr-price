import { IDiscount } from "../IDiscount";
import { TravelPeriod, TravelDate } from "../../TravelPeriod";
import { BasicFare } from "../../BasicFare";
import { FreeDiscountStrategy } from "./FreeDiscountStrategy";
import { IGroupDiscountStrategy } from "./GroupDiscountStrategyInterface";
import { FreePerPassengerCountDiscountStrategy } from "./FreePerPassengerCountDiscountStrategy";
import { RatioDiscountStrategy } from "./RatioDiscountStrategy";
import { DomainError } from "../../error/DomainError";

export class GroupDiscount implements IDiscount {
    private _applyPassengersCountThreshold = 8

    private _strategies: Array<IGroupDiscountStrategy> = []

    constructor(passengerCount: number) {
        this._strategies = [new FreeDiscountStrategy(), new FreePerPassengerCountDiscountStrategy(passengerCount), new RatioDiscountStrategy()]
    }

    apply(fare: BasicFare): void {
        const strategy = this._strategies.sort((a, b) => a.applyThreshold() - b.applyThreshold()).find((strategy, index) => {
            if (index === this._strategies.length - 1) {
                return strategy.applyThreshold() <= fare.passengerCount()
            } else {
                return strategy.applyThreshold() <= fare.passengerCount() && fare.passengerCount() < this._strategies[index + 1].applyThreshold()
            }
        })
        if (strategy == null) {
            // TODO: エラー定義
            throw new DomainError("", "")
        }
        strategy.discount(fare);
    }

    isApplyable(fare: BasicFare): boolean {
        return this._applyPassengersCountThreshold <= fare.passengerCount()
    }

}