import { BasicFare } from "../../BasicFare";
import { IGroupDiscountStrategy } from "./GroupDiscountStrategyInterface";
import { TravelPeriod, TravelDate } from "../../TravelPeriod";

export class RatioDiscountStrategy implements IGroupDiscountStrategy {
    private threasholdPassengerCount: number = 8
    private _ratioPerTravelPeriod: Map<TravelPeriod, number> = new Map([
        [new TravelPeriod(new TravelDate("12", "21"), new TravelDate("1", "10")), 0.1],
    ])
    private otherPeriodRatio: number = 0.15


    discount(fare: BasicFare): void {
        const departureDate = fare.departureDate();
        const destinationDate = fare.destinationDate();
        for (const [travelPeriod, ratio] of this._ratioPerTravelPeriod) {
            if (travelPeriod.isIn(departureDate, destinationDate)) {
                fare.discount(ratio)
                return;
            }
        }
        fare.discount(this.otherPeriodRatio)
    }

    applyThreshold(): number {
        return this.threasholdPassengerCount
    }

}