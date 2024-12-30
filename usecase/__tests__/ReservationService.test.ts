import { TicketReserveService } from "../TicketReserveService";
import { RoundTripType } from "../../models/RoundTripType";
import { Station } from "../../models/Station";
import { AdultChildCategory } from '../../models/AdultChildCategory';
import { ReservationRepositoryMock } from '../../repository/mock/ReservationRepositoryMock';

describe("チケット予約", () => {
    it("8人分の東京から新大阪の片道運賃を算出できること", async () => {
        const service = new TicketReserveService(new ReservationRepositoryMock());
        const reserve = await service.reserve(RoundTripType.OneWay, Station.Tokyo, Station.SinOsaka, 8, new Date("2024-3-13"), new Date("2024-3-15"), AdultChildCategory.Adult)
        expect(reserve.sumPrice()).toBe(60560)
    })

    describe("割引適用", () => {
        describe("往復割引", () => {
            describe("往復の距離に応じて割引が適用されること", () => {
                it("東京から姫路の往復運賃の場合、往復割引が適用されること", async () => {
                    const service = new TicketReserveService(new ReservationRepositoryMock());
                    const reserve = await service.reserve(RoundTripType.RoundTrip, Station.Tokyo, Station.Himeji, 7, new Date("2024-3-13"), new Date("2024-3-15"), AdultChildCategory.Adult)
                    expect(reserve.sumPrice()).toBe(63000)
                })
                it("東京から新大阪の往復運賃の場合、往復割引が適用されないこと", async () => {
                    const service = new TicketReserveService(new ReservationRepositoryMock());
                    const reserve = await service.reserve(RoundTripType.RoundTrip, Station.Tokyo, Station.SinOsaka, 7, new Date("2024-3-13"), new Date("2024-3-15"), AdultChildCategory.Adult)
                    expect(reserve.sumPrice()).toBe(62370)
                })
            })
            describe("往復予約の場合のみ割引が適用されること", () => {
                it("東京から姫路の片道運賃の場合、往復割引が適用されないこと", async () => {
                    const service = new TicketReserveService(new ReservationRepositoryMock());
                    const reserve = await service.reserve(RoundTripType.OneWay, Station.Tokyo, Station.Himeji, 7, new Date("2024-3-13"), new Date("2024-3-15"), AdultChildCategory.Adult)
                    expect(reserve.sumPrice()).toBe(70070)
                })
            })
        })
    })
    describe("団体割引", () => {
        describe("8人~30人までの場合、期間によって割引率が異なること", () => {
            it("8人の予約 かつ 2025/12/21~2025/12/25の場合、10%割引であること", async () => {
                const service = new TicketReserveService(new ReservationRepositoryMock());
                const reserve = await service.reserve(RoundTripType.OneWay, Station.Tokyo, Station.Himeji, 8, new Date("2024-12-21"), new Date("2024-12-25"), AdultChildCategory.Adult)
                expect(reserve.sumPrice()).toBe(72000)
            })
            it("8人の予約 かつ 2025/12/10~2025/12/20の場合、15%割引であること", async () => {
                const service = new TicketReserveService(new ReservationRepositoryMock());
                const reserve = await service.reserve(RoundTripType.OneWay, Station.Tokyo, Station.Himeji, 8, new Date("2024-12-10"), new Date("2024-12-20"), AdultChildCategory.Adult)
                expect(reserve.sumPrice()).toBe(68000)
            })
        })
        describe("31人~50人までの場合、一人分が無料になること", () => {
            it("31人の予約の場合、30人分の料金であること", async () => {
                const service = new TicketReserveService(new ReservationRepositoryMock());
                const reserve = await service.reserve(RoundTripType.OneWay, Station.Tokyo, Station.Himeji, 31, new Date("2024-12-21"), new Date("2024-12-25"), AdultChildCategory.Adult)
                expect(reserve.sumPrice()).toBe(300300)
            })
        })
        describe("51人~の場合、50人増える毎に一人分が無料になること", () => {
            it("51人の予約の場合、50人分の料金であること", async () => {
                const service = new TicketReserveService(new ReservationRepositoryMock());
                const reserve = await service.reserve(RoundTripType.OneWay, Station.Tokyo, Station.Himeji, 51, new Date("2024-12-10"), new Date("2024-12-20"), AdultChildCategory.Adult)
                expect(reserve.sumPrice()).toBe(500500)
            })
            it("101人の予約の場合、99人分の料金であること", async () => {
                const service = new TicketReserveService(new ReservationRepositoryMock());
                const reserve = await service.reserve(RoundTripType.OneWay, Station.Tokyo, Station.Himeji, 101, new Date("2024-12-10"), new Date("2024-12-20"), AdultChildCategory.Adult)
                expect(reserve.sumPrice()).toBe(990990)
            })
        })
    })
})