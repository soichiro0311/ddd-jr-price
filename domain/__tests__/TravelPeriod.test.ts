import { TravelPeriod, TravelDate } from '../TravelPeriod';
describe("旅行期間", () => {
    it("割引期間が2024/12/11~2025/1/10 かつ 乗車日が2024/12/11, 降車日が2025/1/10の場合は割引適用対象になること", () => {
        const travelPeriod = new TravelPeriod(new TravelDate("12", "11"), new TravelDate("1", "10"));
        expect(travelPeriod.isIn(new Date("2024-12-11"), new Date("2025-1-10"))).toBeTruthy()
    })
    it("割引期間が2024/12/11~2025/1/10 かつ 乗車日が2024/12/10, 降車日が2024/12/11の場合は割引適用対象にならないこと", () => {
        const travelPeriod = new TravelPeriod(new TravelDate("12", "11"), new TravelDate("1", "10"));
        expect(travelPeriod.isIn(new Date("2024-12-10"), new Date("2024-12-11"))).toBeFalsy()
    })
    it("割引期間が2024/12/11~2025/1/10 かつ 乗車日が2025/1/10, 降車日が2025/1/11の場合は割引適用対象にならないこと", () => {
        const travelPeriod = new TravelPeriod(new TravelDate("12", "11"), new TravelDate("1", "10"));
        expect(travelPeriod.isIn(new Date("2025-1-10"), new Date("2025-1-11"))).toBeFalsy()
    })
    it("割引期間が2024/12/11~2025/1/10 かつ 乗車日が2024/12/10, 降車日が2025/1/11の場合は割引適用対象にならないこと", () => {
        const travelPeriod = new TravelPeriod(new TravelDate("12", "11"), new TravelDate("1", "10"));
        expect(travelPeriod.isIn(new Date("2024-12-10"), new Date("2025-1-11"))).toBeFalsy()
    })
})