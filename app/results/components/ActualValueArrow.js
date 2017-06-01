import React from 'react';

// Images
const ArrowActualData = '/static/icons/Arrow_ActualData.svg';

import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';

class ActualValueArrow extends React.PureComponent {

  static propTypes = {
    data: React.PropTypes.number,
    city: React.PropTypes.string,
    position: React.PropTypes.string,
    offset: React.PropTypes.number,
  }

  renderAbove = () => (
    <div className="Container" style={{ top: `${-25 + ((this.props.data) * 320)}px` }} >
      <p className="Text" style={{ marginBottom: '20px' }}>
        Actual
        <br />
        <span>{this.props.city}</span>
      </p>
      <img className="Arrow" alt="ArrowActualData" src={ArrowActualData} style={{ transform: 'scale(1, -1)' }} />
      <style jsx>{`
        .Container {
          position: absolute;
          left: calc(${METRICS.MetricsContentPadding} / 4);
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
    <div className="Container" style={{ top: `${(105 + (this.props.data * 320) + this.props.offset)}px` }}>
      <img className="Arrow" alt="ArrowActualData" src={ArrowActualData} />
      <p className="Text">
        Actual
        <br />
        <span>{this.props.city}</span>
      </p>
      <style jsx>{`
        .Container {
          position: absolute;
          left: calc(${METRICS.MetricsContentPadding} / 4);
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
