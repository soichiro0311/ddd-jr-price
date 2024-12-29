import { TicketReserveService } from "../TicketReserveService";
import { RoundTripType } from "../../models/RoundTripType";
import { Station } from "../../models/Station";
import { AdultChildCategory } from '../../models/AdultChildCategory';

describe("チケット予約", () => {
    it("8人分の東京から新大阪の片道運賃を算出できること", async () => {
        const service = new TicketReserveService();
        const reserve = await service.reserve(RoundTripType.OneWay, Station.Tokyo, Station.SinOsaka, 8, new Date("2024-3-13"), new Date("2024-3-15"), AdultChildCategory.Adult)
        expect(reserve.sumPrice()).toBe(60560)
    })

    describe("割引適用", () => {
        describe("往復の距離に応じて割引が適用されること", () => {
            it("東京から姫路の往復運賃の場合、往復割引が適用されること", async () => {
                const service = new TicketReserveService();
                const reserve = await service.reserve(RoundTripType.RoundTrip, Station.Tokyo, Station.Himeji, 8, new Date("2024-3-13"), new Date("2024-3-15"), AdultChildCategory.Adult)
                expect(reserve.sumPrice()).toBe(61200)
            })
            it("東京から新大阪の往復運賃の場合、往復割引が適用されないこと", async () => {
                const service = new TicketReserveService();
                const reserve = await service.reserve(RoundTripType.RoundTrip, Station.Tokyo, Station.SinOsaka, 8, new Date("2024-3-13"), new Date("2024-3-15"), AdultChildCategory.Adult)
                expect(reserve.sumPrice()).toBe(60560)

            })
        })
    })
})