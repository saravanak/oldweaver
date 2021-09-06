import { range, reverse } from 'lodash';

const toDigits = (number) => {
    let rounded = Math.round(number);
    const digits = [];

    if (rounded == 0) {
        digits.unshift(0)
    }

    while (rounded > 0) {
        digits.unshift(rounded % 10);
        rounded = Math.floor(rounded / 10);
    }

    return digits;
}

const randomNumber = (maxDigits) => {
    return Math.ceil(Math.random() * Math.pow(10, maxDigits))
}

const carryOver = (prevCarryOver, digitLhs, digitRhs) => {
    const product = digitLhs * digitRhs;

    if (product > 100) {
        throw Error(`carryOverProduct: product is greater than 100: ${digitLhs} * ${digitRhs}`);
    }

    const sum = Math.floor((prevCarryOver + product) / 10);
    return sum > 0 ? sum : null

}

const carryoverAndProduct = (multiplicant, multiplier, placeValueTenthExponent) => {
    if (isNaN(multiplier) || multiplier > 10) {
        throw Error(`Multiplicant ${multiplier} should be a single digit number.`);
    }
    const carryOvers = [null];
    let currentCarryOver = 0;
    const multiplicantDigits = toDigits(multiplicant)
    reverse(multiplicantDigits).forEach((d, index) => {
        if (index < multiplicantDigits.length - 1) {
            carryOvers.unshift(carryOver(currentCarryOver, d, multiplier))
        }
    });
    const productAsDigits = toDigits(multiplicant * multiplier);
    range(placeValueTenthExponent).forEach(() => productAsDigits.push(0))
    return {
        carryOvers,
        product: productAsDigits
    }
}


const placeValues = (powerTen) => reverse(range(powerTen).map(i => {
    switch (i) {
        case 0:
            return 'O';
        case 1:
            return 'T';
        case 2:
            return 'H';
        case 3:
            return 'Th';
        case 4:
            return 'T.Th';
        case 5:
            return 'L';
        case 6:
            return 'T.L';
        default:
            return '';
    }
}))


export {
    toDigits,
    randomNumber,
    carryoverAndProduct,
    placeValues
}