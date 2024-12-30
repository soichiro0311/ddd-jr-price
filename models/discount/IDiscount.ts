import { BasicFare } from '../BasicFare';

export interface IDiscount {
    apply(basicFare: BasicFare): void
    isApplyable(basicFare: BasicFare): boolean
}