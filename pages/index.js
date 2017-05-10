import React, { Component } from 'react';

import withRedux from 'next-redux-wrapper';
import { initStore } from '../app/statemanagement/store';

import Layout from '../app/shared/components/Layout';
import Home from '../app/home/Home';

import { CityActions } from '../app/statemanagement/actions';

class Index extends Component {

  static async getInitialProps ({ store, isServer }) {
    await store.dispatch(CityActions.loadCities());
    return;
  }

  render() {
    return (
      <Layout>
        <Home />
      </Layout>
    )
  }
}

export default withRedux(initStore)(Index);
