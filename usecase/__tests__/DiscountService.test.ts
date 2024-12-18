import { DiscountService } from '../DiscountService';
import { Station } from '../../models/Station';
import { AdultChildCategory } from '../../models/AdultChildCategory';
import { BasicFare } from '../../models/BasicFare';

describe("割引サービス", () => {
    describe("往復の距離に応じて割引が適用されること", () => {
        it("東京から姫路の往復運賃の場合、往復割引が適用されること", () => {
            const service = new DiscountService();
            const basicFare = new BasicFare(Station.Tokyo, Station.Himeji, AdultChildCategory.Adult, true);
            const discountedFare = service.discount(basicFare)
            expect(9000).toBe(discountedFare.value())
        })
        it("東京から新大阪の往復運賃の場合、往復割引が適用されないこと", () => {
            const service = new DiscountService();
            const basicFare = new BasicFare(Station.Tokyo, Station.SinOsaka, AdultChildCategory.Adult, true);
            const discountedFare = service.discount(basicFare)
            expect(basicFare.value()).toBe(discountedFare.value())
        })
    })
})