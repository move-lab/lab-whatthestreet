import React from 'react';
import PropTypes from 'prop-types';

// Styles
import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';

import { lanes, parkingspace } from '../../statemanagement/constants/identifiersConstants';

import Lanes from './Lanes';
import ParkingSpaces from './ParkingSpaces';

class VehicleSlide extends React.Component {

  static propTypes = {
    vehicle: React.PropTypes.string,
    onLoaded: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderParkingSpaces() {
    if (this.props.vehicle === 'rails') {
      return this.renderLanes()
    } else {
      return (
        <ParkingSpaces
          city="berlin"
          vehicle={this.props.vehicle}
          onPathClicked={(data, path) => console.log(`TODO onPathClicked() ${data} ${path}`)}
          registerItemsForSearch={(items) => console.log(`TODO registerItemsForSearch ${items}`)}
          onLoaded={() => this.props.onLoaded(parkingspace)}
          onItemSelected={(isLast) => console.log('TODO onItemSelected()')}
          onPathSelected={(data) => console.log('TODO onPathSelected()')}
        />
      );
    }
    
  }

  renderLanes() {
    // TODO REPLACE BERLIN BY DYNAMIC CITY
    return (
      <Lanes
        city="berlin"
        vehicle={this.props.vehicle}
        onPathClicked={(data, path) => console.log(`TODO onPathClicked() ${data} ${path}`)}
        registerItemsForSearch={(items) => console.log(`TODO registerItemsForSearch ${items}`)}
        onLoaded={() => this.props.onLoaded(lanes)}
        onItemSelected={(isLast) => console.log('TODO onItemSelected()')}
        onPathSelected={(data) => console.log('TODO onPathSelected()')}
      />
    )
  }

  render() {
    return (
      <div className="SWrapper">
        <div className="MainContainer">
          <div className="Wrapper">
            <div className="Container ContainerLeft">
              <h3 className="Title">
                {this.props.vehicle.charAt(0).toUpperCase() + this.props.vehicle.slice(1)} Parking
              </h3>
              {this.renderParkingSpaces()}
            </div>
            <div className="ToolBoxColumn" />
            <div className="Container ContainerRight">
              <h3 className="Title">
                {this.props.vehicle.charAt(0).toUpperCase() + this.props.vehicle.slice(1)} Lanes
              </h3>
              {this.renderLanes()}
            </div>
          </div>
        </div>
        <style jsx>{`
          .SWrapper {
            height: 100vh;
            overflow: auto;
            transform: translateZ(0);
            will-change: transform;
          }

          .MainContainer {
            position: relative;
            background-color: ${COLORS.ColorWhite};
            color: ${COLORS.ColorForegroundOrange};
            min-height: 100vh;
            margin: 0 auto;
          }

          .Wrapper {
            margin: 0 auto;
            width: ${METRICS.MetricsContentWidth};
            display: flex;
            align-items: flex-start;
            color: ${COLORS.ColorForegroundText};
          }

          .Container {
            flex-basis: 45%;
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            padding-bottom: 55px;
          }

          .ContainerLeft {
            align-items: flex-end;
          }

          .ContainerRight {
            align-items: flex-start;
          }

          .ToolBoxColumn {
            flex-grow: 0;
            flex-shrink: 1;
            flex-basis: 50px;
            display: flex;
            align-items: flex-end;
            padding: 10px;
            height: 800px;
          }

          .Title {
            font-size: 50px;
            text-align: center;
            width: 600px;
            font-weight: 400;
            color: ${COLORS.ColorForegroundOrange};
            height: auto;
            padding-top: ${METRICS.MetricsTopSpace};
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 40px;
          }

        `}</style>
      </div>
    )
  }

}

// TODO CONNECT AND GET:
// city

export default VehicleSlide;
