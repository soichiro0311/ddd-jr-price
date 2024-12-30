import { BasicFare } from "../BasicFare";
import { Station } from "../Station";
import { TravelSection } from "../TravelSection";
import { AdultChildCategory } from "../AdultChildCategory";
import { RoundTripType } from "../RoundTripType";
import { RoundTripDiscount } from "../discount/roundtrip/RoundTripDiscount";

describe("往復割引", () => {
    describe("往復の距離に応じて割引が適用されること", () => {
        it("東京から姫路の往復運賃の場合、往復割引が適用されること", () => {
            const discount = new RoundTripDiscount(new TravelSection(Station.Tokyo, Station.Himeji));
            const basicFare = new BasicFare(Station.Tokyo, Station.Himeji, AdultChildCategory.Adult, RoundTripType.RoundTrip, 1, new Date("2024-5-11"), new Date("2024-5-13"));
            const isApplyable = discount.isApplyable(basicFare)
            expect(isApplyable).toBeTruthy();
            discount.apply(basicFare);
            expect(9000).toBe(basicFare.value())
        })
        it("東京から新大阪の往復運賃の場合、往復割引が適用されないこと", () => {
            const discount = new RoundTripDiscount(new TravelSection(Station.Tokyo, Station.SinOsaka));
            const basicFare = new BasicFare(Station.Tokyo, Station.SinOsaka, AdultChildCategory.Adult, RoundTripType.RoundTrip, 1, new Date("2024-5-11"), new Date("2024-5-13"));
            const isApplyable = discount.isApplyable(basicFare)
            expect(isApplyable).toBeFalsy();
        })
    })
    describe("往復の運賃にのみ割引が適用されること", () => {
        it("東京から姫路の片道運賃の場合、往復割引が適用されないこと", () => {
            const discount = new RoundTripDiscount(new TravelSection(Station.Tokyo, Station.Himeji));
            const basicFare = new BasicFare(Station.Tokyo, Station.Himeji, AdultChildCategory.Adult, RoundTripType.OneWay, 1, new Date("2024-5-11"), new Date("2024-5-13"));
            const isApplyable = discount.isApplyable(basicFare)
            expect(isApplyable).toBeFalsy();
        })
    })
})