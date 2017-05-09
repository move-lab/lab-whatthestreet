import React, { Component } from 'react';

import withRedux from 'next-redux-wrapper';
import { initStore } from '../app/statemanagement/store';

import Layout from '../app/shared/components/Layout';
import Home from '../app/home/Home';

class Index extends Component {

  render() {
    return (
      <Layout>
        <Home />
      </Layout>
    )
  }
}

export default withRedux(initStore)(Index);
