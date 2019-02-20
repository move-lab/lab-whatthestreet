import PropTypes from 'prop-types';
import React from 'react';

import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';

class Bar extends React.Component {

  static propTypes = {
    guess: PropTypes.number,
    actual: PropTypes.number,
    others: PropTypes.array,
  }

  renderResultBar = () => (
    <div className="Container">
      <div className="Filled" style={{ height: `${this.props.guess * 320}px` }} />
      <div className="UnFilled" style={{ height: `${320 - (this.props.guess * 320)}px` }} />
      <div className="Actual" style={{ top: `${this.props.actual * 320}px` }} />
    </div>
  )

  renderComparisonBar = () => (
    <div className="Container">
      <div className="UnFilled" style={{ height: '320px' }} />
      <div className="Guess" style={{ top: `${this.props.guess * 320}px` }} />
      <div className="Actual" style={{ top: `${this.props.actual * 320}px` }} />
      {this.props.others.map((position, i) => <div className="Others" key={i} style={{ top: `${position * 320}px` }} />)}
    </div>
  )

  render() {
    return (
      <div className="Bar">
        {this.props.others != null ? this.renderComparisonBar() : this.renderResultBar()}
        <style jsx>{`
          .Bar > :global(.Container) {
            position: relative;
          }

          .Bar :global(.Filled) {
            width: ${METRICS.MetricsBarWidth};
            background-color: ${COLORS.ColorForegroundOrange};
          }

          .Bar :global(.UnFilled) {
            width: ${METRICS.MetricsBarWidth};
            background-color: ${COLORS.ColorChartBar};
          }

          .Bar :global(.Guess) {
            width: ${METRICS.MetricsBarWidth};
            height: 4px;
            background-color: ${COLORS.ColorForegroundOrange};
            position: absolute;
            z-index: 100;
          }

          .Bar :global(.Actual) {
            width: ${METRICS.MetricsBarWidth};
            height: 3px;
            background-color: ${COLORS.ColorBlack};
            position: absolute;
            z-index: 10;
          }

          .Bar :global(.Others) {
            width: ${METRICS.MetricsBarWidth};
            height: 1px;
            background-color: rgba(0, 0, 255, 0.2);
            position: absolute;
          }
        `}</style>
      </div>
    )
  }
}

export default Bar;
