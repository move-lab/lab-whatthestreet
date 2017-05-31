import React from 'react';
import { connect } from 'react-redux';

import * as COLORS from '../../shared/style/colors';

class ScrollPositionOverview extends React.PureComponent {

  static propTypes = {
    activeVehicle: React.PropTypes.string,
    scrollPosition: React.PropTypes.number,
    svgHeights: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.overviewHeight = 230;
    // TODO MAKE SURE THE TALLEST IS ALWAYS CAR LANE
    this.tallestSvgHeight = props.svgHeights.getIn(['car','lanes','height']);
  }


  getColumnHeight(vehicleType, areaType) {
    return this.overviewHeight * this.props.svgHeights.getIn([ vehicleType, areaType,'height']) / this.tallestSvgHeight; 
  }

  getScrollIndicatorPosition() {
    if(this.props.scrollPosition) {
      return Math.round(this.overviewHeight * this.props.scrollPosition / this.tallestSvgHeight - 2.5);
    } else {
      return -2.5;
    }
  }

  render() {

    return (
      <div className="ScrollPositionOverview">
        <div className={`VehicleOverview ${this.props.activeVehicle === 'car' ? 'active' : ''}`}>
          <div className="ColumnOverview" style={{ height: this.getColumnHeight('car','parking') }}>
          </div>
          <div className="ColumnOverview" style={{ height: this.getColumnHeight('car','lanes') }}>
          </div>
          <div className="ScrollIndicator" style={{ top: this.getScrollIndicatorPosition() }}></div>
        </div>
        <div className={`VehicleOverview ${this.props.activeVehicle === 'rail' ? 'active' : ''}`}>
          <div className="ColumnOverview" style={{ height: this.getColumnHeight('rail','parking') }}>
          </div>
          <div className="ColumnOverview" style={{ height: this.getColumnHeight('rail','lanes') }}>
          </div>
          <div className="ScrollIndicator" style={{ top: this.getScrollIndicatorPosition() }}></div>
        </div>
        <div className={`VehicleOverview ${this.props.activeVehicle === 'bike' ? 'active' : ''}`}>
          <div className="ColumnOverview" style={{ height: this.getColumnHeight('bike','parking') }}>
          </div>
          <div className="ColumnOverview" style={{ height: this.getColumnHeight('bike','lanes') }}>
          </div>
          <div className="ScrollIndicator" style={{ top: this.getScrollIndicatorPosition() }}></div>
        </div>

        <style jsx>{`
          .ScrollPositionOverview {
            height: ${this.overviewHeight}px;
            display: flex;
          }
          
          .VehicleOverview {
            opacity: 0.5;
            display: flex;
            position: relative;
          }

          .VehicleOverview.active {
            opacity: 1;
          }

          .VehicleOverview.active .ScrollIndicator {
            background-color: ${COLORS.ColorForegroundOrange};
            position: absolute;
            width: 10px;
            height: 5px;
          }

          .ColumnOverview {
            width: 4px;
            background-color: ${COLORS.pathcolor};
            margin-right: 2px;
          }
        `}</style>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    svgHeights: state.cityMeta.getIn(['metaData','svg']),
    scrollPosition: state.explore.get('scrollPosition'),
    activeVehicle: state.vehicles.get('vehicle')
  }
})(ScrollPositionOverview);
