import React from 'react';
import { connect } from 'react-redux';

import VehicleSlide from './components/VehicleSlide';
import VehicleSlidesOverlay from './components/VehicleSlidesOverlay'

class ExploreScroll extends React.Component {

  static propTypes = {
    availableVehicles: React.PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.state = {
      showParkingMapButton: true,
      showLanesMapButton: false
    };
  }

  render() {

    return (
      <section>
        <VehicleSlide vehicle="bike" />
        {/*{this.props.availableVehicles.map((vehicle, index) =>
          <VehicleSlide
            key={index}
            vehicle={vehicle} />
        )}*/}
        <VehicleSlidesOverlay
          showLanesMapButton={this.state.showLanesMapButton}
          showParkingMapButton={this.state.showParkingMapButton}
          goToNextVehicle={() => console.log("TODO")}
          goToPreviousVehicle={() => console.log("TODO")}
          nextVehicleName="rail"
          previousVehicleName="car"
          scrollToTop={() => console.log("TODO")}
          scrollToEnd={() => console.log("TODO")}
        />
      </section>
    )
  }

}

export default connect((state) => {
  return {
    availableVehicles: state.vehicles.get('availableVehicles')
  }
})(ExploreScroll);
