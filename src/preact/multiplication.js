import { Component } from 'preact';
import {
  reverse, cloneDeep, merge, range,
} from 'lodash';
import MicroModal from 'micromodal';
import PropTypes from 'prop-types';
import { randomNumber, placeValues, multiplicationRow } from './utils/math';
import Product from './models/product';

const classNames = require('classnames');

const PREFIX_COLUMNS_COUNT = 1; // for the signs

class Multiplication extends Component {
  static digit(digit, options = { isCarryover: false }) {
    const {
      isCarryover, digitClick, isStrikeThrough, additionalClasses,
    } = options;
    const hasDigit = digit != null;
    const isClickable = !!digitClick;

    const classes = hasDigit ? merge({
      digit: true,
      'carry-over': isCarryover,
      underline: isClickable,
      'strike-through': isStrikeThrough,
    }, additionalClasses) : null

    const tdClasses = classNames({
      'digit-cell': hasDigit,
      clickable: isClickable,
    });
    return (
      <td
        className={tdClasses}
        onClick={digitClick ? () => {
          return digitClick(digit)
        } : false}
      >
        <div className={classNames(classes)}>{digit == null ? '' : digit}</div>
      </td>
    );
  }

  static numberRow(digits, maxDigitsLength, options = {
    prefix: null, isCarryover: false, isStrikeThrough: false,
  }) {
    const {
      prefix, isCarryover, drawBottomBorder, digitClick, isStrikeThrough, additionalClasses,
    } = options;
    const paddedDigits = digits.map((v) => {
      return v
    });
    while (paddedDigits.length < maxDigitsLength) {
      paddedDigits.unshift(null);
    }
    const classes = classNames({
      'border-bottom': drawBottomBorder,
    })

    return (
      <tr className={classes}>
        {[
          prefix ? (
            <td>
              {' '}
              {prefix}
            </td>
          ) : <td> &nbsp;</td>,
          ...paddedDigits.map((d) => {
            return Multiplication.digit(d, {
              isCarryover, digitClick, isStrikeThrough, additionalClasses,
            })
          }),
        ]}
      </tr>
    );
  }

  constructor() {
    super();
    this.state = {
      problem: new Product({ multiplier: randomNumber(3), multiplicant: randomNumber(2) }),
    };
  }

  componentWillMount() {
    const {multiplier, multiplicant} = this.props;
    this.setState({
      problem: new Product({ multiplier, multiplicant }),
    });
  }

  componentWillReceiveProps({multiplier, multiplicant}) {
    console.log('derived state.');
    this.setState({
      problem: new Product({ multiplier, multiplicant }),
    });
  }

  renderProduct() {
    console.log(this.props);
    const { problem } = this.state;
    const components = problem.components();
    const {
      multiplicant, maxDigitsLength, multiplier, answer, digitRows,
    } = components;
    const maxTableLength = PREFIX_COLUMNS_COUNT + maxDigitsLength;
    return (
      [
        Multiplication.numberRow(placeValues(maxDigitsLength), maxTableLength),
        ...(reverse(cloneDeep(digitRows))).map(({ carryOvers }, index) => {
          const isStrikeThrough = index > 0;
          return Multiplication.numberRow(carryOvers, maxTableLength, {
            isCarryover: true,
            isStrikeThrough,
            // prefix: isMobile ? '' : `${Math.pow(10, digitRows.length - 1 - index)}th`,

          });
        }),
        Multiplication.numberRow(multiplicant, maxTableLength, {
          additionalClasses: { b: true },
        }),
        Multiplication.numberRow(multiplier, maxTableLength, {
          drawBottomBorder: true,
          prefix: 'x',
          digitClick: (d) => {
            this.setState({ selectedDigit: d });
            MicroModal.show('modal-1');
          },
          additionalClasses: { b: true },
        }),
        ...digitRows.map(({ product }, index) => {
          const isLastRow = index === (digitRows.length - 1);
          return Multiplication.numberRow(product, maxTableLength, {
            prefix: isLastRow ? '+' : null,
            drawBottomBorder: isLastRow,
          });
        }),
        Multiplication.numberRow(answer, maxTableLength, {
          drawBottomBorder: true,
          additionalClasses: { b: true },
        }),
      ])
  }

  render() {
    const { selectedDigit } = this.state;
    return (
      <div className="container multiplication-demo no-select">
        <div className="row row-responsive">
          <div className="column column-sm-60 column-offset-sm-25">
            <table>
              {this.renderProduct()}
            </table>
          </div>
        </div>
        <div className="modal micromodal-slide" id="modal-1" aria-hidden="true">
          <div className="modal__overlay" tabIndex="-1" data-micromodal-close>
            <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
              <header className="modal__header">
                <h2 className="modal__title" id="modal-1-title">
                  {selectedDigit}
                  {' '}
                  Table
                </h2>
                <button type="button" className="modal__close" aria-label="Close modal" data-micromodal-close />
              </header>
              <main className="modal__content" id="modal-1-content">
                <ul>
                  {[...range(10).map((i) => {
                    return multiplicationRow(selectedDigit, i);
                  }),
                  ]}
                </ul>
              </main>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Multiplication.defaultProps = {
  multiplicant: 42,
  multiplier: 24,
};

Multiplication.propTypes = {
  multiplicant: PropTypes.number,
  multiplier: PropTypes.number,
};
export default Multiplication;
