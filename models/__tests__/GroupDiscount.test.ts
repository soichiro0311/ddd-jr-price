import { BasicFare } from "../BasicFare";
import { Station } from "../Station";
import { AdultChildCategory } from "../AdultChildCategory";
import { GroupDiscount } from "../GroupDiscount";
import { RoundTripType } from "../RoundTripType";

describe("団体割引", () => {
    describe("人数が8人未満か以上で割引適用有無が変わること", () => {
        it("人数が8人の場合は割引が適用されること", () => {
            const basicFare = new BasicFare(Station.Tokyo, Station.Himeji, AdultChildCategory.Adult, RoundTripType.OneWay, 8, new Date("2024-12-21"), new Date("2024-12-23"));
            const discount = new GroupDiscount(8);
            const isApplyable = discount.isApplyable(basicFare)
            expect(isApplyable).toBeTruthy();
            discount.apply(basicFare);
            expect(9000).toBe(basicFare.value())
        })
        it("人数が7人の場合は割引が適用されないこと", () => {
            const basicFare = new BasicFare(Station.Tokyo, Station.Himeji, AdultChildCategory.Adult, RoundTripType.OneWay, 7, new Date("2024-12-21"), new Date("2024-12-23"));
            const discount = new GroupDiscount(7);
            const isApplyable = discount.isApplyable(basicFare)
            expect(isApplyable).toBeFalsy();
        })
    })
    describe("人数が8人以上30人未満の場合で期間によって割引率が変化すること", () => {
        it("人数が8人 かつ 2024/12/21~2024/12/23までの旅行の場合は10%割引が適用されること", () => {
            const basicFare = new BasicFare(Station.Tokyo, Station.SinOsaka, AdultChildCategory.Adult, RoundTripType.OneWay, 8, new Date("2024-12-21"), new Date("2024-12-23"));
            const discount = new GroupDiscount(8);
            const isApplyable = discount.isApplyable(basicFare)
            expect(isApplyable).toBeTruthy();
            discount.apply(basicFare);
            expect(8010).toBe(basicFare.value())
        })
        it("人数が8人 かつ 2024/12/19~2024/12/20までの旅行の場合は15%割引が適用されること", () => {
            const basicFare = new BasicFare(Station.Tokyo, Station.SinOsaka, AdultChildCategory.Adult, RoundTripType.OneWay, 8, new Date("2024-12-19"), new Date("2024-12-20"));
            const discount = new GroupDiscount(8);
            const isApplyable = discount.isApplyable(basicFare)
            expect(isApplyable).toBeTruthy();
            discount.apply(basicFare);
            expect(7570).toBe(basicFare.value())
        })
    })
})