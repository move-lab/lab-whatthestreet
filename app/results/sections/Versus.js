import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Selectors
import { CitySelectors, VersusSelectors } from '../../statemanagement/selectors';

// Components
import VersusTable from '../components/VersusTable';
import VersusTriangle from '../components/VersusTriangle';

import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';


class VersusPage extends React.Component {

  static propTypes = {
    city: PropTypes.object,
    triangleData: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  getBikeRanking = (rawData) => {
    let bikeData = rawData.map((cityData) => {
      const toReturn = { city: null, data: null };
      toReturn.city = cityData.city;
      toReturn.data = cityData.space.bike / (cityData.space.rail + cityData.space.bike + cityData.space.car);
      return toReturn;
    });
    bikeData.sort((a, b) => {
      const valueA = parseFloat(a.data);
      const valueB = parseFloat(b.data);
      if (valueA < valueB) return 1;
      if (valueA > valueB) return -1;
      return 0;
    });
    bikeData = bikeData.map((dataPoint) => dataPoint.city);
    return bikeData;
  }

  getRailRanking = (rawData) => {
    let railData = rawData.map((cityData) => {
      const toReturn = { city: null, data: null };
      toReturn.city = cityData.city;
      toReturn.data = cityData.space.rail / (cityData.space.rail + cityData.space.bike + cityData.space.car);
      return toReturn;
    });
    railData.sort((a, b) => {
      const valueA = parseFloat(a.data);
      const valueB = parseFloat(b.data);
      if (valueA < valueB) return 1;
      if (valueA > valueB) return -1;
      return 0;
    });
    railData = railData.map((dataPoint) => dataPoint.city);
    return railData;
  }

  getCarRaking = (rawData) => {
    let carData = rawData.map((cityData) => {
      const toReturn = { city: null, data: null };
      toReturn.city = cityData.city;
      toReturn.data = cityData.space.car / (cityData.space.rail + cityData.space.bike + cityData.space.car);
      return toReturn;
    });
    carData.sort((a, b) => {
      const valueA = parseFloat(a.data);
      const valueB = parseFloat(b.data);
      if (valueA < valueB) return 1;
      if (valueA > valueB) return -1;
      return 0;
    });
    carData = carData.map((dataPoint) => dataPoint.city);
    return carData;
  }

  renderTableData = () => {
    const data = { currentCity: this.props.city, bike: [], rail: [], car: [] };
    data.bike = this.getBikeRanking(this.props.triangleData);
    data.rail = this.getRailRanking(this.props.triangleData);
    data.car = this.getCarRaking(this.props.triangleData);
    return data;
  }

  render() {
    return (
      <div className="MainContainer">
        <div className="Wrapper">
          <h2 className="Title">
            {this.props.city.name} vs.<br />the world
          </h2>
          <VersusTriangle
            currentCity={this.props.city}
            triangleData={this.props.triangleData}
          />
          <h4 className="VersusTableTitle">
              Space distribution champions
          </h4>
          <VersusTable tableData={this.renderTableData()} />
        </div>
        <style jsx>{`
          .MainContainer {
            background-color: #e9edff;
            padding-top: ${METRICS.MetricsSectionPadding};
          }

          .Wrapper {
            width: ${METRICS.MetricsContentWidth};
            padding: 0 ${METRICS.MetricsContentPadding};
            margin: 0 auto;
            position: relative;
            padding-bottom: 70px;
          }

          .Title {
            font-size: 47px;
            line-height: 56px;
            font-weight: 500;
            color: ${COLORS.ColorBlue};
            margin: 0;
            padding: 0;
            position: absolute;
            top: 0;
            left: ${METRICS.MetricsContentPadding};
            width: 320px;
          }

          .VersusTableTitle {
            font-size: 40px;
            margin: auto;
            margin-bottom: 50px;
            text-align: center;
            width: 500px;
            line-height: 1.2em;
          }
        `}</style>
      </div>
    );
  }
}

const structuredSelector = createStructuredSelector({
  city: CitySelectors.makeSelectActualCity(),
  triangleData: VersusSelectors.makeSelectVersusData()
});

export default connect(structuredSelector)(VersusPage);
