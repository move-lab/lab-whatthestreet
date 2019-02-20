import PropTypes from 'prop-types';
import React from 'react';

// Images
const ArrowActualData = '/static/icons/Arrow_ActualData.svg';

import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';

class ActualValueArrow extends React.PureComponent {

  static propTypes = {
    data: PropTypes.number,
    city: PropTypes.string,
    position: PropTypes.string,
    offset: PropTypes.number,
  }

  renderAbove = () => (
    <div className="Container" style={{ top: `${((this.props.data) * 320)}px` }} >
      <p className="Text" style={{ marginBottom: '20px' }}>
        Actual
        <br />
        <span>{this.props.city}</span>
      </p>
      <img className="Arrow" alt="ArrowActualData" src={ArrowActualData} style={{ transform: 'scale(1, -1)' }} />
      <style jsx>{`
        .Container {
          position: absolute;
          left: 40px;
        }

        .Arrow {
          margin-bottom: -10px;
        }

        .Text {
          font-family: 'Sign-Painter';
          font-size: 23px;
          color: ${COLORS.ColorBlack};
          transform: rotate(-24deg);
          margin: 0;
          line-height: 1;
        }
      `}</style>
    </div>
  )

  renderBelow = () => (
    <div className="Container" style={{ top: `${(145 + (this.props.data * 320) + this.props.offset)}px` }}>
      <img className="Arrow" alt="ArrowActualData" src={ArrowActualData} />
      <p className="Text">
        Actual
        <br />
        <span>{this.props.city}</span>
      </p>
      <style jsx>{`
        .Container {
          position: absolute;
          left: 40px;
        }

        .Arrow {
          margin-bottom: -10px;
        }

        .Text {
          font-family: 'Sign-Painter';
          font-size: 23px;
          color: ${COLORS.ColorBlack};
          transform: rotate(-24deg);
          margin: 0;
          line-height: 1;
        }
      `}</style>
    </div>
  )

  render = () => this.props.position === 'above' ? this.renderAbove() : this.renderBelow();
}

export default ActualValueArrow;
