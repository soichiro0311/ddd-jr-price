import { BasicFare } from "../models/BasicFare";
import { RoundTripDiscount } from "../models/RoundTripDiscount";

export class DiscountService {

    discount(basicFare: BasicFare): BasicFare {
        const discount = new RoundTripDiscount(basicFare.travelSection());
        if (discount.isApplyable(basicFare)) {
            discount.apply(basicFare);
        }
        return basicFare;
    }
}