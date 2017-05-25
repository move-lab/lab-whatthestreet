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

  constructor() {
    super();
    this.state = {
      loading: false,
      error: false,
      errorMessage: null,
      svg: null,
    };
  }

  componentDidMount() {
    this.getSvg()
  }
  
  componentWillReceiveProps(props) {
    this.getSvg(props)
  }

  getSvg() {
    this.setState({ loading: true });

    axios.get(`/api/v1/cities/${this.props.city.slug}/landmark`).then((result) => {
      this.setState({ loading: false, svg: result.data });
    }, (error) => {
      this.setState({ loading: false, error: true, errorMessage: error });
    });
  }


  getScale() {
    let scale = this.getNumberOfCars() * 0.025;
    let turns = 0;

    while (true) {
      if (scale < 10) {
        Math.ceil(scale);
        break;
      }
      scale /= 10;
      turns += 1;
    }

    scale *= (10 ** turns);
    return scale;
  }

  getParkingArray(today) {
    let parkingSpaces = this.getNumberOfParkingSpace();
    let cars = this.getNumberOfCars();
    const parkingArray = [];
    const scale = this.getScale();

    if (today) {
      parkingSpaces /= scale;
      cars = (cars / scale) * 0.975;

      parkingSpaces = parseInt(parkingSpaces, 10);
      cars = parseInt(cars, 10);

      parkingSpaces = parkingSpaces - cars < 0 ? 0 : parkingSpaces - cars;

      for (let i = 0; i < cars; i += 1) {
        parkingArray.push('used');
      }

      for (let i = 0; i < parkingSpaces; i += 1) {
        parkingArray.push('unused');
      }
    } else {
      let freeParkingSpaces = (parkingSpaces / scale) * 0.928;

      parkingSpaces = (parkingSpaces / scale) * 0.072;
      cars = (cars / scale) * 0.045;

      parkingSpaces = parseInt(parkingSpaces, 10);
      freeParkingSpaces = parseInt(freeParkingSpaces, 10);
      cars = parseInt(cars, 10);

      parkingSpaces = parkingSpaces - cars < 0 ? 0 : parkingSpaces - cars;


      for (let i = 0; i < cars; i += 1) {
        parkingArray.push('used-future');
      }

      for (let i = 0; i < parkingSpaces; i += 1) {
        parkingArray.push('unused');
      }

      for (let i = 0; i < freeParkingSpaces; i += 1) {
        parkingArray.push('freed');
      }
    }

    return parkingArray;
  }

  getNumberOfParkingSpace() {
    let parkingSpaces = this.props.data.parking.car.offStreet.area;
    parkingSpaces /= 12;
    parkingSpaces += this.props.data.parking.car.onStreet.number;
    return parseInt(parkingSpaces, 10);
  }

  getNumberOfCars() {
    const cars = this.props.data.cars;
    return cars;
  }

  getLandmarkSize() {
    const standardReal = 12 * this.getScale();
    const standardPixel = 2116;

    const landmarkReal = this.props.data.landmark.area;
    const landmarkPixel = (landmarkReal / standardReal) * standardPixel;

    return landmarkPixel;
  }

  getLandmarkPosition(height, width) {
    if (typeof height === 'number' && typeof width === 'number') {
      const position = { top: 0, left: 0, width: 0, height: 0 };

      const area = height * width;
      let factor = this.getLandmarkSize() / area;

      if (factor > 1) {
        factor = 1;
        console.log('Landmark oversized');
      }

      position.width = width * factor;
      position.height = height * factor;

      const freeParkingSpaces = (this.getNumberOfParkingSpace() / this.getScale()) * 0.928;
      const parkingSpaces = (this.getNumberOfParkingSpace() / this.getScale()) * 0.072;

      const top = (Math.ceil(parkingSpaces / 7) * 48) + ((Math.ceil((freeParkingSpaces / 7) * 48) - (Math.ceil((parkingSpaces * 2) / 7) * 48) - position.height) / 2);

      position.left = `${(336 - position.width) / 2}px`;
      position.top = `${top}px`;

      return position;
    }
    return {};
  }

  getEmptyParkingLotTop() {
    let top = 0;


    let parkingSpaces = this.getNumberOfParkingSpace() / this.getScale();
    let cars = (this.getNumberOfCars() / this.getScale()) * 0.975;

    parkingSpaces = parseInt(parkingSpaces, 10);
    cars = parseInt(cars, 10);

    top = Math.ceil(cars / 7) * 48;

    if (parkingSpaces - cars < 0) {
      return { top: '110px' };
    }

    return { top: `${top + 12}px` };
  }

  renderParkingIcon(state, index = -1) {
    switch (state) {
      case 'used':
        return (<img
            key={`Parking-Used-${(index !== -1) ? index : Math.random()}`}
            alt="Icon"
            className="ParkingImg"
            src={IconCarOnParkingSpace} 
          />
        );
      case 'used-future':
        return (<img
            key={`Parking-Used-${(index !== -1) ? index : Math.random()}`}
            alt="Icon"
            className="ParkingImg"
            src={IconAutonomousCarOnParkingSpace}
          />
        );
      case 'unused':
        return (<img
            key={`Parking-${(index !== -1) ? index : Math.random()}`}
            alt="Parking Icon"
            className="ParkingImg"
            src={IconParkingSpace} 
          />
        );
      case 'freed':
        return (<img
          key={`Parking-${(index !== -1) ? index : Math.random()}`}
          alt="Parking Icon"
          className="ParkingImgFree"
          src={IconParkingSpace} 
        />);
      default:
        return (<img
            key={`Parking-${(index !== -1) ? index : Math.random()}`}
            alt="Parking Icon"
            className="ParkingImgFree"
            src={IconParkingSpace} 
          />
        );
    }
  }

  renderSVG(svg = this.state.svg) {
    if (svg) {
      this.height = parseInt(svg.match(/<svg.*height="(\d*px)"/)[1].match(/(\d*)/)[1], 10);
      this.width = parseInt(svg.match(/<svg.*width="(\d*px)"/)[1].match(/(\d*)/)[1], 10);
      return { __html: svg };
    }
    return ({ __html: 'loading' });
  }

  render() {
    const city = this.props.city.slug;
    const studyName = 'name of the Study';

    if (Object.keys(this.props.data).length) {
      return (
        <div>
          <div className="MainContainer">
            <div className="Wrapper">
              <h2 className="Heading">
                What a Waste <br /> of Space
              </h2>
            </div>
            <div className="Wrapper">

              <div className="ColumnLeft">

                {/* Column Heading */}
                <h4>
                  Today's {city}
                </h4>

                {/* Cars on the road */}
                <section className="ColumnLeft">
                  <p>Cars on the road</p>
                  <div className="OnTheRoadWrapper">
                    <img alt="Icon" src={IconCarOnParkingSpace} />
                    <img alt="Icon" src={IconStreet} />
                    <div className="OnTheRoadHolder">
                      <img alt="Icon" src={ArrowOnTheRoad} /> <br />
                      <div className="OnTheRoadText">
                        <p className="OnTheRoadTextSmaller">
                          {this.getScale()}
                        </p>
                        <span>CARS</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Parking */}
                <section className="ParkingWrapperLeft">
                  <p>Parking</p>
                  <div className="ParkingHolder">
                    <div className="EmptyParkingLotsHolder" style={this.getEmptyParkingLotTop()}>
                      <img alt="Icon" src={ArrowEmptyParkingLots} />
                      <div className="EmptyParkingLotsTextHolder">
                        <p className="EmptyParkingLotsText">
                          {this.getScale()}
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
                    { this.getParkingArray(true).map((item, index) => this.renderParkingIcon(item, index)) }
                  </div>
                  <p>Based of the study <b> {studyName} </b></p>
                </section>

              </div>
              <div className="ColumnRight">
                <div>
                  {/* Column Heading */}
                  <h4>
                    Future {city}
                  </h4>

                  {/* Cars on the road */}
                  <section className="ColumnRight">
                    <p>Autonomous cars on the road</p>
                    <div className="OnTheRoadWrapper">
                      <img alt="Icon" src={IconAutonomousCarOnParkingSpace} />
                      <img alt="Icon" src={IconStreet} />
                    </div>
                  </section>
                </div>

                {/* Parking */}
                <section className="ParkingWrapperRight">
                  <p>Parking</p>
                  <div className="ParkingHolder">
                    { this.getParkingArray().map((item, index) => this.renderParkingIcon(item, index)) }
                    <span
                      className="Landmark"
                      style={this.getLandmarkPosition(202, 261)}
                      dangerouslySetInnerHTML={this.renderSVG(this.state.svg)}
                      ref={(element) => { this.svgWrapper = element; }} 
                    />
                  </div>
                </section>

              </div>

            </div>


          </div>
          <FreedUp amount={parseInt(this.getNumberOfParkingSpace() * 0.928, 10) < 0 ? 0 : parseInt(this.getNumberOfParkingSpace() * 0.928, 10)} />
          <style jsx>{`
            .MainContainer {
              position: relative;
              background-color: ${COLORS.ColorBackgroundLightBlue};
              color: ${COLORS.ColorForegroundOrange};
              padding: ${METRICS.MetricsSectionPadding} 0;
            }

            h4 {
              font-size: 40px;
              font-weight: 400;
            }

            .Heading {
              font-size: 47px;
              font-weight: 400;
              margin-bottom: 30px;
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
              font-weight: lighter;
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

            .ParkingImg {
              margin: 1px;
            }

            .MainContainer :global(.ParkingImgFree) {
              opacity: 0.1;
              margin: 1px;
            }

            .Landmark {
              position: absolute;
              top: 0;
              left: 0;
            }

            .Landmark svg {
              width: inherit;
              height: inherit;
            }
          `}</style>
        </div>
      );
    }
    return (<div></div>);
  }
}

const mapStateToProps = createStructuredSelector({
  city: CitySelectors.makeSelectActualCity(),
  data: CityMetaSelectors.makeSelectCityMetaData(),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FuturePage);
