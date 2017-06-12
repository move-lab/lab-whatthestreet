import React from 'react';
import { connect } from 'react-redux';

import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';

import { computeSvgHeights } from '../../shared/utils/svgHeights';

// Images
const tramIcon = '/static/icons/Icon_Diagram_Rail.svg';
const bikeIcon = '/static/icons/Icon_Diagram_Bike.svg';
const carIcon = '/static/icons/Icon_Diagram_Car.svg';
const curlIcon = '/static/icons/Curl.svg';


class VehicleSpaceComparisonGraph extends React.Component {

  static propTypes = {
    mode: React.PropTypes.oneOf(["parking", "lanes"]),
    activeVehicle: React.PropTypes.string,
    svgHeights: React.PropTypes.object
  }

  constructor(props) {
    super(props);

    this.overviewHeight = 230;
    // TODO MAKE SURE THE TALLEST IS ALWAYS CAR LANE
    this.tallestSvgHeight = props.svgHeights.getIn(['car','lanes','height']);
  }

  renderCurl(vehicleType, mode) {
    return (
      <div className="Curl" style={{ top: this.getBarHeight(vehicleType, mode) + 30 }}>
        <div className="CurlText">You are<br />
          <span className="BigText">here</span>
        </div>
        <img src={curlIcon} alt="CurlIcon" />
      </div>
    );
  }

  getBarHeight(vehicleType, areaType) {
    return this.overviewHeight * this.props.svgHeights.getIn([ vehicleType, areaType,'height']) / this.tallestSvgHeight; 
  }

  renderBar(value) {
    return (
      <div className="Bar" style={{ height: `${value}px` }} />
    );
  }

  render() {
    return (
      <div className="Wrapper">
        <div className="Column">
          {this.props.activeVehicle === 'car' && 
            this.renderCurl('car', this.props.mode)
          }
          <img src={carIcon} alt="CarIcon" />
          <div className="Graph">
            { this.renderBar(this.getBarHeight("car", "parking")) }
            { this.renderBar(this.getBarHeight("car", "lanes")) }
          </div>
        </div>
        <div className="Column">
          {this.props.activeVehicle === 'rail' && 
            this.renderCurl('rail', this.props.mode)
          }
          <img src={tramIcon} alt="TramIcon" />
          <div className="Graph">
            { this.renderBar(this.getBarHeight("rail", "parking")) }
            { this.renderBar(this.getBarHeight("rail", "lanes")) }
          </div>
        </div>
        <div className="Column">
          {this.props.activeVehicle === 'bike' && 
            this.renderCurl('bike', this.props.mode)
          }
          <img src={bikeIcon} alt="BikeIcon" />
          <div className="Graph">
            { this.renderBar(this.getBarHeight("bike", "parking")) }
            { this.renderBar(this.getBarHeight("bike", "lanes")) }
          </div>
        </div>
        <style jsx>{`
          .Wrapper {
            display: flex;
            margin-right: 50px;
            margin-bottom: 150px;
          }

          .Column {
            width: 85px;
            position: relative;
          }

          .Graph {
            display: flex;
            justify-content: center;
          }

          .Wrapper :global(.Bar) {
            background-color: ${COLORS.ColorLightBlue};
            width: 10px;
            margin-left: 2px;
          }

          .Wrapper :global(.Curl) {
            position: absolute;
            left: 5px;
          }

          .Wrapper :global(.CurlText) {
            position: absolute;
            font-family: 'Sign-Painter';
            transform: rotate(-25deg);
            font-size: 25px;
            width: 100px;
            line-height: 1.1em;
            text-align: center;
            top: 80px;
            left: 0px;
            color: ${COLORS.ColorForegroundOrange};
          }

          .BigText {
            font-size: 40px;
          }

        `}</style>
      </div>
    );
  }
}

export default connect((state) => {
  
  return {
    svgHeights: computeSvgHeights(state.cityMeta),
    activeVehicle: state.vehicles.get('vehicle')
  }
})(VehicleSpaceComparisonGraph);
