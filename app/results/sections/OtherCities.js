import React from 'react';

import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';

class OtherCities extends React.Component {

  static propTypes = {
    cities: React.PropTypes.arrayOf(React.PropTypes.object),
    city: React.PropTypes.object,
  }

  renderCityLink = (city, index) => (
    <li className="ListItem" key={index}>
      <a href={`/${city.slug}`} className="Link">{city.name}</a>
    </li>
  )

  render() {
    return (
      <div className="MainContainer" style={{ backgroundImage: `url(/api/v1/cities/${this.props.city.name.replace(/\s+/g, '')}/background)` }}>
        <div className="Wrapper">
          <h2 className="Title">
            More Cities to discover
          </h2>
          <ul className="List">
            {this.props.cities.map((city, index) => this.renderCityLink(city, index))}
          </ul>
        </div>
        <style jsx>{`
          .MainContainer {
            color: white;
            background-color: ${COLORS.OtherCitiesBackgroundColor};
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
          }

          .Wrapper {
            width: ${METRICS.MetricsContentWidth};
            padding: ${METRICS.MetricsSectionPadding} ${METRICS.MetricsContentPadding};
            margin: 0 auto;
          }

          .Title {
            font-size: 34px;
            font-weight: 500;
            margin: 0 0 40px 0;
          }

          .List {
            list-style: none;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: flex-start;
          }

          .Wrapper :global(.ListItem) {
            flex-basis: 50%;
            font-size: 47px;
            line-height: 68px;
          }

          .Wrapper :global(.Link) {
            cursor: pointer;
            font-size: 47px;
            line-height: 56px;
            color: white;
            text-decoration: none;
          }
        `}</style>
      </div>
    );
  }
}

export default OtherCities;
