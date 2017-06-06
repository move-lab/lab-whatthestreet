import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import Loader from '../shared/components/Loader';
import MapInfoBox from './components/MapInfoBox';

let Map;

class MapModal extends PureComponent {

  static propTypes = {
    onDismiss: React.PropTypes.func,
    isVisible: React.PropTypes.bool,
    citySlug: React.PropTypes.string,
    activeVehicle: React.PropTypes.string,
    ownGuess: React.PropTypes.object,
    itemId: React.PropTypes.number,
    areaType: React.PropTypes.string
  }

  constructor (props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.onMapLoaded = this.onMapLoaded.bind(this);

    this.state = { 
      showMap: false,
      mapLoaded: false
    };
  }

  componentWillReceiveProps(nextProps) {

  }

  componentDidMount() {
    // Do not render on server
    Map = require('./components/Map').default;
    this.setState({ 
      showMap: true 
    });
  }

  closeModal() {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    } else {
      Router.push({
        pathname: '/explore',
        query: this.props.ownGuess.toJS()
      },{
        pathname: `/${this.props.citySlug}/explore/${this.props.activeVehicle}`,
        query: this.props.ownGuess.toJS()
      });
    }
  }

  onMapLoaded() {
    this.setState({
      mapLoaded: true
    });
  }

  render() {
    console.log('render mapmodal');
    return (
      <div className={`MapWrapper ${this.props.isVisible ? 'visible' : ''}`}>
        <MapInfoBox
          areaType={this.props.areaType}
          parkingData={this.props.parkingData}
          laneData={this.props.laneData}
          activeVehicle={this.props.activeVehicle}
          citySlug={this.props.citySlug}
          closeModal={this.closeModal}
        />
        {!this.state.mapLoaded &&
          <div className="LoaderWrapper">
            <Loader />
          </div>
        }
        {this.state.showMap && this.props.areaType &&
          <Map
            areaType={this.props.areaType}
            parkingData={this.props.parkingData && this.props.parkingData.toJS()}
            laneData={this.props.laneData && this.props.laneData.toJS()}
            onMapLoaded={this.onMapLoaded}
          />
        }
        <style jsx>{`
          .MapWrapper {
            position: fixed;
            top: 0px;
            bottom: 0px;
            left: 0px;
            right: 0px;
            z-index: 20000000;
            visibility: hidden;
            background-color: #e6e4e0;
          }

          .MapWrapper.visible {
            visibility: visible;
          }

          .LoaderWrapper {
            display: flex;
            height: 100vh;
            align-items: center;
            justify-content: center;
            background-color: #e6e4e0;
          }
        `}</style>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    citySlug: state.city.getIn(['actual_city','slug']),
    activeVehicle: state.vehicles.get('vehicle'),
    ownGuess: state.guess.get('own'),
    laneData: state.map.get('laneData'),
    parkingData: state.map.get('parkingData'),
    areaType: state.map.get('areaType')
  }
})(MapModal);
