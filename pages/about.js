import React, { Component } from 'react';
import axios from 'axios';

import withRedux from 'next-redux-wrapper';
import { initStore } from '../app/statemanagement/store';

import Layout from '../app/shared/components/Layout';
import AboutPage from '../app/results/AboutPage';
import Header from '../app/shared/components/Header';

import { CityActions } from '../app/statemanagement/actions';
import { setBaseUrl, initRouterWatcher } from '../app/statemanagement/AppStateManagement';

import { getBaseUrl } from '../app/shared/utils/url';

class About extends Component {

  static async getInitialProps (params) {
    const { store, isServer, req } = params;
    if (isServer) {
      const baseUrl = getBaseUrl(req);
      await store.dispatch(setBaseUrl(baseUrl));
      await store.dispatch(CityActions.loadCities());
      // We may render from city/:cityName and select that city by default
      if(req && req.params.cityName) {
        await store.dispatch(CityActions.selectCity(req.params.cityName));
      } else {
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        // Try to get closest city from api
        await axios.post(`${baseUrl}/api/v1/nearestCity`,{
          ip: clientIP
        }).then((response) => {
          console.log('closest city is')
          return store.dispatch(CityActions.selectCity(response.data.slug));
        }, (error) => {
          // default to berlin
          console.log('default to berlin')
          return store.dispatch(CityActions.selectCity("berlin"));
        });
      }
    }
    return;
  }

  componentDidMount() {
    // Triggered on client
    this.props.dispatch(initRouterWatcher());
  }

  render() {
    return (
      <Layout>
        <Header
          title="The Mobility Space Report: What the Street!?"
          mode="normal"
        />
        <AboutPage />
      </Layout>
    )
  }
}

export default withRedux(initStore)(About);
