import { BasicFare } from '../BasicFare';

export abstract class DiscountBase {
    private nextDiscount?: DiscountBase;

    setNextDiscount(discount: DiscountBase) {
        this.nextDiscount = discount
        return this
    }

    discount(basicFare: BasicFare) {
        if (this.isApplyable(basicFare)) {
            this.apply(basicFare)
        }

        if (this.nextDiscount) {
            this.nextDiscount.discount(basicFare)
        }
    }

    apply(basicFare: BasicFare): void {
        throw new Error("Must Implements!")
    }

    isApplyable(basicFare: BasicFare): boolean {
        throw new Error("Must Implements!")
    }

}