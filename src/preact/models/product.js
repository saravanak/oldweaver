import { reverse, cloneDeep } from 'lodash';
import { toDigits, carryoverAndProduct } from '../utils/math';

class Product {
  constructor({ multiplicant, multiplier }) {
    this.multiplicant = multiplicant;
    this.multiplier = multiplier;
    this.answer = this.multiplier * this.multiplicant;
  }

  components() {
    const multiplierDigits = toDigits(this.multiplier);
    const components = {
      multiplicant: toDigits(this.multiplicant),
      multiplier: multiplierDigits,
      answer: toDigits(this.answer),
      digitRows: reverse(cloneDeep(multiplierDigits))
        .map((d, placeValueTenthExponent) => {
          return carryoverAndProduct(this.multiplicant, d, placeValueTenthExponent)
        }),
    }
    const maxDigitsLength = Math.max(...['multiplicant', 'multiplier', 'answer'].map((p) => {
      return components[p].length
    }));
    components.maxDigitsLength = maxDigitsLength;

    return components;
  }
}

export default Product;
