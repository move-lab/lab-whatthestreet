import React, { Component } from 'react';

import withRedux from 'next-redux-wrapper';
import { initStore } from '../app/statemanagement/store';

import Layout from '../app/shared/components/Layout';
import AboutPage from '../app/results/AboutPage';
import Header from '../app/shared/components/Header';

import { CityActions } from '../app/statemanagement/actions';
import { setBaseUrl, setAuthHeader, initRouterWatcher } from '../app/statemanagement/AppStateManagement';

class About extends Component {

  static async getInitialProps (params) {
    const { store, isServer, req } = params;
    if (isServer) {
      const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
      await store.dispatch(setBaseUrl(baseUrl));
      if (req) {
        await store.dispatch(setAuthHeader(req.headers.authorization))
      }
      await store.dispatch(CityActions.loadCities());
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
          title="What the Street!?"
          mode="normal"
        />
        <AboutPage />
      </Layout>
    )
  }
}

export default withRedux(initStore)(About);
