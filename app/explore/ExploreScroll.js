import React from 'react';
import { connect } from 'react-redux';

import Router from 'next/router';

import VehicleSlide from './components/VehicleSlide';
import VehicleSlidesOverlay from './components/VehicleSlidesOverlay';

import MapModal from '../map/MapModal';

import { lanes } from '../statemanagement/constants/identifiersConstants';

import { selectVehicle } from '../statemanagement/VehiclesStateManagement';

class ExploreScroll extends React.Component {

  static propTypes = {
    availableVehicles: React.PropTypes.object,
    activeVehicle: React.PropTypes.string,
    showScrollUI: React.PropTypes.bool,
    isScrolling: React.PropTypes.bool,
    url: React.PropTypes.object
  }

  constructor(props) {
    super(props);

    this.handleVehicleSlideLoaded = this.handleVehicleSlideLoaded.bind(this);

    this.state = {
      parkingLoaded: false,
      lanesLoaded: false
    };
  }

  handleVehicleSlideLoaded(dataType) {
    console.log('loaded');
    if (dataType === lanes) {
      this.setState({ lanesLoaded: true })
    } else {
      this.setState({ parkingLoaded: true })
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
    Router.replace('/explore', `/berlin/explore/${vehicle}`, { shallow: true })
  }

  selectVehicle(vehicle) {
    this.props.dispatch(selectVehicle(vehicle));
    this.setState({
      parkingLoaded: false,
      lanesLoaded: false
    });
    Router.push(`/explore?vehicleType=${vehicle}`, `/berlin/explore/${vehicle}`);
  }

  getNextVehicle() {
    const currentIndex = this.props.availableVehicles.indexOf(this.props.activeVehicle);
    if(currentIndex + 1 < this.props.availableVehicles.size) {
      const nextVehicule = this.props.availableVehicles.get(currentIndex + 1);
      return nextVehicule;
    } else {
      return null;
    }
  }

  getPreviousVehicle() {
    const currentIndex = this.props.availableVehicles.indexOf(this.props.activeVehicle);
    if(currentIndex - 1 >= 0) {
      const previousVehicule = this.props.availableVehicles.get(currentIndex - 1);
      return previousVehicule;
    } else {
      return null;
    }
  }

  render() {
    return (
      <section>
        {this.props.activeVehicle === 'car' &&
          <VehicleSlide
            vehicle="car"
            showMap={(url, data) => this.showMap(url, data)}
            onLoaded={this.handleVehicleSlideLoaded}
          />
        }
        {this.props.activeVehicle === 'bike' &&
          <VehicleSlide
            vehicle="bike"
            showMap={(url, data) => this.showMap(url, data)}
            onLoaded={this.handleVehicleSlideLoaded}
          />
        }
        {this.props.activeVehicle === 'rail' &&
          <VehicleSlide
            vehicle="rail"
            showMap={(url, data) => this.showMap(url, data)}
            onLoaded={this.handleVehicleSlideLoaded}
          />
        }
        <VehicleSlidesOverlay
          lanesLoaded={this.state.lanesLoaded}
          parkingLoaded={this.state.parkingLoaded}
          goToNextVehicle={() => this.selectVehicle(this.getNextVehicle())}
          goToPreviousVehicle={() => this.selectVehicle(this.getPreviousVehicle())}
          nextVehicleName={this.getNextVehicle()}
          previousVehicleName={this.getPreviousVehicle()}
          scrollToTop={() => window.scroll({ 
            top: 0,
            left: 0,
            behavior: 'smooth' 
          })}
          scrollToEnd={() => {
            document.querySelector('.VehicleSlideSummary').scrollIntoView({ behavior: 'smooth' });
          }}
          showScrollUI={this.props.showScrollUI}
          isScrolling={this.props.isScrolling}
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

  const showScrollUI = state.explore.get('lanesInFocus') || state.explore.get('parkingInFocus');

  return {
    availableVehicles: state.vehicles.get('availableVehicles'),
    activeVehicle: state.vehicles.get('vehicle'),
    showScrollUI,
    isScrolling: state.explore.get('isScrolling')
  }
})(ExploreScroll);
