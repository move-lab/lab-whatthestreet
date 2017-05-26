import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import LongestStreets from '../components/LongestStreets';
import LongestStreetNames from '../components/LongestStreetNames';
import CitizenOwnership from '../components/CitizenOwnership';

// Selectors
import { CityMetaSelectors } from '../../statemanagement/selectors';

import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';

class Stats extends React.Component {

  static propTypes = {
    cityMetaData: React.PropTypes.object.isRequired,
    longestStreets: React.PropTypes.arrayOf(React.PropTypes.object),
  }

  getBackground = (city) => (`/api/v1/cities/${city}/background`)

  calculateOwnership = () => {
    const population = this.props.cityMetaData.population;
    const moving = this.props.cityMetaData.moving;
    const parking = this.props.cityMetaData.parking;

    return {
      moving: {
        bike: Math.round((moving.bike.length / population) * 10) / 10,
        rails: Math.round((moving.rail.length / population) * 10) / 10,
        road: Math.round((moving.rail.length / population) * 10) / 10,
      },
      parking: {
        bike: Math.round((parking.bike.number / population) * 10) / 10,
        rails: Math.round((parking.rail.length / population) * 10) / 10,
        road: Math.round(((parking.car.onStreet.number + parking.car.offStreet.number) / population) * 10) / 10,
      },
    };
  }

  render = () => {
    return (
      <div className="MainContainer" style={{ backgroundImage: `url(${this.getBackground(this.props.cityMetaData.name)})` }}>
        <div className="Wrapper">
          <h2 className="Title">
            About
            <br />
            {this.props.cityMetaData.name}
          </h2>
          <LongestStreets city={this.props.cityMetaData.name} streets={this.props.cityMetaData.streets.longestStreets} />
          <LongestStreetNames streets={this.props.cityMetaData.streets.longestNames} />
          <CitizenOwnership city={this.props.cityMetaData.name} data={this.calculateOwnership()} />
        </div>
        <style jsx>{`
          .MainContainer {
            padding-top: ${METRICS.MetricsSectionPadding};
            padding-bottom: ${METRICS.MetricsSectionPadding};
            background-color: ${COLORS.ColorBlue};
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
          }

          .Wrapper {
            width: ${METRICS.MetricsContentWidth};
            padding: 0 ${METRICS.MetricsContentPadding};
            margin: 0 auto;
          }

          .Title {
            font-size: 47px;
            line-height: 56px;
            font-weight: 500;
            color: white;
            margin: 0 0 150px 0;
          }
        `}
        </style>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  cityMetaData: CityMetaSelectors.makeSelectCityMetaData(),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
