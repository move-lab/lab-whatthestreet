import PropTypes from 'prop-types';
import React from 'react';

// Images
const ArrowYourGuess = '/static/icons/Arrow_YourGuess.svg';

import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';

/**
 * Renders a Arrow that indecates Guessposition
 */
class YourGuessArrow extends React.PureComponent {

  static propTypes = {
    data: PropTypes.number,
    area: PropTypes.bool,
  }

  render() {
    return (
      <div className="Container" style={{ bottom: `${(this.props.area ? -10 : -10) + ((1 - this.props.data) * 320)}px` }}>
        <p className="Text">
          Your<br />Guess
        </p>
        <img className="Arrow" alt="ArrowYourGuess" src={ArrowYourGuess} />
        <style jsx>{`
          .Container {
            position: absolute;
            left: 630px;
          }

          .Arrow {
            margin-bottom: -10px;
          }

          .Text {
            font-family: 'Sign-Painter';
            font-size: 23px;
            color: ${COLORS.ColorForegroundOrange};
            transform: rotate(-38deg);
            margin: 0;
            line-height: 1;
            margin-left: 45px;
          }
        `}</style>
      </div>
    );
  }
}

export default YourGuessArrow;
