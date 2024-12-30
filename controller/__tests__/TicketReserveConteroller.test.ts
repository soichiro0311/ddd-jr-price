import supertest from "supertest";
import { server } from "../../index";


describe("乗車券予約ユースケース", () => {
    it("往復割引と団体割引適用された乗車料金で予約が行えること", async () => {
        const request = supertest(server);
        const response = await request.post("/reservation").send({
            roundTripType: 0,
            departureStation: 0,
            destinationStation: 2,
            passengerCount: 9,
            depatureDate: "2024/12/21 12:00",
            destinationDate: "2024/12/21 13:00",
            adultChildCategory: 0
        });

        expect(response.status).toBe(200);
    });
});