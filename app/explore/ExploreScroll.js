import React from 'react';
import { connect } from 'react-redux';

import Router from 'next/router';

import VehicleSlide from './components/VehicleSlide';
import VehicleSlidesOverlay from './components/VehicleSlidesOverlay';
import VehicleSlideSummary from './components/VehicleSlideSummary';

import MapModal from '../map/MapModal';

import { lanes } from '../statemanagement/constants/identifiersConstants';

import { selectVehicle } from '../statemanagement/VehiclesStateManagement';

class ExploreScroll extends React.Component {

  static propTypes = {
    availableVehicles: React.PropTypes.object,
    ownGuess: React.PropTypes.object,
    activeVehicle: React.PropTypes.string,
    citySlug: React.PropTypes.string,
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
    Router.push({
      pathname: '/explore',
      query: {
        id: data.id,
        ...this.props.ownGuess.toJS()
      }
    },{
      pathname: url,
      query: this.props.ownGuess.toJS()
    },
    { shallow: true }
    );
  }

  dismissMap () {
    Router.replace({
      pathname: '/explore',
      query: this.props.ownGuess.toJS()
    }, {
      pathname: `/${this.props.citySlug}/explore/${this.props.activeVehicle}`,
      query: this.props.ownGuess.toJS()
    }, { shallow: true });
  }

  selectVehicle(vehicle) {
    this.props.dispatch(selectVehicle(vehicle));
    this.setState({
      parkingLoaded: false,
      lanesLoaded: false
    });

    Router.push({
      pathname: '/explore',
      query: {
        vehicleType : vehicle,
        ...this.props.ownGuess.toJS()
      }
    },{
      pathname: `/${this.props.citySlug}/explore/${vehicle}`,
      query: this.props.ownGuess.toJS()
    });
  }

  goToResults() {
    Router.push({
      pathname: '/results',
      query: this.props.ownGuess.toJS()
    }, {
      pathname: `/${this.props.citySlug}/results`,
      query: this.props.ownGuess.toJS()
    });
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
        <VehicleSlideSummary
          goToNextVehicle={() => this.selectVehicle(this.getNextVehicle())}
          goToResults={() => this.goToResults()}
        />
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
            onDismiss={() => this.dismissMap()}
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
    citySlug: state.city.getIn(['actual_city','slug']),
    showScrollUI,
    isScrolling: state.explore.get('isScrolling'),
    ownGuess: state.guess.get('own')
  }
})(ExploreScroll);
