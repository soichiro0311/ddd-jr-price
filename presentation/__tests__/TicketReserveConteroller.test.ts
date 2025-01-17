import supertest from "supertest";
import { server } from "../../index";
import { AdultChildCategory } from '../../domain/AdultChildCategory';


describe("乗車券予約ユースケース", () => {
    it("往復割引と団体割引適用された乗車料金で予約が行えること", async () => {
        const request = supertest(server);
        const createResponse = await request.post("/reservation").send({
            roundTripType: 0,
            departureStation: 0,
            destinationStation: 2,
            adultPassengerCount: 6,
            childPassengerCount: 2,
            depatureDate: "2024/12/21 12:00",
            destinationDate: "2024/12/21 13:00",
        });

        expect(createResponse.status).toBe(200);
        const response = await request.get("/reservation");
        const reservations = response.body
        expect(reservations).toHaveLength(1)
        expect(reservations[0]._fares).toHaveLength(16)
        expect(reservations[0]._fares.filter((fare: any) => fare._adultChildCategory === AdultChildCategory.Adult)).toHaveLength(12)
        expect(reservations[0]._fares.filter((fare: any) => fare._adultChildCategory === AdultChildCategory.Adult)[0]._value).toBe(8100)
        expect(reservations[0]._fares.filter((fare: any) => fare._adultChildCategory === AdultChildCategory.Child)).toHaveLength(4)
        expect(reservations[0]._fares.filter((fare: any) => fare._adultChildCategory === AdultChildCategory.Child)[0]._value).toBe(4050)
    });
});