import React from 'react';
import Router from 'next/router';
import _find from 'lodash.find';
import _sampleSize from 'lodash.samplesize';

import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';

import GifItem from '../components/GifItem';
import RoundedButton from '../../shared/components/RoundedButton';

import GifData from '../../../gifgallery.json';

class GifSection extends React.PureComponent {

  static propTypes = {
    city: React.PropTypes.object,
    ownGuess: React.PropTypes.object
  }
  
  constructor(props) {
    super(props);
  }

  getVideoUrl(staffPickData) {
   return `${GifData.baseUrl}/${staffPickData.citySlug}/car/${staffPickData.id}.mp4`; 
  }

  getShareUrl(staffPickData) {
   return `http://whatthestreet.moovellab.com/${staffPickData.citySlug}/explore/car/lanes/${staffPickData.id}`; 
  }

  getShareText(staffPickData) {
    return `👉🚗 👀  ${staffPickData.streetName} in ${staffPickData.cityName}! #WhatTheStreet`;
  }

  render() {

    const staffPickForThisCity = _find(GifData.staffPicks, { cityName: this.props.city.name});
    const fiveCityPicksRandom = _sampleSize(staffPickForThisCity, 5);
    const bigPick = fiveCityPicksRandom[0];
    const fourSmallPicks = fiveCityPicksRandom.splice(0,1);
    const fiveAllCityRandom = _sampleSize(GifData.staffPicks, 5);

    return (
      <div className="GifSection">
        <div className="Wrapper">
          <h2 className="Title">
            Street sausage gif gallery
          </h2>
          {staffPickForThisCity && staffPickForThisCity.length >= 5 &&
            <div className="CitySection">
              <h4 className="SubTitle">
                {this.props.city.name}
              </h4>
              <div className="CityGifContainer">
                <div className="CityGifBig">
                  <GifItem
                    big
                    name={bigPick.streetName}
                    streetName={bigPick.streetName}
                    cityName={bigPick.cityName}
                    shareUrl={this.getShareUrl(bigPick)}
                    videoUrl={this.getVideoUrl(bigPick)}
                  />
                </div>
                <div className="CityGifWrapper">
                  {fourSmallPicks.map((staffPickData) =>
                    <GifItem
                      key={staffPickData.id}
                      name={staffPickData.streetName}
                      streetName={staffPickData.streetName}
                      cityName={staffPickData.cityName}
                      shareUrl={this.getShareUrl(staffPickData)}
                      videoUrl={this.getVideoUrl(staffPickData)}
                    />
                  )}
                </div>
              </div>
            </div>
          }
          <div className="OtherCitySection">
            <h4 className="SubTitle">
              Across the world
            </h4>
            <div className="OtherCityContainer">
              {fiveAllCityRandom.map((staffPickData) =>
                <GifItem
                  key={staffPickData.id}
                  name={staffPickData.cityName}
                  streetName={staffPickData.streetName}
                  cityName={staffPickData.cityName}
                  shareUrl={this.getShareUrl(staffPickData)}
                  videoUrl={this.getVideoUrl(staffPickData)}
                />
              )}
            </div>
          </div>
          <div className="OtherCitySection">
            <h4 className="SubTitle">
              Create your own gif
            </h4>
            <div className="OtherCityContent">
              <div className="Text">
                Create your own gif by on any of the streets you encountered before
              </div>
              <div>
                <RoundedButton
                  onClick={() => {
                    Router.push({
                      pathname: '/explore',
                      query: this.props.ownGuess
                    },{
                      pathname: `/${this.props.city.slug}/explore`,
                      query: this.props.ownGuess
                    });
                  }}
                >
                  Go to explore
                </RoundedButton>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .GifSection {
            background-color: ${COLORS.LegalsSectionBackgroundColor};
            color: ${COLORS.ColorForegroundText};
            display: flex;
            justify-content: center;
          }

          .Wrapper {
            width: ${METRICS.MetricsContentWidth};
            padding: ${METRICS.MetricsContentPadding};
            display: flex;
            flex-direction: column;
          }

          .Title {
            font-size: 47px;
            line-height: 47px;
            font-weight: 400;
            margin: 0;
            width: 350px;
          }

          .SubTitle {
            font-size: 40px;
            margin-top: 80px;
            margin-bottom: 40px;
          }

          .Content {
            display: flex;
            flex-direction: row;
          }

          .Text {
            margin-bottom: 30px;
            font-size: 21px;
            line-height: 27px;
            margin: 0 0 30px 0;
          }

          .CityGifContainer {
            display: flex;
            flex-direction: row;
          }

          .OtherCityContainer {
            margin-left: -20px;
            display: flex;
            flex-direction: row;
          }

          .OtherCityContent {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }

          .CityGifBig {
            width: 400px;
          }

          .CityGifWrapper {
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: flex-start;
            flex-wrap: wrap;
            padding-left: 50px;
          }

        `}</style>
      </div>
    );
  }
}

export default GifSection;
