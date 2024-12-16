import { BasicFare } from '../BasicFare';
import { Station } from '../Station';
import { AdultChildCategory } from '../AdultChildCategory';
describe("乗車料金の算出", () => {
    describe("目的地別の算出", () => {
        it("東京から新大阪までの乗車料金", () => {
            const fare = new BasicFare(Station.Tokyo, Station.SinOsaka, AdultChildCategory.Adult)
            expect(8910).toBe(fare.value())
        })
        it("東京から姫路までの乗車料金", () => {
            const fare = new BasicFare(Station.Tokyo, Station.Himeji, AdultChildCategory.Adult)
            expect(10010).toBe(fare.value())
        })
    })
    describe("大人/子供のくぶんによる算出", () => {
        it("大人の東京から新大阪までの乗車料金", () => {
            const fare = new BasicFare(Station.Tokyo, Station.SinOsaka, AdultChildCategory.Adult)
            expect(8910).toBe(fare.value())
        })
        it("子供の東京から新大阪までの乗車料金", () => {
            const fare = new BasicFare(Station.Tokyo, Station.SinOsaka, AdultChildCategory.Child)
            expect(4450).toBe(fare.value())
        })
    })
    describe("1の桁は切り捨てで計算される", () => {
        it("子供の東京から新大阪までの乗車料金", () => {
            const fare = new BasicFare(Station.Tokyo, Station.SinOsaka, AdultChildCategory.Child)
            expect(4450).toBe(fare.value())
        })
        it("子供の東京から姫路までの乗車料金", () => {
            const fare = new BasicFare(Station.Tokyo, Station.Himeji, AdultChildCategory.Child)
            expect(5000).toBe(fare.value())
        })
    })
})