import React, { Component } from 'react';

import withRedux from 'next-redux-wrapper';
import { initStore } from '../app/statemanagement/store';

import Layout from '../app/shared/components/Layout';
import Header from '../app/shared/components/Header';
import ExploreScroll from '../app/explore/ExploreScroll';

import { CityActions, GuessActions } from '../app/statemanagement/actions';
import { setBaseUrl } from '../app/statemanagement/AppStateManagement';
import { selectVehicle } from '../app/statemanagement/VehiclesStateManagement';

class Explore extends Component {

  static async getInitialProps (params) {
    const { store, isServer, req, res } = params;
    console.log('Explore page render');
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
      if(req && req.params.vehicleType) {
        await store.dispatch(selectVehicle(req.params.vehicleType));
      }
      if(req && req.query.bike && req.query.rail && req.query.car) {
        await store.dispatch(GuessActions.setOwnGuess({
          bike: parseFloat(req.query.bike),
          rail: parseFloat(req.query.rail),
          car: parseFloat(req.query.car)
        }));
      } else {
        // Redirect to home
        res.writeHead(302, { Location: `/${req.params.cityName}` })
        res.end()
      }
    } else {
      if(params && params.query.vehicleType) {
        await store.dispatch(selectVehicle(params.query.vehicleType));
      } else {
        //Default to car
        await store.dispatch(selectVehicle("car"));
      }
    }
    return;
  }

  render() {
    return (
      <Layout>
        <Header
          mode="explore"
        />
        <ExploreScroll
          url={this.props.url}
        />
      </Layout>
    )
  }
}

export default withRedux(initStore)(Explore);
