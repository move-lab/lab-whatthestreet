import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import { selectVehicle } from '../../statemanagement/VehiclesStateManagement';

import VehicleSpaceComparisonGraph from './VehicleSpaceComparisonGraph';

import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';

class VehicleSlideEndOfParkingSummary extends React.PureComponent {

  static propTypes = {
    availableVehicles: React.PropTypes.object,
    activeVehicle: React.PropTypes.string,
    goToNextVehicle: React.PropTypes.func,
    cityLandmark: React.PropTypes.object,
    cumulativeArea: React.PropTypes.number
  }

  constructor() {
    super();

    this.getHumanArea = this.getHumanArea.bind(this);

    this.state = {
      FH : new Intl.NumberFormat('en-US')
    }
  }

  shouldComponentUpdate() {
    // do not update after reaching end of parking space
    if(!this.props.parkingInFocus) {
      return false;
    } else {
      return true;
    }
  }

  formatFirstLetterUpperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getNextVehicleName() {
    const currentIndex = this.props.availableVehicles.indexOf(this.props.activeVehicle);
    if(currentIndex + 1 < this.props.availableVehicles.size) {
      const nextVehicule = this.props.availableVehicles.get(currentIndex + 1);
      return nextVehicule;
    } else {
      return null;
    }
  }

  getHumanArea(area) {
    const cityLandmarkArea = this.props.cityLandmark.area;
    if (area < 225) {
      return `${this.state.FH.format(area)} m²`;
    } else if (area < 71400) {
      const playgroundArea = 225;
      const nbPlayground = Math.round( area / playgroundArea * 10 ) / 10;
      const playgroundLabel = nbPlayground > 1 ? 'Playgrounds' : 'Playground';
      return `${this.state.FH.format(nbPlayground)} ${playgroundLabel}`;
    } else if (area < cityLandmarkArea) {
      const soccerFieldArea = 7140;
      const nbSoccerField = Math.round( area / soccerFieldArea * 10 ) / 10;
      const soccerFieldLabel = nbSoccerField > 1 ? 'Soccer Fields' : 'Soccer Field';
      return `${this.state.FH.format(nbSoccerField)} ${soccerFieldLabel}`;
    } else {
      const nbCityLandmark = Math.round( area / cityLandmarkArea * 10 ) / 10;
      const cityLandmarkLabel = this.props.cityLandmark.name;
      return `${this.state.FH.format(nbCityLandmark)} ${cityLandmarkLabel}`;
    }
  }

  render() {
    const vehicleFormatted = this.formatFirstLetterUpperCase(this.props.activeVehicle);

    return (
      <section className="Container VehicleSlideEndOfParkingSummary">
        <h3 className="LargeText">
          {vehicleFormatted} Parking is over
        </h3>
        <p className="Text">
          After scrolling over an area of {this.state.FH.format(Math.round(this.props.cumulativeArea))} m<sup>2</sup> you ran out of {this.props.activeVehicle} parking. This area is about {this.getHumanArea(this.props.cumulativeArea)}.
        </p>
        <div className="Separator" />
        <VehicleSpaceComparisonGraph mode="parking" />
        <style jsx>{`
          .Container {
            padding-top: 180px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          
          .Separator {
            margin-top: 50px;
          }

          .LargeText {
            font-size: 50px;
            text-align: center;
            color: ${COLORS.ColorForegroundText};
            width: 350px;
            text-align: center;
            margin: 0 auto;
            margin-top: 30px;
            line-height: 1.5em;
            margin-bottom: 40px;
          }

          .Text {
            font-size: 30px;
            color: ${COLORS.ColorForegroundText};
            width: 550px;
            text-align: center;
            margin: 0 auto;
          }
        `}</style>
      </section>
    );
  }
}

export default connect((state) => {
  return {
    availableVehicles: state.vehicles.get('availableVehicles'),
    activeVehicle: state.vehicles.get('vehicle'),
    isRouting: state.app.get('isRouting'),
    cityLandmark: state.cityMeta.getIn(['metaData','landmark']) && state.cityMeta.getIn(['metaData','landmark']).toJS(),
    cumulativeArea: state.lanes.get('cumulativeArea'),
    parkingInFocus: state.explore.get('parkingInFocus')
  }
})(VehicleSlideEndOfParkingSummary);
