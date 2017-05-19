import React from 'react';
import { connect } from 'react-redux';

import Router from 'next/router';

import VehicleSlide from './components/VehicleSlide';
import VehicleSlidesOverlay from './components/VehicleSlidesOverlay';

import MapModal from '../map/MapModal';

import { lanes } from '../statemanagement/constants/identifiersConstants';

class ExploreScroll extends React.Component {

  static propTypes = {
    availableVehicles: React.PropTypes.object,
    url: React.PropTypes.object
  }

  constructor(props) {
    super(props);

    this.handleVehicleSlideLoaded = this.handleVehicleSlideLoaded.bind(this);

    this.state = {
      showParkingMapButton: false,
      showLanesMapButton: false
    };
  }

  handleVehicleSlideLoaded(dataType) {
    console.log('loaded');
    if (dataType === lanes) {
      this.setState({ showLanesMapButton: true })
    } else {
      this.setState({ showParkingMapButton: true })
    }
  }

  showMap(url, data) {
    Router.push(
      `/explore?city=${data.citySlug}&vehicle=${data.citySlug}&areaType=${data.areaType}&id=${data.id}`,
      url,
      { shallow: true }
    );
    // this.props.url.push('/map', url);
  }

  dismissMap () {
    Router.push('/explore', '/berlin/explore', { shallow: true })
  }

  render() {

    console.log(this.props.url);

    return (
      <section>
        <VehicleSlide
          vehicle="car"
          showMap={(url, data) => this.showMap(url, data)}
          onLoaded={this.handleVehicleSlideLoaded}
        />
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
        {this.props.url.query.id &&
          <MapModal
            onDismiss={() => this.dismissModal()}
          />
        }
      </section>
    )
  }

}

export default connect((state) => {
  return {
    availableVehicles: state.vehicles.get('availableVehicles')
  }
})(ExploreScroll);
