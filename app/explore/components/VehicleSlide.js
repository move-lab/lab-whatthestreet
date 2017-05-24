import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Router from 'next/router';

// Styles
import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';

import { lanes, parkingspace } from '../../statemanagement/constants/identifiersConstants';

import {
  setScrollPosition,
  setLanesBottomPosition,
  setParkingBottomPosition
} from '../../statemanagement/ExploreStateManagement';

import { StreetActions, LaneActions, ParkingActions } from '../../statemanagement/actions';

import Lanes from './Lanes';
import ParkingSpaces from './ParkingSpaces';
import VehicleSlideSummary from './VehicleSlideSummary';

class VehicleSlide extends React.Component {

  static propTypes = {
    vehicle: React.PropTypes.string,
    citySlug: React.PropTypes.string,
    actualVehicle: React.PropTypes.string,
    showMap: React.PropTypes.func,
    onLoaded: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this.lastKnownScrollPosition = 0;

    this.onLaneSelected = this.onLaneSelected.bind(this);
    this.onPolygonSelected = this.onPolygonSelected.bind(this);
  }

  watchScrollPosition() {
    return window.requestAnimationFrame(() => {
      const newScrollPosition = document.body.scrollTop;
      if (this.lastKnownScrollPosition !== newScrollPosition) {
        this.lastKnownScrollPosition = newScrollPosition;
        this.props.dispatch(setScrollPosition(newScrollPosition));
      }
      this.watchScrollPosition();
    });
  }

  componentDidMount() {
    this.scrollPositionWatcher = this.watchScrollPosition();
    window.document.body.scrollTop = 0;
  }

  componentWillUnmount() {
    if (this.scrollPositionWatcher) {
      window.cancelAnimationFrame(this.scrollPositionWatcher);
    }
  }

  goToMapView(areaType, id) {
    this.props.showMap(
      `/${this.props.citySlug}/explore/${this.props.actualVehicle}/${areaType}/${id}`,
      {
        citySlug: this.props.citySlug,
        actualVehicle: this.props.actualVehicle,
        areaType,
        id
      }
    )
    // Router.push('/map', `/${this.props.citySlug}/explore/${this.props.actualVehicle}/${areaType}/${id}`, { shallow: true });
  }

  onPolygonSelected(data) {
    const { dispatch } = this.props;
    dispatch(ParkingActions.setParkingSpace(data.id, data.neighborhood, data.area));
  }

  onLaneSelected(data) {
    const { dispatch } = this.props;
    dispatch(LaneActions.setLane(data.name, data.neighborhood, data.length, data.area, data.coordinates));
    dispatch(StreetActions.setStreetId(data.id));
  }

  renderParkingSpaces() {
    if (this.props.vehicle === 'rails') {
      // TODO SPECIAL CASE RAILS NEED TO CALL onPolygonselected
      return this.renderLanes(true)
    } else {
      return (
        <ParkingSpaces
          city="berlin"
          vehicle={this.props.vehicle}
          onPathClicked={(data, path) => this.goToMapView('parking', data.id)}
          registerItemsForSearch={(items) => console.log(`TODO registerItemsForSearch`)}
          onLoaded={(scrollHeight) => {
            this.props.onLoaded(parkingspace);
            this.props.dispatch(setParkingBottomPosition(scrollHeight));
          }}
          onItemSelected={(isLast) => console.log('TODO onItemSelected()')}
          onPolygonSelected={this.onPolygonSelected}
        />
      );
    }
    
  }

  renderLanes(parkingMode) {
    // TODO REPLACE BERLIN BY DYNAMIC CITY
    return (
      <Lanes
        city="berlin"
        vehicle={this.props.vehicle}
        onPathClicked={(data, path) => this.goToMapView('lanes', data.id)}
        registerItemsForSearch={(items) => console.log(`TODO registerItemsForSearch`)}
        onLoaded={(scrollHeight) => {
          this.props.onLoaded(lanes)
          if (parkingMode) {
            this.props.dispatch(setParkingBottomPosition(scrollHeight));
          } else {
            this.props.dispatch(setLanesBottomPosition(scrollHeight));
          }
        }}
        onItemSelected={(isLast) => {
          {/*console.log('TODO onItemSelected()')*/}
        }}
        onLaneSelected={this.onLaneSelected}
      />
    )
  }

  render() {
    return (
      <div className="SWrapper">
        <div
          className="MainContainer"
          ref={(element) => this.elMainContainer = element}
        >
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
          <VehicleSlideSummary />
        </div>
        <style jsx>{`
          .SWrapper {
            overflow: auto;
            transform: translateZ(0);
            will-change: transform;
          }

          .MainContainer {
            position: relative;
            background-color: ${COLORS.ColorWhite};
            color: ${COLORS.ColorForegroundOrange};
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
            align-items: center;
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
            margin-top: 0;
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

export default connect((state) => {
  return {
    actualVehicle: state.vehicles.get('vehicle'),
    citySlug: state.city.getIn(['actual_city','slug'])
  }
})(VehicleSlide);
