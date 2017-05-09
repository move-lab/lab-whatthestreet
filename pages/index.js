import React, { Component } from 'react';

import withRedux from 'next-redux-wrapper';
import { initStore } from '../app/statemanagement/store';

import Layout from '../app/shared/components/Layout';

class Index extends Component {

  render() {
    return (
      <Layout>
        <p>Starting this refactoring !</p>
      </Layout>
    )
  }
}

export default withRedux(initStore)(Index);
