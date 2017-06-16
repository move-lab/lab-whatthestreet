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
    city: React.PropTypes.object,
    triangleData: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  }

  getSpaceValue = (values) => {
    let maxBike = this.props.triangleData.map((data) => data.space.bike);
    let maxCar = this.props.triangleData.map((data) => data.space.car);
    let maxRail = this.props.triangleData.map((data) => data.space.rail);

    /* eslint-disable */
    maxBike = Math.max.apply(Math, maxBike);
    maxCar = Math.max.apply(Math, maxCar);
    maxRail = Math.max.apply(Math, maxRail);
    /* eslint-enable */

    return [(values.car / maxCar), (values.rail / maxRail), (values.bike / maxBike)];
  }

  getMoveValue = (car, rail, bike) => {
    let maxBike = this.props.triangleData.map((data) => data.modalsplit.bike);
    let maxCar = this.props.triangleData.map((data) => data.modalsplit.car);
    let maxRail = this.props.triangleData.map((data) => data.modalsplit.public);

    /* eslint-disable */
    maxBike = Math.max.apply(Math, maxBike);
    maxCar = Math.max.apply(Math, maxCar);
    maxRail = Math.max.apply(Math, maxRail);
    /* eslint-enable */


    return [(car / maxCar), (rail / maxRail), (bike / maxBike)];
  }

  getBikeRanking = (rawData) => {
    let bikeData = rawData.map((cityData) => {
      const toReturn = { city: null, data: null };
      toReturn.city = cityData.city;
      toReturn.data = cityData.modalsplit.bike;
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
      toReturn.data = cityData.modalsplit.public;
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
      toReturn.data = cityData.modalsplit.car;
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

  renderTriangleData = () => {
    const data = this.props.triangleData.map((cityData) => {
      const toReturn = { data: [], city: null };
      toReturn.city = cityData.city;
      toReturn.data[0] = this.getSpaceValue(cityData.space);
      // Exclude Johannesburg, Moscow, Jakarta... as we have no data
      if (parseFloat(cityData.modalsplit.car) <= 0) {
        toReturn.data[1] = [0,0,0];
      } else {
        toReturn.data[1] = this.getMoveValue(cityData.modalsplit.car, cityData.modalsplit.public, cityData.modalsplit.bike);
      }
      return toReturn;
    });
    return data;
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
            triangleData={this.renderTriangleData()}
            linkMoreInformation={this.props.linkMoreInformation}
          />
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
        `}</style>
      </div>
    );
  }
}

const structuredSelector = createStructuredSelector({
  city: CitySelectors.makeSelectActualCity(),
  triangleData: VersusSelectors.makeSelectVersusData()
});

const mapDispatchToProps = () => ({});

export default connect((state) => {
  return {
    ...structuredSelector(state),
    linkMoreInformation: "https://en.wikipedia.org/wiki/Modal_share"
  }
}, mapDispatchToProps)(VersusPage);
