import React from 'react';
import { connect } from 'react-redux';

import Link from 'next/link';

import * as identifiers from '../../statemanagement/constants/identifiersConstants';
import * as COLORS from '../../shared/style/colors';

import VehicleIcon from '../../shared/components/VehicleIcon';

class MapInfoBox extends React.Component {

  static propTypes = {
    areaType: React.PropTypes.string,
    neighborhood: React.PropTypes.string,
    area: React.PropTypes.string,
    actualVehicle: React.PropTypes.string,
    citySlug: React.PropTypes.string,
    streetName: React.PropTypes.string,
    closeModal: React.PropTypes.func
  }

  render() {

    const isParkingSpace = this.props.areaType === identifiers.parkingspace;
    const headline = isParkingSpace ? `Parkingspace in ${this.props.neighborhood}` : this.props.streetName;

    return (
      <div className="MapInfoBox">
        <div className="MapInfoContent">
          <VehicleIcon height={60} width={60} vehicle={this.props.actualVehicle} />
          {this.headline &&
            <p>{headline}</p>
          }
          {this.props.area &&
            <p>{`${this.props.area}m² = ${Math.round(parseFloat(this.props.area) / 12)} cars`}</p>
          }
        </div>
        <div className="MapInfoButtons">
          <button className="MapInfoButton" onClick={() => console.log('TODO zoom in')}>+</button>
          <button className="MapInfoButton" onClick={() => console.log('TODO zoom out')}>-</button>
          <a
            className="MapInfoButton"
            onClick={() => this.props.closeModal()}
          >
            Close
          </a>
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
    areaType: state.map.get('areaType'),
    area: state.map.getIn(['itemData','properties','area']),
    neighborhood: state.map.getIn(['itemData','properties','neighborhood']),
    actualVehicle: state.vehicles.get('vehicle'),
    citySlug: state.city.getIn(['actual_city','slug']),
    streetName: state.map.getIn(['itemData','properties','name'])
  }
})(MapInfoBox);
