import React from 'react';
import { connect } from 'react-redux';

import Router from 'next/router';

import VehicleSlide from './components/VehicleSlide';
import VehicleSlidesOverlay from './components/VehicleSlidesOverlay';
import VehicleSlideSummary from './components/VehicleSlideSummary';

import MapModal from '../map/MapModal';

import { lanes } from '../statemanagement/constants/identifiersConstants';

import { selectVehicle } from '../statemanagement/VehiclesStateManagement';

class ExploreScroll extends React.PureComponent {

  static propTypes = {
    availableVehicles: React.PropTypes.object,
    ownGuess: React.PropTypes.object,
    activeVehicle: React.PropTypes.string,
    citySlug: React.PropTypes.string,
    url: React.PropTypes.object
  }

  constructor(props) {
    super(props);

    this.handleVehicleSlideLoaded = this.handleVehicleSlideLoaded.bind(this);
    this.showParkingMap = this.showParkingMap.bind(this);
    this.showLaneMap = this.showLaneMap.bind(this);

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

  showMap(data) {
    Router.push({
      pathname: '/explore',
      query: {
        id: data.id,
        areaType: data.areaType,
        ...this.props.ownGuess.toJS()
      }
    },{
      pathname: `/${data.citySlug}/explore/${data.actualVehicle}/${data.areaType}/${data.id}`,
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

  showParkingMap() {
    this.showMap({
      id: this.props.selectedParkingId,
      areaType: 'parking',
      citySlug: this.props.citySlug,
      actualVehicle: this.props.activeVehicle
    });
  }

  showLaneMap() {
    this.showMap({
      id: this.props.selectedLaneId,
      areaType: 'lanes',
      citySlug: this.props.citySlug,
      actualVehicle: this.props.activeVehicle
    });
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
    }).then(() => {
      window.document.body.scrollTop = 0;
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
        {this.state.parkingLoaded && this.state.lanesLoaded &&
          <VehicleSlideSummary
            goToNextVehicle={() => this.selectVehicle(this.getNextVehicle())}
            goToResults={() => this.goToResults()}
          />
        }
        <VehicleSlidesOverlay
          lanesLoaded={this.state.lanesLoaded}
          parkingLoaded={this.state.parkingLoaded}
          showParkingMap={this.showParkingMap}
          showLaneMap={this.showLaneMap}
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
        />
        {this.props.url.query.id &&
          <MapModal
            renderingFromExplorePage={true}
            itemId={parseInt(this.props.url.query.id)}
            areaTypeFromExplore={this.props.url.query.areaType}
            onDismiss={() => this.dismissMap()}
          />
        }
      </section>
    )
  }

}

export default connect((state) => {

  return {
    availableVehicles: state.vehicles.get('availableVehicles'),
    activeVehicle: state.vehicles.get('vehicle'),
    citySlug: state.city.getIn(['actual_city','slug']),
    ownGuess: state.guess.get('own'),
    selectedLaneId: state.street.get('id'),
    selectedParkingId: state.parking.get('id')
  }
})(ExploreScroll);
