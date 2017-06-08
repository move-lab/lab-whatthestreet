import React from 'react';
import { connect } from 'react-redux';

import Link from 'next/link';

import * as identifiers from '../../statemanagement/constants/identifiersConstants';
import * as COLORS from '../../shared/style/colors';

import VehicleIcon from '../../shared/components/VehicleIcon';

class MapInfoBox extends React.PureComponent {

  static propTypes = {
    areaType: React.PropTypes.string,
    parkingData: React.PropTypes.object,
    laneData: React.PropTypes.object,
    activeVehicle: React.PropTypes.string,
    citySlug: React.PropTypes.string
  }

  render() {
    let area;
    let headline;

    if (this.props.areaType === identifiers.parkingspace &&
        this.props.activeVehicle !== 'rail' &&
        this.props.parkingData) {
      const neighborhood = this.props.parkingData.get('neighborhood');
      if(neighborhood) {
        headline = `Parking space in ${neighborhood}`;
      } else {
        headline = `Parking space`;
      }
      area = this.props.parkingData.get('area');
    } else if(this.props.areaType === identifiers.parkingspace &&
        this.props.activeVehicle === 'rail' &&
        this.props.laneData) {
        const neighborhood = this.props.laneData.getIn(['properties','neighborhood']);
        if(neighborhood) {
          headline = `Parking space in ${neighborhood}`;
        } else {
          headline = `Parking space`;
        }
        area = this.props.laneData.getIn(['properties','area']);
    } else if(this.props.laneData) {
      headline = this.props.laneData.getIn(['properties','name']);
      if(!headline) {
        headline = "Lane";
      }
      area = this.props.laneData.getIn(['properties','area']);
    }

    return (
      <div className="MapInfoBox">
        <div className="MapInfoContent">
          <VehicleIcon height={60} width={60} vehicle={this.props.activeVehicle} />
          {headline &&
            <p className="headline">{headline}</p>
          }
          {area &&
            <p>{`${area}m² = ${Math.round(parseFloat(area) / 12)} cars`}</p>
          }
        </div>
        <style jsx>{`
          .MapInfoBox {
            position: absolute;
            background-color: ${COLORS.ColorBackgroundWhite};
            display: flex;
            min-width: 280px;
            min-height: 150px;
            left: 70px;
            z-index: 100000000;
            display: flex;
            flex-direction: column;
            box-shadow: ${COLORS.boxshadow};
          }

          .MapInfoContent {
            flex-grow: 1;
            padding: 15px;
            text-align: center;
            font-size: 1.2em;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .MapInfoContent p {
            margin: 0;
            color: ${COLORS.ColorForegroundOrange};
          }

          .MapInfoContent .headline {
            font-weight: 500;
            margin-bottom: 10px;
            margin-top: 10px;
          }
        `}</style>
      </div>
    );
  }
}

export default MapInfoBox;
