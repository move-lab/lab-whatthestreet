import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

// Selectors
import { CitySelectors, CityMetaSelectors } from '../../statemanagement/selectors';

// Components
import FreedUp from '../components/FreedUp';

import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';

// Images
const IconStreet = '/static/icons/Icon_Street.svg';
const IconCarOnParkingSpace = '/static/icons/Icon_CarOnParkingSpace.svg';
const IconAutonomousCarOnParkingSpace = '/static/icons/Icon_AutonomousCarOnParkingSpace.svg';
const IconParkingSpace = '/static/icons/Icon_ParkingSpace.svg';
const ArrowOnTheRoad = '/static/icons/Arrow_OnTheRoad.svg';
const ArrowEmptyParkingLots = '/static/icons/Arrow_EmptyParkingLots.svg';

class FuturePage extends React.Component {

  static propTypes = {
    city: React.PropTypes.object,
    data: React.PropTypes.any,
  }

  getNumberOfCars() {
     const cars = this.props.data.cars;
     return cars;
  }

  getNumberOfCarsOnRoad() {
    return parseInt(this.getNumberOfCars() * 0.025);
  }

  getCarUnit() {
    return this.getNumberOfCarsOnRoad();
  }

  getNumberOfCarsParking() {
    return this.getNumberOfCars() - this.getNumberOfCarsOnRoad();
  }

  getNumberOfCarsParkingFuture() {
    return parseInt(this.getNumberOfCarsParking()*0.07);
  }

  getNumberOfCarsParkingThatCouldBeFreedUp() {
    return this.getNumberOfCarsParking() - this.getNumberOfCarsParkingFuture();
  }

  getParkingTodayArray() {
    const nbParkingUnit = parseInt(this.getNumberOfCarsParking() / this.getCarUnit());
    return new Array(nbParkingUnit).fill(1)
  }

  getParkingFutureArray() {
    const nbParkingUnit = parseInt(this.getNumberOfCarsParkingFuture() / this.getCarUnit());
    return new Array(nbParkingUnit).fill(1)
  }

  getParkingFreeFutureArray() {
    const nbParkingUnit = parseInt(this.getNumberOfCarsParking() / this.getCarUnit()) - parseInt(this.getNumberOfCarsParkingFuture() / this.getCarUnit());
    return new Array(nbParkingUnit).fill(1)
  }

  getEmptyParkingLotTop() {
    let top = 0;
    return { top: `105px` };
  }

  renderParkingIcon(type, index = -1) {
    if(type === 'used') {
      return (<img
          key={`Parking-${(index !== -1) ? index : Math.random()}`}
          alt="Parking Icon"
          className="ParkingImg"
          src={IconParkingSpace} 
        />
      );
    } else {
      return (<img
        key={`Parking-${(index !== -1) ? index : Math.random()}`}
        alt="Parking Icon"
        className="ParkingImgFree"
        src={IconParkingSpace} 
      />);
    }
  }

