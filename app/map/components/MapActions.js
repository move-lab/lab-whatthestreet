import React from 'react';
import { connect } from 'react-redux';

import * as identifiers from '../../statemanagement/constants/identifiersConstants';
import * as COLORS from '../../shared/style/colors';

class MapActions extends React.PureComponent {

  static propTypes = {
    activeLayer: React.PropTypes.string,
    zoomIn: React.PropTypes.func,
    zoomOut: React.PropTypes.func,
    toggleLayer: React.PropTypes.func
  }

  render() {
    return (
      <div className="MapActions">
        <div
          className={`LayerSwitch ${this.props.activeLayer === identifiers.satelliteLayer ? 'satellite' : 'street'}`}
          onClick={this.props.toggleLayer}
        >
          {this.props.activeLayer === identifiers.satelliteLayer &&
            <div
              className="LayerSwitchText"
            >
              Switch to Road
            </div>
          }
          {this.props.activeLayer === identifiers.streetLayer &&
            <div
              className="LayerSwitchText"
            >
              Switch to Satellite
            </div>
          }
        </div>
        <div className="ZoomControls">
            <div
              className="ZoomControl ZoomControlIn"
              onClick={this.props.zoomIn}
            >
              <img src="/static/icons/Icon_Plus.svg" alt="close map"/>
            </div>
            <div
              className="ZoomControl ZoomControlOut"
              onClick={this.props.zoomOut}
            >
              <img src="/static/icons/Icon_Minus.svg" alt="close map"/>
            </div>
        </div>
        <style jsx>{`
          .MapActions {
            position: absolute;
            right: 70px;
            bottom: 50px;
            z-index: 100000000;
            display: flex;
            flex-direction: row;
          }

          .LayerSwitch {
            width: 120px;
            height: 120px;
            box-shadow: ${COLORS.boxshadow};
            background-color: ${COLORS.ColorBackgroundWhite};
            background-size: cover;
            padding: 10px;
            border: 5px solid white;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }

          .LayerSwitch.satellite {
            background-image: url("/static/images/layer-road.jpg");
          }

          .LayerSwitch.street .LayerSwitchText {
            color: white;
          }

          .LayerSwitch.street {
            background-image: url("/static/images/layer-satellite.jpg");
          }

          .LayerSwitchText {
            text-align: center;
            font-weight: 500;
            line-height: 1.3em;
            font-size: 20px;
          }

          .LayerSwitch:hover .LayerSwitchText,
          .LayerSwitch:focus .LayerSwitchText,
          .LayerSwitch:active .LayerSwitchText {
            opacity: 0.7;
          }

          .ZoomControls {
            margin-left: 10px;
            background-color: ${COLORS.ColorBackgroundWhite};
            box-shadow: ${COLORS.boxshadow};
            display: flex;
            flex-direction: column;
          }

          .ZoomControl {
            width: 60px;
            height: 60px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }

          .ZoomControlIn {
            border-bottom: 2px solid ${COLORS.ColorBlueishGray};
          }

          .ZoomControl img {
            width: 25px;
            height: 25px;
          }

          .ZoomControl:hover img,
          .ZoomControl:focus img,
          .ZoomControl:active img {
            opacity: 0.5;
          }
        `}</style>
      </div>
    );
  }
}

export default MapActions;
