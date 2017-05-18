import React, { Component } from 'react';

import withRedux from 'next-redux-wrapper';
import { initStore } from '../app/statemanagement/store';

import Layout from '../app/shared/components/Layout';
import Loader from '../app/shared/components/Loader';
import MapInfoBox from '../app/map/components/MapInfoBox';

import { CityActions } from '../app/statemanagement/actions';
import { setBaseUrl } from '../app/statemanagement/AppStateManagement';

let Map;

class Explore extends Component {

  static async getInitialProps (params) {
    const { store, isServer, req } = params;
    console.log('Map page render');
    // If not Server Side rendered, do not need to fetch everything again
    if (isServer) {
      const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
      await store.dispatch(setBaseUrl(baseUrl));
      await store.dispatch(CityActions.loadCities());
      // Select city from url
      // Todo handle city do not exists
      if(req && req.params.cityName) {
        await store.dispatch(CityActions.selectCity(req.params.cityName));
      }
    }
    return;
  }

  constructor () {
    super();
    this.state = { showMap: false };
  }

  componentDidMount() {
    // Do not render on server
    Map = require('../app/map/Map').default;
    this.setState({ showMap: true });
  }

  render() {
    return (
      <Layout>
        <MapInfoBox />
        {!this.state.showMap &&
          <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <Loader />
          </div>
        }
        {this.state.showMap &&
          <Map />
        }
      </Layout>
    )
  }
}

export default withRedux(initStore)(Explore);
