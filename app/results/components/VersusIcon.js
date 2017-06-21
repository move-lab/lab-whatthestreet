import React from 'react';

import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';

const TRIANGLE_EDGE_LENGTH = 640;
const TRIANGLE_H_LENGTH = 555;

class VersusIcon extends React.PureComponent {

  static propTypes = {
    currentCity: React.PropTypes.object,
    triangleData: React.PropTypes.array
  }

  toRadians(degrees) {
      return degrees * Math.PI / 180;
  }

  toDegrees(radians) {
      return radians / Math.PI * 180;
  }

  cot(x) {
      return 1 / Math.tan(x);
  }

  coordinateInTriangle(a, b, c) {
      // See https://en.wikipedia.org/wiki/Ternary_plot
      var sum = a + b + c;
      var fractionA = a / sum;
      var fractionB = b / sum;
      var fractionC = c / sum;

      var y = fractionB * Math.sin(this.toRadians(60));
      var x = fractionA + y * this.cot(this.toRadians(60));

      return {
          "x": x * TRIANGLE_EDGE_LENGTH,
          "y": y * TRIANGLE_EDGE_LENGTH
      }
  }

  renderCity = (triangleData, key) => {
    const allocatedSpace = this.coordinateInTriangle(
      triangleData.space.bike,
      triangleData.space.car,
      triangleData.space.rail
    );

    let usedSpace = 0;

    // We do not have data for some cities
    if(triangleData.modalsplit.car > 0) {
      usedSpace = this.coordinateInTriangle(
        triangleData.modalsplit.bike,
        triangleData.modalsplit.car,
        triangleData.modalsplit.public
      );
    }

    return (
      <g className={`Group ${this.props.currentCity.name === triangleData.city && usedSpace !== 0  ? 'current' : ''}`} key={key}>
        {usedSpace !== 0 &&
          <line className="Line"
            x1={allocatedSpace.x}
            y1={TRIANGLE_H_LENGTH - allocatedSpace.y}
            x2={usedSpace.x}
            y2={TRIANGLE_H_LENGTH - usedSpace.y} />
        }
        <circle
          className={`BigCircle ${usedSpace === 0 ? 'disabled' : ''}`}
          cx={allocatedSpace.x}
          cy={TRIANGLE_H_LENGTH - allocatedSpace.y} 
          r="10" 
          stroke={COLORS.ColorForegroundOrange} 
          strokeWidth="5" 
          fill={COLORS.ColorVersusLightOrange}
        />
        {usedSpace !== 0 &&
          <circle className="SmallCircle"
            cx={usedSpace.x}
            cy={TRIANGLE_H_LENGTH - usedSpace.y}
            r="5"
            fill={COLORS.ColorForegroundOrange}
          />
        }
        <foreignObject className="LabelText"
          x={this.props.currentCity.name !== triangleData.city ? allocatedSpace.x + 25 : allocatedSpace.x - 200}
          y={TRIANGLE_H_LENGTH - allocatedSpace.y}
          width="200" height="15"
        >
          <div xmlns="http://www.w3.org/1999/xhtml" className="City">
            {`${triangleData.city} ${usedSpace === 0 ? '(no used space data)' : ''}`}
          </div>
        </foreignObject>
        <style jsx>{`
          .BigCircle {
            box-shadow: 0 6px 10px 0 rgba(0,0,0,0.08);
          }

          .BigCircle.disabled {
            fill: rgba(128,128,128,0.5);
            stroke: grey;
          }

          .SmallCircle {
            box-shadow: 0 6px 10px 0 rgba(0,0,0,0.08);
          }

          .Line {
            stroke: ${COLORS.ColorVersusLightOrange};
            stroke-width: 2;
          }

          .LabelText {
            overflow: visible;
            display: none;
          }

          .Group:hover .LabelText,.Group.current .LabelText {
            display: inline-block;
          }

          .City {
            font-size: 23px;
            font-weight: 500;
            height: 50px;
            color: ${COLORS.ColorForegroundText};
            margin: 0;
            padding: 10px;
            background-color: ${COLORS.ColorWhite};
            box-shadow: 0 6px 10px 0 rgba(0,0,0,0.08);
            white-space: nowrap;
            z-index: 9999;
            position: relative;
            display: inline;
          }

          .Group:hover .BigCircle,.Group.current .BigCircle {
            stroke: ${COLORS.ColorBlue};
            fill: ${COLORS.ColorsVersusLightBlue};
          }

          .Group:hover circle,.Group.current circle {
            fill: ${COLORS.ColorBlue};
          }

          .Group:hover line,.Group.current line {
            stroke: ${COLORS.ColorsVersusLightBlue};
          }
        `}</style>
      </g>
    );
  }

  render() {
    // Render current city first to be on top of others
    const currentCity = this.props.triangleData.filter((cityData) => {
      return cityData.city === this.props.currentCity.name
    })[0];
    const allOtherCities = this.props.triangleData.filter((cityData) => {
      return cityData.city !== this.props.currentCity.name
    });

    return (
      <div className="Container">
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" baseProfile="full" width="640" height="555" viewBox="0 0 640 555">
          {allOtherCities.map((data, i) => 
            this.renderCity(data, data.city)
          )}
          {this.renderCity(currentCity, currentCity.city)}
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
}

export default VersusIcon;
