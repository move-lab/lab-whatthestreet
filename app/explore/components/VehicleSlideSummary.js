import React from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import { selectVehicle } from '../../statemanagement/VehiclesStateManagement';

import RoundedButton from '../../shared/components/RoundedButton';
import VehicleSpaceComparisonGraph from './VehicleSpaceComparisonGraph';

import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';

class VehicleSlideSummary extends React.Component {

  static propTypes = {
    availableVehicles: React.PropTypes.object,
    activeVehicle: React.PropTypes.string,
    goToNextVehicle: React.PropTypes.func
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

  render() {
    const vehicleFormatted = this.formatFirstLetterUpperCase(this.props.activeVehicle);

    return (
      <section className="Container VehicleSlideSummary">
        <h3 className="LargeText">
          You ran out of {vehicleFormatted} Space
        </h3>
        <p className="Text">
          After scrolling over an area of 2999 m<sup>2</sup> you ran out of {vehicleFormatted} space. This area is about half of lower Manhatten. This also equals 292 flats
        </p>
        <RoundedButton
          onClick={() => this.props.goToResults()}
        >
          Results
        </RoundedButton>
        {this.getNextVehicleName() &&
          <RoundedButton
            onClick={() => this.props.goToNextVehicle()}
          >
            Discover {this.formatFirstLetterUpperCase(this.getNextVehicleName())}
          </RoundedButton>
        }
        <VehicleSpaceComparisonGraph
          activeVehicle={this.props.activeVehicle}
        />
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
        `}</style>
      </section>
    );
  }
}

export default connect((state) => {
  return {
    availableVehicles: state.vehicles.get('availableVehicles'),
    activeVehicle: state.vehicles.get('vehicle')
  }
})(VehicleSlideSummary);
