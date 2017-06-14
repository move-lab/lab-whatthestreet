import React from 'react';
import { connect } from 'react-redux';

import Router from 'next/router';

import VehicleSlide from './components/VehicleSlide';
import VehicleSlidesOverlay from './components/VehicleSlidesOverlay';
import VehicleSlideSummary from './components/VehicleSlideSummary';

import { computeSvgHeights } from '../shared/utils/svgHeights';

import MapModal from '../map/MapModal';

import { lanes } from '../statemanagement/constants/identifiersConstants';

import { fetchLaneData, setParkingData } from '../statemanagement/MapStateManagement';

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
    this.dismissMap = this.dismissMap.bind(this);
    this.showMap = this.showMap.bind(this);
    this.goToResults = this.goToResults.bind(this);
    this.selectNextVehicule = this.selectNextVehicule.bind(this);
    this.selectPreviousVehicule = this.selectPreviousVehicule.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.scrollToEnd = this.scrollToEnd.bind(this);

    this.state = {
      parkingLoaded: false,
      lanesLoaded: false
    };
  }

  componentDidMount() {
    Router.prefetch('/results');
  }

  handleVehicleSlideLoaded(dataType) {
    if (dataType === lanes) {
      this.setState({ lanesLoaded: true })
    } else {
      this.setState({ parkingLoaded: true })
    }
  }

  showMap(data) {

    if(data.areaType === 'lanes') {
      this.props.dispatch(fetchLaneData(data.id, data.areaType));
    } else {
      if(data.railParking) {
        this.props.dispatch(fetchLaneData(data.id, data.areaType, true));
      } else {
        this.props.dispatch(setParkingData(data.data));
      }
    }

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

    let railParking = false;
    let id = this.props.selectedParkingId;

    if (this.props.activeVehicle === 'rail') {
      railParking = true;
      id = this.props.selectedLaneRailParkingId;
    }

    this.showMap({
      id,
      areaType: 'parking',
      citySlug: this.props.citySlug,
      actualVehicle: this.props.activeVehicle,
      data: this.props.selectedParkingData,
      railParking
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

  selectNextVehicule() {
    this.selectVehicle(this.getNextVehicle());
  }

  selectPreviousVehicule() {
    this.selectVehicle(this.getPreviousVehicle());
  }

  scrollToTop() {
    const parkingEndPosition = parseInt(this.props.svgHeights.getIn([this.props.activeVehicle,'parking','height']) + 280);
    if(window.scrollY <= parkingEndPosition) {
      window.scroll({ 
        top: 0,
        left: 0,
        behavior: 'smooth' 
      });
    } else {
      window.scroll({ 
        top: parkingEndPosition,
        left: 0,
        behavior: 'smooth' 
      });
    } 
  }

  scrollToEnd() {
    const parkingEndPosition = parseInt(this.props.svgHeights.getIn([this.props.activeVehicle,'parking','height']) + 280);
    if(window.scrollY < parkingEndPosition) {
      window.scroll({ 
        top: parkingEndPosition,
        left: 0,
        behavior: 'smooth' 
      });
    } else {
      document.querySelector('.VehicleSlideSummary').scrollIntoView({ behavior: 'smooth' });
    }
  }

  render() {
    return (
      <section>
        {this.props.activeVehicle === 'car' &&
          <VehicleSlide
            vehicle="car"
            showMap={this.showMap}
            lanesLoaded={this.state.lanesLoaded}
            parkingLoaded={this.state.parkingLoaded}
            onLoaded={this.handleVehicleSlideLoaded}
          />
        }
        {this.props.activeVehicle === 'bike' &&
          <VehicleSlide
            vehicle="bike"
            showMap={this.showMap}
            lanesLoaded={this.state.lanesLoaded}
            parkingLoaded={this.state.parkingLoaded}
            onLoaded={this.handleVehicleSlideLoaded}
          />
        }
        {this.props.activeVehicle === 'rail' &&
          <VehicleSlide
            vehicle="rail"
            showMap={this.showMap}
            lanesLoaded={this.state.lanesLoaded}
            parkingLoaded={this.state.parkingLoaded}
            onLoaded={this.handleVehicleSlideLoaded}
          />
        }
        {this.state.parkingLoaded && this.state.lanesLoaded &&
          <VehicleSlideSummary
            goToNextVehicle={this.selectNextVehicule}
            goToResults={this.goToResults}
          />
        }
        <VehicleSlidesOverlay
          activeVehicle={this.props.activeVehicle}
          lanesLoaded={this.state.lanesLoaded}
          parkingLoaded={this.state.parkingLoaded}
          showParkingMap={this.showParkingMap}
          showLaneMap={this.showLaneMap}
          goToNextVehicle={this.selectNextVehicule}
          goToPreviousVehicle={this.selectPreviousVehicule}
          nextVehicleName={this.getNextVehicle()}
          previousVehicleName={this.getPreviousVehicle()}
          scrollToTop={this.scrollToTop}
          scrollToEnd={this.scrollToEnd}
        />
        <MapModal
          itemId={parseInt(this.props.url.query.id)}
          isVisible={this.props.url.query.id ? true : false}
          onDismiss={this.dismissMap}
        />
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
    selectedLaneId: state.lanes.get('id'),
    selectedLaneRailParkingId: state.lanes.getIn(['laneRailParking','id']),
    selectedParkingId: state.parking.get('id'),
    selectedParkingData: state.parking.toJS(),
    svgHeights: computeSvgHeights(state.cityMeta)
  }
})(ExploreScroll);
