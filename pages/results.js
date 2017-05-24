import React, { Component } from 'react';

import withRedux from 'next-redux-wrapper';
import { initStore } from '../app/statemanagement/store';

import Layout from '../app/shared/components/Layout';
import Header from '../app/shared/components/Header';

import { CityActions } from '../app/statemanagement/actions';
import { setBaseUrl } from '../app/statemanagement/AppStateManagement';

class Results extends Component {

  static async getInitialProps (params) {
    const { store, isServer, req } = params;
    console.log('Results page render');
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

  render() {
    return (
      <Layout>
        <Header title="Results" />
        <p>results page</p>
      </Layout>
    )
  }
}

export default withRedux(initStore)(Results);