  render() {
    const city = this.props.city.slug;
    const cityName = this.props.city.name;

    return (
      <div>
        <div className="MainContainer">
          <div className="Wrapper Heading">
            <h2 className="Heading">
              What a waste <br /> of space
            </h2>
            <p className="Text">In a not so distance future cities might not have to deal with parking issues anymore. Self-driving cars are about to drive through our cities. Imagine all cars are shared and autonomous. You can call for any car and it will bring you wherever you want.</p>
            <p className="Text">Since these cars don't need to park anymore, lots of space could be freed up in cities around the world. The more efficient use of cars will allow less cars on the road and even less parking, just like illustrated here.</p>
          </div>
          <div className="Wrapper">

            <div className="ColumnLeft">

              {/* Column Heading */}
              <h4>
                Today's {cityName}
              </h4>

              {/* Cars on the road */}
              <section className="ColumnLeft">
                <p className="Label">Cars on the road</p>
                <div className="OnTheRoadWrapper">
                  <img alt="Icon" src={IconCarOnParkingSpace} />
                  <img alt="Icon" src={IconStreet} />
                  <div className="OnTheRoadHolder">
                    <img alt="Icon" src={ArrowOnTheRoad} /> <br />
                    <div className="OnTheRoadText">
                      <p className="OnTheRoadTextSmaller">
                        {this.getNumberOfCarsOnRoad()}
                      </p>
                      <span>CARS</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Parking */}
              <section className="ParkingWrapperLeft">
                <p className="Label">Parking</p>
                <div className="ParkingHolder">
                  <div className="EmptyParkingLotsHolder" style={this.getEmptyParkingLotTop()}>
                    <img alt="Icon" src={ArrowEmptyParkingLots} />
                    <div className="EmptyParkingLotsTextHolder">
                      <p className="EmptyParkingLotsText">
                        {this.getNumberOfCarsOnRoad()}
                      </p>
                      <p className="EmptyParkingLotsTextBig">
                        EMPTY
                      </p>
                      <p className="EmptyParkingLotsText">
                        PARKING
                      </p>
                      <p className="EmptyParkingLotsText">
                        LOTS
                      </p>
                    </div>
                  </div>
                  {this.getParkingTodayArray().map((item, index) =>
                    this.renderParkingIcon("used", index)
                  )}
                </div>
                <p>
                  Based on the study of ISV Stuttgart <a href="http://www.isv.uni-stuttgart.de/vuv/news/Downloads/MEGAFON_Abschlussbericht_V028_20161212.pdf" target="_blank">MEGAFON</a> by Max Hartl.
                </p>
              </section>

            </div>
            <div className="ColumnRight">
              <div>
                {/* Column Heading */}
                <h4 className="HeadingFuture">
                  Future {cityName}
                </h4>

                {/* Cars on the road */}
                <section className="ColumnRight">
                  <p className="Label">Autonomous cars on the road</p>
                  <div className="OnTheRoadWrapper">
                    <img alt="Icon" src={IconAutonomousCarOnParkingSpace} />
                    <img alt="Icon" src={IconStreet} />
                  </div>
                </section>
              </div>

              {/* Parking */}
              <section className="ParkingWrapperRight">
                <p className="Label">Parking</p>
                <div className="ParkingHolder">
                  {this.getParkingFutureArray().map((item, index) =>
                    this.renderParkingIcon("used", index)
                  )}
                  {this.getParkingFreeFutureArray().map((item, index) =>
                    this.renderParkingIcon("freed", index)
                  )}
                  <div
                    className="Landmark"
                  >
                    <img src={`/static/cityLandmarks/Landmark_${this.props.city.slug}.png`} />
                  </div>
                </div>
              </section>

            </div>

          </div>


        </div>
        <FreedUp amount={this.getNumberOfCarsParkingThatCouldBeFreedUp()} />
        <style jsx>{`
          .MainContainer {
            position: relative;
            background-color: ${COLORS.ColorBackgroundLightBlue};
            color: ${COLORS.ColorForegroundOrange};
            padding: ${METRICS.MetricsSectionPadding} 0;
          }

          h4 {
            font-size: 40px;
            font-weight: 500;
          }

          .Heading {
            font-size: 47px;
            font-weight: 500;
            margin-bottom: 30px;
          }

          .Text {
            font-size: 21px;
            line-height: 27px;
            margin: 0 0 25px 0;
            width: 560px;
            font-weight: 300;
          }

          .Wrapper {
            padding: 0 240px;
            margin: 0 auto;
            color: ${COLORS.ColorForegroundText};
            width: ${METRICS.MetricsContentWidth};
            margin: 0 auto;
            display: flex;
            align-items: flex-start;
          }

          .Wrapper.Heading {
            display: block;
          }


          .ParkingHolder {
            position: relative;
          }

          .EmptyParkingLotsHolder {
            position: absolute;
            top: 110px;
            left: -130px;
            color: ${COLORS.ColorForegroundOrange};
            font-family: 'Sign-Painter';
            font-size: 2em;
            margin: 0px;

            transform: rotate(-20deg);
            -webkit-transform: rotate(-20deg);
            -moz-transform: rotate(-20deg);
            -ms-transform: rotate(-20deg);
            -o-transform: rotate(-20deg);
          }

          .EmptyParkingLotsTextHolder {
            position: absolute;
            top: -55px;
            left: -30px;
          }



          .EmptyParkingLotsText {
            font-size: 0.7em;
            margin: 0px;
            line-height: 1em;
          }

          .EmptyParkingLotsTextBig {
            font-size: 1em;
            margin: 0px;
            line-height: 1em;
          }

          div.ColumnLeft {
            width: 400px;
          }

          div.ColumnLeft section.ColumnLeft, div.ColumnLeft section.ParkingWrapperLeft {
            padding: 0 64px 0 0;
          }

          div.ColumnRight {
            width: 400px;
          }

          div.ColumnRight section.ColumnRight, div.ColumnRight section.ParkingWrapperRight {
            padding: 0 0 0 64px;
          }

          div.ColumnRight h4 {
            padding: 0 0 0 64px;
          }

          .OnTheRoadWrapper {
          position: relative;
          }
          .OnTheRoadHolder {
            position: absolute;
            top: -25px;
            left: -95px;
          }

          .OnTheRoadText {
            color: ${COLORS.ColorForegroundOrange};
            font-family: 'Sign-Painter';
            font-size: 2em;
            text-align: center;

            position: absolute;
            top: 136px;
            left: -20px;

            transform: rotate(-20deg);
            -webkit-transform: rotate(20deg);
            -moz-transform: rotate(20deg);
            -ms-transform: rotate(20deg);
            -o-transform: rotate(20deg);
          }

          .OnTheRoadTextSmaller {
            font-size: 0.7em;
            margin: 0px;
          }

          .ParkingWrapper {
            margin-top: 80px;
            width: 336px;
            position: relative;
          }

          :global(.ParkingImg) {
            margin: 1px;
          }

          .MainContainer :global(.ParkingImgFree) {
            opacity: 0.1;
            margin: 1px;
          }

          .Landmark {
            position: absolute;
            top: 30px;
            left: 0px;
          }

          .Landmark img {
            width: 100%;
          }

          .Label {
            margin-bottom: 20px;
            font-weight: 500;
            font-size: 22px;
          }

          .HeadingFuture {
            overflow: visible;
            white-space: nowrap;
          }
        `}</style>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  city: CitySelectors.makeSelectActualCity(),
  data: CityMetaSelectors.makeSelectCityMetaData(),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FuturePage);
