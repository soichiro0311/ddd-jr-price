/**
 * 料金は10の桁で切り捨てる
 */
const DigitToTruncate = 10

export const roundDown = (price: number) => {
    return Math.trunc(price / DigitToTruncate) * DigitToTruncate;
}