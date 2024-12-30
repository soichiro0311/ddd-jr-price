import { IDiscount } from "./IDiscount";
import { TravelPeriod, TravelDate } from "./TravelPeriod";
import { BasicFare } from "./BasicFare";

export class GroupDiscount implements IDiscount {
    private _applyPassengersCountThreshold = 8
    private _applyFreePassengersCountThreshold = 31
    private _applyFreePassengersPerPassengerCountThreshold = 51
    private _ratioPerTravelPeriod: Map<TravelPeriod, number> = new Map([
        [new TravelPeriod(new TravelDate("12", "21"), new TravelDate("1", "10")), 0.1],
    ])
    private otherPeriodRatio: number = 0.15
    private isAlreadyApply: boolean = false
    private isFreeDiscount: boolean = false
    private freeDiscountsPerPassengerCount: number = 0

    constructor(passengerCount: number) {
        if (passengerCount >= this._applyFreePassengersPerPassengerCountThreshold) {
            this.freeDiscountsPerPassengerCount = Math.floor(passengerCount / 50)
        }
        this.isFreeDiscount = passengerCount >= this._applyFreePassengersCountThreshold
    }

    apply(fare: BasicFare): void {
        if (this.isFreeDiscount) {
            if (this.freeDiscountsPerPassengerCount != 0) {
                fare.free()
                this.freeDiscountsPerPassengerCount = this.freeDiscountsPerPassengerCount - 1
                return;
            }
            if (this._applyFreePassengersCountThreshold <= fare.passengerCount() && fare.passengerCount() < this._applyFreePassengersPerPassengerCountThreshold && !this.isAlreadyApply) {
                fare.free()
                this.isAlreadyApply = true
                return;
            }
        } else {
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
    }

    isApplyable(fare: BasicFare): boolean {
        return this._applyPassengersCountThreshold <= fare.passengerCount()
    }

}