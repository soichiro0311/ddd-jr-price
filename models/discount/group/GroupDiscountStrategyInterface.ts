import { BasicFare } from "../../BasicFare";

export interface IGroupDiscountStrategy {
    discount(fare: BasicFare): void

    applyThreshold(): number
}