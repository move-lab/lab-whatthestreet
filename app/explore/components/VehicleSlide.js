import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import keyBy from 'lodash.keyby';

import Router from 'next/router';

// Styles
import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';

import { computeSvgHeights } from '../../shared/utils/svgHeights';

import { lanes, parkingspace } from '../../statemanagement/constants/identifiersConstants';

import {
  setScrollPosition,
  setLanesBottomPosition,
  setParkingBottomPosition
} from '../../statemanagement/ExploreStateManagement';

import { setParkingData } from '../../statemanagement/MapStateManagement';

import { setData } from '../../statemanagement/SearchableStreetsStateManagement';

import { LaneActions, ParkingActions } from '../../statemanagement/actions';

import Lanes from './Lanes';
import ParkingSpaces from './ParkingSpaces';
import VehicleSlideEndOfParkingSummary from './VehicleSlideEndOfParkingSummary';

class VehicleSlide extends React.PureComponent {

  static propTypes = {
    vehicle: React.PropTypes.string,
    citySlug: React.PropTypes.string,
    actualVehicle: React.PropTypes.string,
    parkingLoaded: React.PropTypes.bool,
    showMap: React.PropTypes.func,
    onLoaded: React.PropTypes.func
  }

  constructor(props) {
    super(props);

    this.lastKnownScrollPosition = 0;

    this.onLaneSelected = this.onLaneSelected.bind(this);
    this.onPolygonSelected = this.onPolygonSelected.bind(this);
    this.onParkingClicked = this.onParkingClicked.bind(this);
    this.registerItemsForSearch = this.registerItemsForSearch.bind(this);
    this.onParkingLoaded = this.onParkingLoaded.bind(this);
    this.onItemSelected = this.onItemSelected.bind(this);
    this.onLaneClicked = this.onLaneClicked.bind(this);
    this.onLaneLoaded = this.onLaneLoaded.bind(this);
    this.onLaneParkingClicked = this.onLaneParkingClicked.bind(this);
    this.onLaneParkingSelected = this.onLaneParkingSelected.bind(this);
  }

  watchScrollPosition() {
    return window.requestAnimationFrame(() => {
      const newScrollPosition = window.scrollY || document.documentElement.scrollTop;
      // Potential optim, only update if we moved up / down more than 10px
      // if (newScrollPosition > (this.lastKnownScrollPosition + 10) || 
      // newScrollPosition < (this.lastKnownScrollPosition - 10)) {
      if (this.lastKnownScrollPosition !== newScrollPosition) {
        this.lastKnownScrollPosition = newScrollPosition;
        this.props.dispatch(setScrollPosition(newScrollPosition));
      }
      this.watchScrollPosition();
    });
  }

  componentDidMount() {
    this.scrollPositionWatcher = this.watchScrollPosition();
    // Because firefox / chrome doesn't work with the same API
    // Hack because of chrome and firefox not behaving the same way
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // Some hack sometimes the scrollTop doesn't work
    setTimeout(() => {
      // Hack because of chrome and firefox not behaving the same way
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, 50);
  }

  componentWillUnmount() {
    if (this.scrollPositionWatcher) {
      window.cancelAnimationFrame(this.scrollPositionWatcher);
    }
  }

  goToMapView(areaType, id, data, railParkingMode) {
    this.props.showMap({
      citySlug: this.props.citySlug,
      actualVehicle: this.props.actualVehicle,
      areaType,
      id,
      data,
      railParking: railParkingMode
    });
  }

  onPolygonSelected(data) {
    const { dispatch } = this.props;
    dispatch(ParkingActions.setParkingSpace(data));
  }

  onLaneSelected(data) {
    const { dispatch } = this.props;
    dispatch(LaneActions.setLane(data.id, data.name, data.neighborhood, data.length, data.area, data.cumulativeArea));
  }

  onLaneClicked(data, path) {
    this.goToMapView('lanes', data.id);
  }

  onLaneParkingSelected(data) {
    const { dispatch } = this.props;
    // TODO HERE SET SPECIAL Parking Lane in order to display in header.
    dispatch(LaneActions.setLaneRailParking(data.id, data.name, data.neighborhood, data.length, data.area, data.cumulativeArea));
  }

  onLaneParkingClicked(data, path) {
    this.goToMapView('parking', data.id, data, true);
  }

  onParkingClicked(data, path) {
    this.goToMapView('parking', data.id, data)
  }

  onParkingLoaded(scrollHeight) {
    this.props.onLoaded(parkingspace);
    this.props.dispatch(setParkingBottomPosition(scrollHeight));
  }
  
  onLaneLoaded(scrollHeight) {
    this.props.onLoaded(lanes)
    this.props.dispatch(setLanesBottomPosition(scrollHeight));
  }

  registerItemsForSearch(streets) {
    // Only register car lanes
    if(this.props.vehicle === 'car') {
      this.props.dispatch(setData(keyBy(streets, (street) => street.id)));
    }
  }

  onItemSelected() {
    // TODO MAYBE DELETE ?
  }

  renderParkingSpaces() {
    return (
      <ParkingSpaces
        city={this.props.citySlug}
        vehicle={this.props.vehicle}
        onPathClicked={this.onParkingClicked}
        registerItemsForSearch={this.registerItemsForSearch}
        onLoaded={this.onParkingLoaded}
        onItemSelected={this.onItemSelected}
        onPolygonSelected={this.onPolygonSelected}
      />
    );
  }

  renderLanes(parkingMode) {
    // Special case of rails
    if(parkingMode) {
      return (
        <Lanes
          city={this.props.citySlug}
          vehicle={this.props.vehicle}
          onPathClicked={this.onLaneParkingClicked}
          registerItemsForSearch={this.registerItemsForSearch}
          modeParking
          onLoaded={this.onParkingLoaded}
          onItemSelected={this.onItemSelected}
          onLaneSelected={this.onLaneParkingSelected}
        />
      )
    } else {
      return (
        <Lanes
          city={this.props.citySlug}
          vehicle={this.props.vehicle}
          onPathClicked={this.onLaneClicked}
          registerItemsForSearch={this.registerItemsForSearch}
          onLoaded={this.onLaneLoaded}
          onItemSelected={this.onItemSelected}
          onLaneSelected={this.onLaneSelected}
        />
      )
    }
    
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
              {this.props.vehicle === 'rail' &&
                this.renderLanes(true)
              }
              {this.props.vehicle !== 'rail' &&
                this.renderParkingSpaces()
              }
              {this.props.parkingLoaded && this.props.parkingSvgHeight > 0 &&
                <VehicleSlideEndOfParkingSummary />
              }
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

          .ContainerLeft {
            align-items: center;
          }

          .ContainerRight {
            align-items: flex-end;
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
            font-weight: 500;
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
    citySlug: state.city.getIn(['actual_city','slug']),
    parkingSvgHeight: computeSvgHeights(state.cityMeta).getIn(['bike', 'parking', 'height'])
  }
})(VehicleSlide);
