import React from 'react';

import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';

// Images
const tramIcon = '/static/icons/Icon_Diagram_Rail.svg';
const bikeIcon = '/static/icons/Icon_Diagram_Bike.svg';
const carIcon = '/static/icons/Icon_Diagram_Car.svg';
const curlIcon = '/static/icons/Curl.svg';


class VehicleSpaceComparisonGraph extends React.Component {

  static propTypes = {
    activeVehicle: React.PropTypes.string,
    activeAreaType: React.PropTypes.string
  }

  renderCurl() {
    return (
      <div className="Curl">
        <div className="CurlText">You are<br />
          <span className="BigText">here</span>
        </div>
        <img src={curlIcon} alt="CurlIcon" />
      </div>
    );
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
            this.renderCurl()
          }
          <img src={carIcon} alt="CarIcon" />
          <div className="Graph">
            { this.renderBar(150) }
            { this.renderBar(200) }
          </div>
        </div>
        <div className="Column">
          {this.props.activeVehicle === 'rail' && 
            this.renderCurl()
          }
          <img src={tramIcon} alt="TramIcon" />
          <div className="Graph">
            { this.renderBar(100) }
            { this.renderBar(130) }
          </div>
        </div>
        <div className="Column">
          {this.props.activeVehicle === 'bike' && 
            this.renderCurl()
          }
          <img src={bikeIcon} alt="BikeIcon" />
          <div className="Graph">
            { this.renderBar(50) }
            { this.renderBar(70) }
          </div>
        </div>
        <style jsx>{`
          .Wrapper {
            display: flex;
            margin-right: 50px;
          }

          .Column {
            width: 85px;
            position: relative;
          }

          .Graph {
            display: flex;
            justify-content: center;
          }

          :global(.Bar) {
            background-color: ${COLORS.ColorLightBlue};
            width: 10px;
            margin-left: 2px;
          }

          :global(.Curl) {
            position: absolute;
          }

          :global(.CurlText) {
            position: absolute;
            font-family: 'Sign-Painter';
            transform: rotate(-25deg);
            font-size: 25px;
            width: 100px;
            line-height: 1.1em;
            text-align: center;
            top: -55px;
            left: -50px;
          }

          .BigText {
            font-size: 40px;
          }

        `}</style>
      </div>
    );
  }
}

export default VehicleSpaceComparisonGraph;
