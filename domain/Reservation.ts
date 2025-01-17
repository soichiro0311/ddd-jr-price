import { Station } from "./Station";
import { TravelSection } from './TravelSection';
import { BasicFare } from './BasicFare';
import { AdultChildCategory } from './AdultChildCategory';
import { RoundTripType } from './RoundTripType';
import { RoundTripDiscount } from './discount/roundtrip/RoundTripDiscount';
import { GroupDiscount } from './discount/group/GroupDiscount';
import { v4 as uuidv4 } from '../node_modules/uuid/dist/cjs'
import { DiscountBase } from "./discount/IDiscount";

export class Reservation {

    private _id: string
    private _passengerCount: number
    private _travelSection: TravelSection;
    private _fares = new Array<BasicFare>();

    constructor(adultPassengerCount: number, childPassengerCount: number, depatureDate: Date, destinationDate: Date, departureStation: Station, destinationStation: Station, roundTripType: RoundTripType) {
        this._id = uuidv4()
        this._passengerCount = adultPassengerCount + childPassengerCount;
        this._travelSection = new TravelSection(departureStation, destinationStation)
        const discountChain = new RoundTripDiscount(this._travelSection).setNextDiscount(new GroupDiscount(this._passengerCount, roundTripType))

        this.calcBasicFare(discountChain, depatureDate, destinationDate, this._travelSection, roundTripType, AdultChildCategory.Adult, adultPassengerCount)
        this.calcBasicFare(discountChain, depatureDate, destinationDate, this._travelSection, roundTripType, AdultChildCategory.Child, childPassengerCount)
    }

    static fromData(dataObj: any): Reservation {
        const basicFares: BasicFare[] = dataObj.basicFares.map((fareData: any) => BasicFare.fromData(fareData, Number(dataObj.departureStation), Number(dataObj.destinationStation), dataObj.passengerCount))
        const adultTickets = basicFares.filter(fare => fare.adultChildCategory() === AdultChildCategory.Adult).length
        const adultPassengerCount = basicFares[0].roundTripType() === RoundTripType.RoundTrip ? adultTickets / 2 : adultTickets

        const childTickets = basicFares.filter(fare => fare.adultChildCategory() === AdultChildCategory.Child).length
        const childPassengerCount = basicFares[0].roundTripType() === RoundTripType.RoundTrip ? childTickets / 2 : childTickets

        const reservation = new Reservation(adultPassengerCount, childPassengerCount, new Date(), new Date(), Number(dataObj.departureStation), Number(dataObj.destinationStation), RoundTripType.OneWay)
        reservation._id = dataObj.id
        reservation._fares = basicFares
        return reservation
    }

    sumPrice() {
        return this._fares.reduce((acc, fare) => {
            return acc + fare.value()
        }, 0)
    }

    passengerCount(): number {
        return this._passengerCount
    }
    basicFares(): BasicFare[] {
        return this._fares
    }


    id(): string {
        return this._id
    }

    destinationStation(): string {
        return this._travelSection.destinationStation().toString()
    }
    depatureStation(): string {
        return this._travelSection.departureStation().toString()
    }

    private calcBasicFare(discountChain: DiscountBase, depatureDate: Date, destinationDate: Date, travelSection: TravelSection, roundTripType: RoundTripType, adultChildCategory: AdultChildCategory, passngerCount: number) {
        const tickets = roundTripType === RoundTripType.RoundTrip ? passngerCount * 2 : passngerCount;
        for (let i = 0; i < tickets; i++) {
            const fare = new BasicFare(travelSection, adultChildCategory, roundTripType, this._passengerCount, depatureDate, destinationDate)
            discountChain.discount(fare)
            this._fares.push(fare)
        }
    }

}