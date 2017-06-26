import React from 'react';

import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';

import ShareBtn from '../../shared/components/ShareBtn';

class GifItem extends React.PureComponent {

  static propTypes = {
    shareUrl: React.PropTypes.string,
    videoUrl: React.PropTypes.string,
    name: React.PropTypes.string,
    streetName: React.PropTypes.string,
    cityName: React.PropTypes.string,
    big : React.PropTypes.bool
  }
  
  constructor(props) {
    super(props);

    this.playVideo = this.playVideo.bind(this);
    this.stopVideo = this.stopVideo.bind(this);
    this.goToMap = this.goToMap.bind(this);
  }

  playVideo() {
    this.video.play()
  }

  stopVideo() {
    this.video.pause()
  }

  goToMap() {
    window.open(this.props.shareUrl, "_self");
  }

  render() {
    return (
      <div className={`GifContainer ${this.props.big ? 'big' : ''}`}>
        <ShareBtn
          onMouseOver={this.playVideo}
          onMouseOut={this.stopVideo}
          urlToShare={this.props.shareUrl}
          textToShare={`👉🚗 👀  ${this.props.streetName} in ${this.props.cityName}! #WhatTheStreet`}
        />
        <video 
          ref={(el) => this.video = el}
          src={this.props.videoUrl}
          loop
          onMouseOver={this.playVideo}
          onMouseOut={this.stopVideo}
          onClick={this.goToMap}
        >
        </video>
        <div className="StreetName">
          {this.props.name}
        </div>
        <style jsx>{`
          .GifContainer {
            width: 160px;
            height: 160px;
            cursor: pointer;
            position: relative;
            margin-left: 20px;
            margin-right: 20px;
          }

          .GifContainer.big {
            width: 400px;
            height: 400px;
            margin: 0;
          }

          .GifContainer video {
            width: 100%;
          }

          .StreetName {
            text-overflow: ellipsis;
            width: 100%;
            overflow: hidden;
            padding-top: 10px;
            font-size: 19px;
            font-weight: 500;
            text-align: center;
            white-space: nowrap;
          }
        `}</style>
      </div>
    );
  }
}

export default GifItem;
