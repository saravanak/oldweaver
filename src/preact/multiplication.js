import { render, Component } from 'preact';
import Product from './models/product';
import { reverse, cloneDeep, merge, range } from 'lodash';
import { randomNumber, placeValues } from './utils/math';
import { isMobile } from 'mobile-device-detect';
var classNames = require('classnames');
import MicroModal from 'micromodal'; 

const PREFIX_COLUMNS_COUNT = 1; //for the signs

class Multiplication extends Component {
  constructor() {
    super();
    this.state = {
      problem: new Product({ multiplier: randomNumber(3), multiplicant: randomNumber(2) })
    };
  }

  digit(digit, options = { isCarryover: false }) {
    const { isCarryover, digitClick, isStrikeThrough, additionalClasses } = options;
    const hasDigit = digit != null;
    const isClickable = !!digitClick;

    console.log(additionalClasses, options);

    const classes = hasDigit ? merge({
      digit: true,
      'carry-over': isCarryover,
      'underline': isClickable,
      'strike-through': isStrikeThrough
    }, additionalClasses) : null

    const tdClasses = classNames({
      'digit-cell': hasDigit,
      clickable: isClickable
    });
    return <td class={tdClasses}
      onClick={digitClick ? () => digitClick(digit) : false}
    ><div class={classNames(classes)}>{digit == null ? '' : digit}</div></td>;
  }

  numberRow(digits, maxDigitsLength, options = { prefix: null, isCarryover: false, isStrikeThrough: false }) {
    const { prefix, isCarryover, drawBottomBorder, digitClick, isStrikeThrough, additionalClasses } = options;
    const paddedDigits = digits.map(v => v);
    while (paddedDigits.length < maxDigitsLength) {
      paddedDigits.unshift(null);
    }
    const classes = classNames({
      'border-bottom': drawBottomBorder
    })

    return <tr class={classes}>
      {[
        prefix ? <td> {prefix}</td> : <td> &nbsp;</td>,
        ...paddedDigits.map(d => this.digit(d, { isCarryover, digitClick, isStrikeThrough, additionalClasses }))
      ]}
    </tr>;
  }

  renderProduct() {
    const components = this.state.problem.components();
    const { multiplicant, maxDigitsLength, multiplier, answer, digitRows } = components;
    const maxTableLength = PREFIX_COLUMNS_COUNT + maxDigitsLength;
    return (
      [
        this.numberRow(placeValues(maxDigitsLength), maxTableLength),
        ...(reverse(cloneDeep(digitRows))).map(({ carryOvers }, index) => {
          const isStrikeThrough = index > 0;
          return this.numberRow(carryOvers, maxTableLength, {
            isCarryover: true,
            isStrikeThrough,
            // prefix: isMobile ? '' : `${Math.pow(10, digitRows.length - 1 - index)}th`,

          });
        }),
        this.numberRow(multiplicant, maxTableLength, {
          additionalClasses: { 'b': true }
        }),
        this.numberRow(multiplier, maxTableLength, {
          drawBottomBorder: true,
          prefix: 'x',
          digitClick: (d) => {
            this.setState({ selectedDigit :  d});
            MicroModal.show('modal-1');
          },
          additionalClasses: { 'b': true }
        }),
        ...digitRows.map(({ product }, index) => {
          const isLastRow = index == (digitRows.length - 1);
          return this.numberRow(product, maxTableLength, {
            prefix: isLastRow ? '+' : null,
            drawBottomBorder: isLastRow,
          });
        }),
        this.numberRow(answer, maxTableLength, {
          drawBottomBorder: true,
          additionalClasses: { 'b': true }
        })
      ])
  }

  render() {
    return (
      <div class="container multiplication-demo no-select">
        <div class="row row-responsive">
          <div class="column column-sm-60 column-offset-sm-25">
            <table>
              {this.renderProduct()}
            </table>
          </div>
        </div>
        <div class="modal micromodal-slide" id="modal-1" aria-hidden="true">
    <div class="modal__overlay" tabindex="-1" data-micromodal-close>
      <div class="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
        <header class="modal__header">
          <h2 class="modal__title" id="modal-1-title">
          {this.state.selectedDigit} Table
          </h2>
          <button class="modal__close" aria-label="Close modal" data-micromodal-close></button>
        </header>
        <main class="modal__content" id="modal-1-content">
          <ul>
            {[...range(10).map(i => {
              return <div>{this.state.selectedDigit} x {i+1} = {this.state.selectedDigit*(i+1)}</div>
            })
            ]}
          </ul>
        </main>
      </div>
    </div>
  </div>
      </div>);
  }
}

export {Multiplication};

