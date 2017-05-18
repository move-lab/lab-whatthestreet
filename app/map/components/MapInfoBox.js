import React from 'react';
import { connect } from 'react-redux';

import Link from 'next/link';

import { MapSelectors, StreetSelectors } from '../../statemanagement/selectors';

import * as identifiers from '../../statemanagement/constants/identifiersConstants';
import * as COLORS from '../../shared/style/colors';

import VehicleIcon from '../../shared/components/VehicleIcon';

class MapInfoBox extends React.Component {

  static propTypes = {
    mapMode: React.PropTypes.string,
    neighborhood: React.PropTypes.string,
    street: React.PropTypes.object,
    mapArea: React.PropTypes.number,
    actualVehicle: React.PropTypes.string
  }

  render() {

    const isParkingSpace = this.props.mapMode === identifiers.parkingspace;
    const headline = isParkingSpace ? `Parkingspace in ${this.props.neighborhood}` : this.props.street.properties && this.props.street.properties.name;
    const area = isParkingSpace ? this.props.mapArea : this.props.street.properties && this.props.street.properties.area;

    return (
      <div className="MapInfoBox">
        <div className="MapInfoContent">
          <VehicleIcon height={60} width={60} vehicle={this.props.actualVehicle} />
          <p>{headline}</p>
          <p>{`${area}m² = ${Math.round(area / 12)} cars`}</p>
        </div>
        <div className="MapInfoButtons">
          <button className="MapInfoButton" onClick={() => console.log('TODO zoom in')}>+</button>
          <button className="MapInfoButton" onClick={() => console.log('TODO zoom out')}>-</button>
          <Link href="/" prefetch>
            <a className="MapInfoButton" onClick={() => console.log('TODO close')}>Close</a>
          </Link>
        </div>
        <style jsx>{`
          .MapInfoBox {
            position: absolute;
            background-color: ${COLORS.ColorBackgroundWhite};
            display: flex;
            width: 280px;
            min-height: 200px;
            left: 70px;
            z-index: 100000000;
            display: flex;
            flex-direction: column;
          }

          .MapInfoContent {
            flex-grow: 1;
            padding: 15px;
            text-align: center;
            font-size: 1.2em;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .MapInfoContent p {
            margin: 0;
          }

          .MapInfoButtons {
            height: 50px;
            border-top: 1px solid #eee;
            display: flex;
          }

          .MapInfoButton {
            border-left: 1px solid #eee;
            flex-grow: 1;
            justify-content: center;
            align-items: center;
            display: flex;
            text-decoration: none;
            color: black;
          }

          .MapInfoButton:hover {
            opacity: 0.5;
          }

          .MapInfoButton:first-child {
            border-left: 0;
          }
        `}</style>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    mapArea: MapSelectors.selectArea(),
    mapMode: MapSelectors.selectMapMode(),
    neighborhood: MapSelectors.selectNeighborhood(),
    street: StreetSelectors.selectStreet(),
    actualVehicle: state.vehicles.get('vehicle')
  }
})(MapInfoBox);
