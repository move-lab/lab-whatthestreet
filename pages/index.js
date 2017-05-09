import React, { Component } from 'react';

import withRedux from 'next-redux-wrapper';
import { initStore } from '../app/statemanagement/store';

import Layout from '../app/shared/components/Layout';
import Home from '../app/home/Home';

import { CityActions } from '../app/statemanagement/actions';

class Index extends Component {

  static getInitialProps ({ store, isServer }) {
    // TODO MAKE SAGAS WORK SERVER SIDE
    // https://gist.github.com/jgautheron/bc07f6515748678a40ed38eab98d816e
    // https://github.com/zeit/next.js/issues/273#issuecomment-273637698
    // OR BETTER CONVERT THEM TO PLAIN OLD REDUX THUNK
    // store.dispatch(CityActions.loadCities());
    return { isServer }
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
