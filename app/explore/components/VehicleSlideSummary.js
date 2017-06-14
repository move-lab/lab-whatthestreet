import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import { selectVehicle } from '../../statemanagement/VehiclesStateManagement';

import RoundedButton from '../../shared/components/RoundedButton';
import VehicleSpaceComparisonGraph from './VehicleSpaceComparisonGraph';

import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';

class VehicleSlideSummary extends React.PureComponent {

  static propTypes = {
    availableVehicles: React.PropTypes.object,
    activeVehicle: React.PropTypes.string,
    goToNextVehicle: React.PropTypes.func,
    cityLandmark: React.PropTypes.object,
    cumulativeArea: React.PropTypes.number,
    isRouting: React.PropTypes.bool
  }

  constructor() {
    super();

    this.getHumanArea = this.getHumanArea.bind(this);

    this.state = {
      FH : new Intl.NumberFormat('en-US')
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
      <section className="Container VehicleSlideSummary">
        <h3 className="LargeText">
          You ran out of {vehicleFormatted} Space
        </h3>
        <p className="Text">
          After scrolling over an area of {this.state.FH.format(Math.round(this.props.cumulativeArea))} m<sup>2</sup> you ran out of {vehicleFormatted} space. This area is about {this.getHumanArea(this.props.cumulativeArea)}.
        </p>
        <div className="Summary">
          <div className="SummaryCTAWrapper">
            <RoundedButton
              onClick={() => this.props.goToResults()}
              disabled={this.props.isRouting}
              loading={this.props.isRouting}
              arrowDown
            >
              Go to Results
            </RoundedButton>
            <div className="SummaryCTASeparator"></div>
            {this.getNextVehicleName() &&
              <RoundedButton
                small
                onClick={() => this.props.goToNextVehicle()}
              >
                Discover {this.formatFirstLetterUpperCase(this.getNextVehicleName())}
              </RoundedButton>
            }
          </div>
          <VehicleSpaceComparisonGraph mode="lanes" />
        </div>
        
        <style jsx>{`
          .Container {
            padding-top: 180px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .LargeText {
            font-size: 50px;
            font-weight: 400;
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
            width: 750px;
            text-align: center;
            margin: 0 auto;
            font-weight: 200;
          }

          .Summary {
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .SummaryCTAWrapper {
            display: flex;
            flex-direction: row;
            margin-bottom:50px; 
            margin-top: 30px;
            justify-content: center;
            align-items: center;
          }

          .SummaryCTASeparator {
            width: 20px;
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
    cumulativeArea: state.lanes.get('cumulativeArea')
  }
})(VehicleSlideSummary);
