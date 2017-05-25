import React from 'react';

// Components
import VersusRanking from './VersusRanking';

// Images
const IconCar = '/static/icons/Icon_SpaceAllocation_Car.svg';
const IconRail = '/static/icons/Icon_SpaceAllocation_Rail.svg';
const IconBike = '/static/icons/Icon_SpaceAllocation_Bike.svg';

import * as COLORS from '../../shared/style/colors';

/**
 * Renders Table of Versus Page
 */
class VersusTable extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    tableData: React.PropTypes.object,
  }

  render() {
    return (
      <div className="Container">
        <div className="Column">
          <img className="ColumnIcon" alt="IconBike" src={IconBike} />
          <VersusRanking currentCity={this.props.tableData.currentCity.name} rankings={this.props.tableData.bike} />
        </div>
        <div className="Border" />
        <div className="Column">
          <img className="ColumnIcon" style={{ marginLeft: 60 }} alt="IconRail" src={IconRail} />
          <VersusRanking currentCity={this.props.tableData.currentCity.name} rankings={this.props.tableData.rail} />
        </div>
        <div className="Border" />
        <div className="Column">
          <img className="ColumnIcon" style={{ marginLeft: 40 }} alt="IconCar" src={IconCar} />
          <VersusRanking currentCity={this.props.tableData.currentCity.name} rankings={this.props.tableData.car} />
        </div>
        <style jsx>{`
          .Container {
            background-color: white;
            display: flex;
            color: ${COLORS.ColorForegroundText};
          }

          .Column {
            background-color: white;
            width: 319px;
            flex-grow: 1;
            padding-bottom: 70px;
          }

          .ColumnIcon {
            margin-top: 20px;
            margin-left: 25px;
            overflow: visible;
          }

          .Border {
            background-color: ${COLORS.VersusTableBorderColor};
            width: 2px;
          }
        `}</style>
      </div>
    );
  }
}

export default VersusTable;
