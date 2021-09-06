import { render, Component } from 'preact';
import Product from './models/product';
import { reverse, cloneDeep } from 'lodash';
import { randomNumber, placeValues } from './utils/math';
var classNames = require('classnames');

const PREFIX_COLUMNS_COUNT = 1; //for the signs

class App extends Component {
  constructor() {
    super();
    this.state = {
      problem: new Product({ multiplier: randomNumber(3), multiplicant: randomNumber(2) })
    };
  }

  digit(digit, options = { isCarryover: false }) {
    
    const { isCarryover, ignoreZeros} = options;
    const hasDigit = digit != null ;
    
    const classes = hasDigit ? {
      digit: true,
      'carry-over': isCarryover
    } : null

    const tdClasses = classNames({ 'digit-cell': hasDigit });
    return <td class={tdClasses}><div class={classNames(classes)}>{digit == null ? '' : digit}</div></td>;
  }

  numberRow(digits, maxDigitsLength, options = { prefix: null, isCarryover: false }) {
    const { prefix, isCarryover, drawBottomBorder } = options;
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
        ...paddedDigits.map(d => this.digit(d, { isCarryover }))
      ]}
    </tr>;
  }

  renderProduct() {
    const components = this.state.problem.components();
    console.log(components);
    const { multiplicant, maxDigitsLength, multiplier, answer, digitRows } = components;
    const maxTableLength = PREFIX_COLUMNS_COUNT + maxDigitsLength;
    return (
      [
        this.numberRow(placeValues(maxDigitsLength), maxTableLength),
        ...(reverse(cloneDeep(digitRows))).map(({ carryOvers }, index) => {
          return this.numberRow(carryOvers, maxTableLength, { 
            isCarryover: true,  
            prefix: `Carry: ${Math.pow(10, digitRows.length -1-index)}th`,
           });
        }),
        this.numberRow(multiplicant, maxTableLength),
        this.numberRow(multiplier, maxTableLength, { drawBottomBorder: true, prefix: 'x' }),
        ...digitRows.map(({ product }, index) => {
          const isLastRow = index == digitRows.length - 1;
          return this.numberRow(product, maxTableLength, {
            prefix: isLastRow ? '+' : null,
            drawBottomBorder: isLastRow
          });
        }),
        this.numberRow(answer, maxTableLength, {
          drawBottomBorder: true
        })
      ])
  }

  render() {
    return (
      <div class="container multiplication-demo no-select">
        <div class="row row-responsive">
          <div class="column column-xs-90 column-md-50 column-offset-md-25">
            <table>
              {this.renderProduct()}
            </table>
          </div>
        </div>
      </div>);
  }
}

function load() {
  render(<App />, document.querySelector('.app'));
}

window.addEventListener('load', load);
