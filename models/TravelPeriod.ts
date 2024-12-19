export class TravelPeriod {

    private _since: TravelDate
    private _until: TravelDate

    constructor(since: TravelDate, until: TravelDate) {
        this._since = since;
        this._until = until
    }

    isIn(depatureDate: Date, destinationDate: Date): boolean {
        if (this._since.currentYearDate() <= depatureDate && depatureDate <= this._until.nextYearDate()) {
            return this._since.currentYearDate() <= destinationDate && destinationDate <= this._until.nextYearDate()
        }

        if (this._since.beforeYearDate() <= depatureDate && depatureDate <= this._until.currentYearDate()) {
            return this._since.beforeYearDate() <= destinationDate && destinationDate <= this._until.currentYearDate()
        }

        return false
    }
}

export class TravelDate {
    private _month: string
    private _day: string

    constructor(month: string, day: string) {
        this._month = month;
        this._day = day;
    }

    currentYearDate(): Date {
        const currentYear = new Date().getFullYear();
        return new Date(`${currentYear}-${this._month}-${this._day}`)
    }

    nextYearDate(): Date {
        const nextYear = new Date().getFullYear() + 1;
        return new Date(`${nextYear}-${this._month}-${this._day}`)
    }

    beforeYearDate(): Date {
        const beforeYear = new Date().getFullYear() - 1;
        return new Date(`${beforeYear}-${this._month}-${this._day}`)
    }
}