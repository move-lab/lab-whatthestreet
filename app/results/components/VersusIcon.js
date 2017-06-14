import React from 'react';

import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';

class VersusIcon extends React.PureComponent {

  static propTypes = {
    cityAndData: React.PropTypes.arrayOf(React.PropTypes.object),
  }

  getCoordinates = (array) => {
    // The coordinates of the 3 methods are calculated by the input array (all between 0 and 1)
    const carX = 320;
    const carY = (1 - array[0]) * 554.256258422040734;
    const railX = (1 - array[1]) * 480;
    const railY = 277.12812921102 + (array[1] * 277.12812921102);
    const bikeX = 160 + (array[2] * 480);
    const bikeY = 277.12812921102 + (array[2] * 277.12812921102);

    // The vector from cars point to rails point
    const carToRailX = railX - carX;
    const carToRailY = railY - carY;

    // The middlepoint of cars point and rails point
    const carToRailMX = carX + (0.5 * carToRailX);
    const carToRailMY = carY + (0.5 * carToRailY);

    // The vector from bikes point to the middlepoint
    const bikeToMX = carToRailMX - bikeX;
    const bikeToMY = carToRailMY - bikeY;

    // The length of this vector
    const bikeToM = Math.sqrt((bikeToMX ** 2) + (bikeToMY ** 2));

    // The unit vector (in German "Einheitsvektor") of the one above
    const bikeToMXOne = bikeToMX / bikeToM;
    const bikeToMYOne = bikeToMY / bikeToM;

    // The coordinates of the centerpoint is calculated by adding 2/3 of the length of the vector multiplied with the unit vector to the bike point
    const resultX = bikeX + ((2 / 3) * bikeToM * bikeToMXOne);
    const resultY = bikeY + ((2 / 3) * bikeToM * bikeToMYOne);

    const result = [resultX, resultY];
    // console.log( carX + ' - ' + carY + '\n' + railX + ' - ' + railY + '\n' + bikeX + ' - ' + bikeY + '\n' + resultX + ' - ' + resultY);
    return result;
  }

  renderGroup = (cityAndData, index) => {
    const allocatedSpace = this.getCoordinates(cityAndData.data[0]);
    let usedSpace = 0;
    if(cityAndData.data[1][0] > 0) {
      usedSpace = this.getCoordinates(cityAndData.data[1]);
    }
    

    return (
      <g className="Group" key={index}>
        {usedSpace !== 0 &&
          <line className="Line" x1={allocatedSpace[0]} y1={allocatedSpace[1]} x2={usedSpace[0]} y2={usedSpace[1]} />
        }
        <circle className="BigCircle" cx={allocatedSpace[0]} cy={allocatedSpace[1]} r="15" stroke={COLORS.ColorForegroundOrange} strokeWidth="10" fill={COLORS.ColorVersusLightOrange} />
        {usedSpace !== 0 &&
          <circle className="SmallCircle" cx={usedSpace[0]} cy={usedSpace[1]} r="10" fill={COLORS.ColorForegroundOrange} />
        }
        <foreignObject x={allocatedSpace[0] + 25} y={allocatedSpace[1] - 50}>
          <p className="City">
            {cityAndData.city}
          </p>
        </foreignObject>
        <style jsx>{`
          .BigCircle {
            box-shadow: 0 6px 10px 0 rgba(0,0,0,0.08);
          }

          .SmallCircle {
            box-shadow: 0 6px 10px 0 rgba(0,0,0,0.08);
          }

          .Line {
            stroke: ${COLORS.ColorVersusLightOrange};
            stroke-width: 2;
          }

          .City {
            font-size: 23px;
            font-weight: 500;
            height: 50px;
            display: none;
            color: ${COLORS.ColorForegroundText};
            margin: 0;
            padding: 10px;
            background-color: ${COLORS.ColorWhite};
            box-shadow: 0 6px 10px 0 rgba(0,0,0,0.08);
            white-space: nowrap;
            z-index: 9999;
            position: relative;
          }

          .Group:hover .BigCircle {
            stroke: ${COLORS.ColorBlue};
            fill: ${COLORS.ColorsVersusLightBlue};
          }

          .Group:hover circle {
            fill: ${COLORS.ColorBlue};
          }

          .Group:hover line {
            stroke: ${COLORS.ColorsVersusLightBlue};
          }

          .Group:hover foreignObject p {
            display: inline;
          }
        `}</style>
      </g>
    );
  }

  render = () => (
    <div className="Container">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="640" height="555" viewBox="0 0 640 555">
        {this.props.cityAndData.map((data, i) => this.renderGroup(data, i))}
      </svg>
      <style jsx>{`
        .Container {
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
    </div>
  )
}

export default VersusIcon;
