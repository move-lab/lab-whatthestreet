import React, { Component } from 'react';

import withRedux from 'next-redux-wrapper';
import { initStore } from '../app/statemanagement/store';

import Layout from '../app/shared/components/Layout';
import Home from '../app/home/Home';
import Header from '../app/shared/components/Header';

import { CityActions, GuessActions } from '../app/statemanagement/actions';
import { setBaseUrl, initRouterWatcher } from '../app/statemanagement/AppStateManagement';

class Index extends Component {

  static async getInitialProps (params) {
    const { store, isServer, req } = params;
    console.log('Index page render');
    if (isServer) {
      const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
      await store.dispatch(setBaseUrl(baseUrl));
      await store.dispatch(CityActions.loadCities());
      // We may render from city/:cityName and select that city by default
      if(req && req.params.cityName) {
        await store.dispatch(CityActions.selectCity(req.params.cityName));
      } else {
        // TODO HERE GET THE IP OF THE CLIENT AND PASS IT TO LOAD CITY TO FIGURE
        // OUT THE CITY TO SELECT FROM IP, for now select berlin as default
        // const ip = req.ip;
        // console.log(ip);
        await store.dispatch(CityActions.selectCity("berlin"));
      }
      if(req && req.query.bike && req.query.rail && req.query.car) {
        await store.dispatch(GuessActions.setOwnGuess({
          bike: parseFloat(req.query.bike),
          rail: parseFloat(req.query.rail),
          car: parseFloat(req.query.car)
        }));
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
          title="What the Street?!"
          mode="normal"
        />
        <Home />
      </Layout>
    )
  }
}

export default withRedux(initStore)(Index);
