import React from 'react';
import { connect } from 'react-redux';

import Router from 'next/router';

import VehicleSlide from './components/VehicleSlide';
import VehicleSlidesOverlay from './components/VehicleSlidesOverlay';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'

import MapModal from '../map/MapModal';

import { lanes } from '../statemanagement/constants/identifiersConstants';

import { selectVehicle } from '../statemanagement/VehiclesStateManagement';

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
  }

  dismissMap () {
    Router.replace('/explore', '/berlin/explore', { shallow: true })
  }

  setNextVehicle() {
    const currentIndex = this.props.availableVehicles.indexOf(this.props.vehicle);
    if(currentIndex + 1 < this.props.availableVehicles.size) {
      const nextVehicule = this.props.availableVehicles.get(currentIndex + 1);
      this.props.dispatch(selectVehicle(nextVehicule));
    }
  }

  setPreviousVehicle() {
    const currentIndex = this.props.availableVehicles.indexOf(this.props.vehicle);
    if(currentIndex - 1 >= 0) {
      const previousVehicule = this.props.availableVehicles.get(currentIndex - 1);
      this.props.dispatch(selectVehicle(previousVehicule));
    }
  }

  render() {
    console.log('RENDER');
    console.log(this.props.vehicle);
    return (
      <section>
        <CSSTransitionGroup
          transitionName="example"
          transitionAppear={true}
          transitionAppearTimeout={0}
          transitionEnter={true}
          transitionLeave={true}>
          {this.props.vehicle === 'car' &&
            <VehicleSlide
              vehicle="car"
              showMap={(url, data) => this.showMap(url, data)}
              onLoaded={this.handleVehicleSlideLoaded}
            />
          }
          {this.props.vehicle === 'bike' &&
            <VehicleSlide
              vehicle="bike"
              showMap={(url, data) => this.showMap(url, data)}
              onLoaded={this.handleVehicleSlideLoaded}
            />
          }
          {this.props.vehicle === 'rail' &&
            <VehicleSlide
              vehicle="rail"
              showMap={(url, data) => this.showMap(url, data)}
              onLoaded={this.handleVehicleSlideLoaded}
            />
          }
        </CSSTransitionGroup>
        {/*{this.props.availableVehicles.map((vehicle, index) =>
          <VehicleSlide
            key={index}
            vehicle={vehicle} />
        )}*/}
        <VehicleSlidesOverlay
          showLanesMapButton={this.state.showLanesMapButton}
          showParkingMapButton={this.state.showParkingMapButton}
          goToNextVehicle={() => this.setNextVehicle()}
          goToPreviousVehicle={() => this.setPreviousVehicle()}
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
        <style jsx>{`
          :global(.example-appear) {
            opacity: 0.01;
          }

          :global(.example-appear).example-appear-active {
            opacity: 1;
            transition: opacity 0.1s ease-in;
          }
        `}</style>
      </section>
    )
  }

}

export default connect((state) => {
  return {
    availableVehicles: state.vehicles.get('availableVehicles'),
    vehicle: state.vehicles.get('vehicle')
  }
})(ExploreScroll);
