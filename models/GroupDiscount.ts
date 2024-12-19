import { IDiscount } from "./IDiscount";
import { TravelPeriod, TravelDate } from "./TravelPeriod";
import { BasicFare } from "./BasicFare";

export class GroupDiscount implements IDiscount {
    private _applyPassengersCountThreshold = 8
    private _ratioPerTravelPeriod: Map<TravelPeriod, number> = new Map([
        [new TravelPeriod(new TravelDate("12", "21"), new TravelDate("1", "10")), 0.1],
    ])
    private otherPeriodRatio: number = 0.15

    apply(fare: BasicFare): void {
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

    isApplyable(fare: BasicFare): boolean {
        return this._applyPassengersCountThreshold <= fare.passengerCount()
    }

}