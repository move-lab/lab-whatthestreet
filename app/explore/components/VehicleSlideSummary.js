import React from 'react';
import Router from 'next/router';

import { selectVehicle } from '../../statemanagement/VehiclesStateManagement';

import RoundedButton from '../../shared/components/RoundedButton';
import VehicleSpaceComparisonGraph from './VehicleSpaceComparisonGraph';

import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';

class VehicleSlideSummary extends React.Component {

  static propTypes = {
    availableVehicles: React.PropTypes.array,
    activeVehicle: React.PropTypes.string
  }

  formatFirstLetterUpperCase(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getNextVehicleName() {
    const currentIndex = this.props.availableVehicles.indexOf(this.props.vehicle);
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
      <section className="Container">
        <h3 className="LargeText">
          You ran out of {vehicleFormatted} Space
        </h3>
        <p className="Text">
          After scrolling over an area of 2999 m<sup>2</sup> you ran out of {vehicleFormatted} space. This area is about half of lower Manhatten. This also equals 292 flats
        </p>
        <RoundedButton
          onClick={() => console.log('TODO')}
        >
          Results
        </RoundedButton>
        {this.getNextVehicleName() &&
          <RoundedButton
            onClick={() => console.log('TODO')}
          >
            Discover {this.formatFirstLetterUpperCase(this.getNextVehicleName())}
          </RoundedButton>
        }
        <VehicleSpaceComparisonGraph
          activeVehicle={this.props.activeVehicle}
        />
        <style jsx>{`
          .Container {
            padding-top: ${METRICS.MetricsSectionPadding};
            padding-bottom: ${METRICS.MetricsContentPadding};
          }
        `}</style>
      </section>
    );
  }
}

export default VehicleSlideSummary;
