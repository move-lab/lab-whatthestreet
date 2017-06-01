import React from 'react';

import * as identifiers from '../../statemanagement/constants/identifiersConstants';

// Components
import Bar from './Bar';
import VehicleIcon from '../../shared/components/VehicleIcon';


import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';


class BarChart extends React.PureComponent {

  static propTypes = {
    own: React.PropTypes.objectOf(React.PropTypes.number),
    others: React.PropTypes.arrayOf(React.PropTypes.object),
    actual: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
  }

  renderResult = (key) => (
    <div className="Column" key={`bar${key}`}>
      <Bar guess={this.props.own[key]} actual={this.props.actual[key]} others={this.props.others && this.props.others.map((item) => (item[key]))} />
      <style jsx>{`
        .Column {
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          width: ${METRICS.MetricsBarWidth};
          background-color: white;
        }
      `}</style>
    </div>
  )

  render = () => (
    <div className="Chart">
      <div className="ChartHeader">
        <div className="Column">
          <VehicleIcon className="Icon" vehicle={identifiers.car} />
          <p className="Header">
            Cars
          </p>
        </div>
        <div className="Column">
          <VehicleIcon className="Icon" vehicle={identifiers.rail} />
          <p className="Header">
            Rails
          </p>
        </div>
        <div className="Column">
          <VehicleIcon className="Icon" vehicle={identifiers.bike} />
          <p className="Header">
            Bikes
          </p>
        </div>
      </div>
      <div className="ChartBody">
        { this.renderResult(identifiers.car) }
        { this.renderResult(identifiers.rail) }
        { this.renderResult(identifiers.bike) }
      </div>
      <style jsx>{`
        .Chart {
          width: 480px;
        }

        .ChartHeader {
          background-color: white;
          width: 480px;
          height: 160px;
          display: flex;
          justify-content: space-between;
        }

        .ChartHeader .Column {
          padding-top: 40px;
        }

        .ChartBody {
          display: flex;
          width: 480px;
          justify-content: space-between;
        }

        .Column {
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          width: ${METRICS.MetricsBarWidth};
          background-color: white;
        }

        .Icon {
          padding-top: 40px;
        }

        .Header {
          font-size: 23px;
          line-height: 29px;
          margin: 15px 0 0 0;
        }
      `}</style>
    </div>
  )
}

export default BarChart;
