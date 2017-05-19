import React, { Component } from "react";

import Loader from '../shared/components/Loader';
import MapInfoBox from './components/MapInfoBox';

let Map;

class MapModal extends Component {

  constructor () {
    super();
    this.state = { showMap: false };
  }

  componentDidMount() {
    // Do not render on server
    Map = require('./components/Map').default;
    this.setState({ showMap: true });
  }

  render() {
    return (
      <div style={{ position: 'fixed', top:0, bottom:0, left:0, right:0, zIndex: 20000000}}>
        <MapInfoBox />
        {!this.state.showMap &&
          <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <Loader />
          </div>
        }
        {this.state.showMap &&
          <Map />
        }
      </div>
    );
  }
}

export default MapModal;
