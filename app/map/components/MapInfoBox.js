import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Link from 'next/link';

import * as identifiers from '../../statemanagement/constants/identifiersConstants';
import * as COLORS from '../../shared/style/colors';

import VehicleIcon from '../../shared/components/VehicleIcon';
import ShareBtn from '../../shared/components/ShareBtn';

import GifData from '../../../gifgallery.json';


class MapInfoBox extends React.PureComponent {

  static propTypes = {
    areaType: React.PropTypes.string,
    parkingData: React.PropTypes.object,
    laneData: React.PropTypes.object,
    activeVehicle: React.PropTypes.string,
    citySlug: React.PropTypes.string,
    cityName: React.PropTypes.string
  }

  constructor(props) {
    super(props);

    this.playVideo = this.playVideo.bind(this);
    this.stopVideo = this.stopVideo.bind(this);

    this.state = {
      FH : new Intl.NumberFormat('en-US'),
      displayVideo: false
    }
  }

  getTypeOfMobilityLabel(mobilityType) {
    if(mobilityType === "car") {
      return "Street";
    } else if(mobilityType === "bike") {
      return "Biketrack";
    } else if(mobilityType === "rail") {
      return "Railtrack";
    }
  }

  getLaneLabel(laneName, neighborhoodName, mobilityType, cityName) {
    let laneLabel;
    if(laneName) {
      laneLabel = laneName;
    } else if(neighborhoodName) {
      laneLabel = `${this.getTypeOfMobilityLabel(mobilityType)} in ${neighborhoodName}`;
    } else {
      laneLabel = `${this.getTypeOfMobilityLabel(mobilityType)} in ${cityName}`;
    }
    return laneLabel;
  }

  getLaneSubLabel(laneLenght, laneArea) {
    return `${this.state.FH.format(Math.round(laneLenght))}m = ${this.state.FH.format(Math.round(laneArea))}m²`;
  }

  getParkingLabel(neighborhood, cityName) {
    if(neighborhood) {
      return `Parking space in ${neighborhood}`;
    } else {
      return `Parking space in ${cityName}`;
    }
  }

  getParkingSubLabel(mobilityType, parkingArea) {
    if(mobilityType === "car") {
      return `${this.state.FH.format(Math.round(parkingArea))}m² = ${this.state.FH.format(Math.round(parkingArea / 12))} cars`;
    } else if(mobilityType === "bike") {
      return `${this.state.FH.format(Math.round(parkingArea))}m² = ${this.state.FH.format(Math.round(parkingArea / 1.6))} bikes`;
    } else if(mobilityType === "rail") {
      return `${this.state.FH.format(Math.round(parkingArea))}m² = ${this.state.FH.format(Math.round(parkingArea / 30))} wagons`;
    }
  }

  playVideo() {
    this.video.play()
  }

  stopVideo() {
    this.video.pause()
  }

  componentWillReceiveProps(newProps) {
    if(newProps.laneData !== null) {
      // Check if gif exists before displaying it
      const urlVideoUncoil = `${GifData.baseUrl}/${this.props.citySlug}/${this.props.activeVehicle}/${newProps.laneData.get('_id')}.mp4`;
      axios.head(urlVideoUncoil).then(() => {
        console.log('video exists');
        this.setState({
          displayVideo: true,
          urlVideoUncoil
        });
      }, () => {
        // TODO REMOVE THAT CALLBACK WHEN CORS WILL BE WORKING
        this.setState({
          displayVideo: true,
          urlVideoUncoil
        });
      });
    } else {
      this.setState({ displayVideo: false });
    }
  }

  render() {

    return (
      <div className="MapInfoBox">
        <div className="MapInfoContent">
          <VehicleIcon height={60} width={60} vehicle={this.props.activeVehicle} />
          {this.props.areaType === identifiers.parkingspace &&
           this.props.activeVehicle === 'rail' &&
           this.props.laneData &&
            <div>
              <p className="headline">
                {this.getParkingLabel(this.props.laneData.getIn(['properties','neighborhood']),
                                      this.props.cityName)}
              </p>
              <p>{this.getParkingSubLabel(this.props.activeVehicle ,
                                          this.props.laneData.getIn(['properties','area']))}</p>
            </div>
          }
          {this.props.areaType === identifiers.parkingspace &&
           this.props.activeVehicle !== 'rail' &&
           this.props.parkingData &&
            <div>
              <p className="headline">
                {this.getParkingLabel(this.props.parkingData.get('neighborhood'),
                                      this.props.cityName)}
              </p>
              <p>{this.getParkingSubLabel(this.props.activeVehicle ,
                                          this.props.parkingData.get('area'))}</p>
            </div>
          }
          {this.props.areaType === identifiers.lanes &&
          this.props.laneData &&
            <div>
              <p className="headline">
                {this.getLaneLabel(this.props.laneData.getIn(['properties','name']),
                                   this.props.laneData.getIn(['properties','neighborhood']),
                                   this.props.activeVehicle,
                                   this.props.cityName)}
              </p>
              <p>{this.getLaneSubLabel(this.props.laneData.getIn(['properties','length']),
                                       this.props.laneData.getIn(['properties','area']))}</p>
            </div>
          }
        </div>
        {this.state.displayVideo &&
          <div className="MapInfoGif">
            <ShareBtn
              onMouseOver={this.playVideo}
              onMouseOut={this.stopVideo}
              bottom={50}
            />
            <video 
              ref={(el) => this.video = el}
              src={this.state.urlVideoUncoil}
              loop
              onMouseOver={this.playVideo}
              onMouseOut={this.stopVideo}
            >
            </video>
          </div>
        }
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
            flex-direction: row;
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

          .MapInfoGif {
            width: 160px;
            padding: 10px;
            cursor: pointer;
          }

          .MapInfoGif video {
            width: 100%;
          }
        `}</style>
      </div>
    );
  }
}

export default MapInfoBox;
