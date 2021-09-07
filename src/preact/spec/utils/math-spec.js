import {toDigits, carryoverAndProduct } from '../../utils/math'

describe("Math", () => {
  it("toDigits", () => {
    expect(toDigits(1000)).toEqual([1, 0, 0, 0]);
    expect(toDigits(1001)).toEqual([1, 0, 0, 1]);
    expect(toDigits(0)).toEqual([0]);
    expect(toDigits(1234078)).toEqual([1, 2, 3, 4, 0, 7, 8]);
  });

  it('carryoverAndProduct', () => {
    expect(carryoverAndProduct(4, 8)).toEqual({
      carryOvers: [null],
      product: [3, 2],
    });

    const result = carryoverAndProduct(40404, 8);
    expect(result).toEqual({
      carryOvers: [null, 3, null, 3, null],
      product: [3, 2, 3, 2, 3, 2],
    });
  })
});
