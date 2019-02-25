import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import Loader from '../shared/components/Loader';
import MapInfoBox from './components/MapInfoBox';
import MapActions from './components/MapActions';

import * as COLORS from '../shared/style/colors';
import { prefixURL } from '../../utils/url';

let Map;

class MapModal extends PureComponent {

  static propTypes = {
    onDismiss: PropTypes.func,
    isVisible: PropTypes.bool,
    citySlug: PropTypes.string,
    cityName: PropTypes.string,
    activeVehicle: PropTypes.string,
    ownGuess: PropTypes.object,
    itemId: PropTypes.number,
    areaType: PropTypes.string,
    isFetchingLaneData: PropTypes.bool
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
        query: {
          ...this.props.ownGuess.toJS(),
          vehicleType: this.props.activeVehicle
        }
      },{
        pathname: prefixURL(`/${this.props.citySlug}/explore/${this.props.activeVehicle}`),
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
    return (
      <div
        className={`MapWrapper ${this.props.isVisible ? 'visible' : ''}`}
      >
        <MapInfoBox
          areaType={this.props.areaType}
          parkingData={this.props.parkingData}
          laneData={this.props.laneData}
          activeVehicle={this.props.activeVehicle}
          citySlug={this.props.citySlug}
          cityName={this.props.cityName}
        />
        <div className="BtnCloseMap" onClick={this.closeModal}>
          <img src={prefixURL("/static/icons/Icon_Cross.svg")} alt="close map"/>
        </div>
        <div className={`LoaderWrapper ${!this.state.mapLoaded || this.props.isFetchingLaneData ? 'visible' : 'hidden'}`}>
          <Loader />
        </div>
        {this.state.showMap && this.props.areaType &&
          <Map
            activeVehicle={this.props.activeVehicle}
            areaType={this.props.areaType}
            parkingData={this.props.parkingData && this.props.parkingData.toJS()}
            laneData={this.props.laneData && this.props.laneData.toJS()}
            onMapLoaded={this.onMapLoaded}
            isVisible={this.props.isVisible}
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
            position: absolute;
            z-index: 1001;
            width: 100%;
            background-color: rgba(230, 228, 224, 0.50);
          }

          .LoaderWrapper.hidden {
            visibility: hidden;
          }

          .BtnCloseMap {
            position: absolute;
            z-index: 100000000;
            top: 30px;
            right: 60px;
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: white;
            cursor: pointer;
            box-shadow: ${COLORS.boxshadow};
          }

          .BtnCloseMap img {
            width: 25px;
            height: 25px;
          }

          .BtnCloseMap:hover img,
          .BtnCloseMap:focus img,
          .BtnCloseMap:active img {
            opacity: 0.5;
          }
        `}</style>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    citySlug: state.city.getIn(['actual_city','slug']),
    cityName: state.city.getIn(['actual_city','name']),
    activeVehicle: state.vehicles.get('vehicle'),
    ownGuess: state.guess.get('own'),
    laneData: state.map.get('laneData'),
    parkingData: state.map.get('parkingData'),
    areaType: state.map.get('areaType'),
    isFetchingLaneData: state.map.get('isFetchingLaneData')
  }
})(MapModal);
