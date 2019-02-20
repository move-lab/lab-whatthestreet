import React, { Component } from 'react';
import Head from 'next/head';

import withRedux from 'next-redux-wrapper';
import { initStore } from '../app/statemanagement/store';

import Layout from '../app/shared/components/Layout';
import MapMobile from '../app/mapmobile/MapMobile';

import { CityActions, GuessActions } from '../app/statemanagement/actions';
import { setBaseUrl, initRouterWatcher } from '../app/statemanagement/AppStateManagement';
import { fetchLaneData } from '../app/statemanagement/MapStateManagement';
import { selectVehicle } from '../app/statemanagement/VehiclesStateManagement';
import { getBaseUrl } from '../app/shared/utils/url';
import { prefixURL, getRootURL } from '../utils/url';

class Explore extends Component {

  static async getInitialProps (params) {
    const { store, isServer, req, res } = params;
    console.log('Map page render');
    // If not Server Side rendered, do not need to fetch everything again
    if (isServer) {
      const baseUrl = getBaseUrl(req);
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
      if(req && req.params.itemId && req.params.areaType) {
        if(req.params.areaType === "parking") {
          console.log('redirect to home page, cannot SSR parking area')
          // Redirect to home, cannot SSR parking map
          res.writeHead(302, { Location: `/${req.params.cityName}` })
          res.end()
        } else {
          await store.dispatch(fetchLaneData(parseInt(req.params.itemId), req.params.areaType));
        }
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
    }
    return;
  }

  componentDidMount() {
    // Triggered on client
    this.props.dispatch(initRouterWatcher());
  }

  render() {
    return (
      <div>
        <Head>
          <title>What the Street!? - moovel lab</title>
          <meta charset='utf-8' />
          <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
          <meta name="description" content="Who owns the city? Explore the distribution of mobility space amongst urban traffic. Discover every parking lot or street of 23 metropolises." />
          <link rel="apple-touch-icon" href={prefixURL("/static/favicon/apple-touch-icon.png")} />
          <link rel="icon" type="image/png" href={prefixURL("/static/favicon/favicon.png")} />
          <meta property="og:title" content="What the Street!? - moovel lab" />
          <meta property="og:url" content={`https://${getRootURL()}`} />
          <meta property="og:image" content={`https://${getRootURL()}${prefixURL('static/images/wts-meta@2x.png')}`} />
          <meta property="og:description" content="Who owns the city? Explore the distribution of mobility space amongst urban traffic. Discover every parking lot or street of 23 metropolises." />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="moovel lab" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@moovelLab" />
          <meta name="twitter:title" content="What the Street!? - moovel lab" />
          <meta name="twitter:description" content="Who owns the city? Explore the distribution of mobility space amongst urban traffic. Discover every parking lot or street of 23 metropolises." />
          <meta name="twitter:image" content={`https://${getRootURL()}${prefixURL('static/images/wts-meta@2x.png')}`} />
          <link href='https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.css' rel='stylesheet' />
        </Head>
        <MapMobile
          activeVehicle={this.props.activeVehicle}
          areaType={this.props.areaType}
          parkingData={this.props.parkingData && this.props.parkingData.toJS()}
          laneData={this.props.laneData && this.props.laneData.toJS()}
        />
        <style jsx>{`
          :global(html,body) {
            padding:0;
            margin:0;
          }  
        `}</style>
      </div>
    )
  }
}

export default withRedux(initStore)(Explore);
