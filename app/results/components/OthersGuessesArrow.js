import PropTypes from 'prop-types';
import React from 'react';
import { prefixURL } from '../../../utils/url';

// Images
const ArrowOtherGuess = prefixURL('/static/icons/Arrow_OtherCity.svg');

class OthersGuessesArrow extends React.PureComponent {

  static propTypes = {
    data: PropTypes.array,
    position: PropTypes.string,
    offset: PropTypes.number,
  }

  getSortedData = (data) => data.sort((a, b) => {
    if (a.car > b.car) return 1;
    if (a.car < b.car) return -1;
    return 0;
  })

  renderAbove() {
    const secondItemOfSortedData = this.getSortedData(this.props.data)[1];
    return (
      <div className="Container" style={{ bottom: `${145 + (secondItemOfSortedData && secondItemOfSortedData.car * 320)}px` }}>
        <p className="Text">
          Other<br />People’s<br />Guesses
        </p>
        <img alt="ArrowOtherGuess" src={ArrowOtherGuess} />
        <style jsx>{`
          .Container {
            position: absolute;
            left: 50px;
          }

          .Text {
            font-family: 'Sign-Painter';
            font-size: 23px;
            color: blue;
            transform: rotate(-13deg);
            margin: 0 0 10px 0;
            margin-left: -10px;
            line-height: 1;
          }
      `}</style>
      </div>
    );
  }

  renderBelow() {
    const lastItemOfSortedData = this.getSortedData(this.props.data)[this.props.data.length - 1];
    return (
      <div className="Container" style={{ top: `${145 + (lastItemOfSortedData && lastItemOfSortedData.car * 320) + this.props.offset}px` }}>
        <img alt="ArrowOtherGuess" src={ArrowOtherGuess} style={{ transform: 'scale(1, -1)' }} />
        <p className="Text">
          Other<br />People’s<br />Guesses
        </p>
        <style jsx>{`
          .Container {
            position: absolute;
            left: 50px;
          }

          .Text {
            font-family: 'Sign-Painter';
            font-size: 23px;
            color: blue;
            transform: rotate(-13deg);
            margin: 0 0 10px 0;
            margin-left: -10px;
            line-height: 1;
          }
      `}</style>
      </div>
    );
  }

  render = () => (this.props.position === 'below' ? this.renderBelow() : this.renderAbove())
}

export default OthersGuessesArrow;

