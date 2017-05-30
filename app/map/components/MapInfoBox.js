import React from 'react';
import { connect } from 'react-redux';

import Link from 'next/link';

import * as identifiers from '../../statemanagement/constants/identifiersConstants';
import * as COLORS from '../../shared/style/colors';

import VehicleIcon from '../../shared/components/VehicleIcon';

class MapInfoBox extends React.Component {

  static propTypes = {
    areaType: React.PropTypes.string,
    parkingData: React.PropTypes.object,
    laneData: React.PropTypes.object,
    activeVehicle: React.PropTypes.string,
    citySlug: React.PropTypes.string,
    closeModal: React.PropTypes.func
  }

  render() {
    let area;
    let headline;

    if (this.props.areaType === identifiers.parkingspace) {
      const neighborhood = this.props.parkingData.get('neighborhood');
      headline = `Parkingspace in ${neighborhood}`;
      area = this.props.parkingData.get('area');
    } else {
      headline = this.props.laneData && this.props.laneData.getIn(['properties','name']);
      area = this.props.laneData && this.props.laneData.getIn(['properties','area']);
    }

    console.log(headline);

    return (
      <div className="MapInfoBox">
        <div className="MapInfoContent">
          <VehicleIcon height={60} width={60} vehicle={this.props.activeVehicle} />
          {headline &&
            <p>{headline}</p>
          }
          {area &&
            <p>{`${area}m² = ${Math.round(parseFloat(area) / 12)} cars`}</p>
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

export default MapInfoBox;
