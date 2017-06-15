import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Router from 'next/router';
import Link from 'next/link';

// Components
import SocialMediaButtons from './SocialMediaButtons';
import VehicleIcon from './VehicleIcon';

const searchIcon = '/static/icons/Icon_Search.svg';
const homeIcon = '/static/icons/Icon_Home.svg';

import { showSearch } from '../../statemanagement/ExploreStateManagement';

import * as METRICS from '../style/metrics';
import * as COLORS from '../style/colors';

class Header extends React.PureComponent {

  static propTypes = {
    title: React.PropTypes.string,
    activeVehicle: React.PropTypes.string,
    parkingSpace: React.PropTypes.object,
    laneRailParking: React.PropTypes.object,
    lane: React.PropTypes.object,
    cityLandmark: React.PropTypes.object,
    onSearchButtonClick: React.PropTypes.func,
    mode: React.PropTypes.oneOf(['explore', 'normal'])
  }

  static defaultProps = {
    mode: 'normal'
  }

  constructor() {
    super();

    this.getHumanArea = this.getHumanArea.bind(this);

    this.state = {
      FH : new Intl.NumberFormat('en-US'),
      FH1Digit: new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1
      })
    }
  }

  renderParkingInfo() {
    if (this.props.parkingSpace.id > 0) {
      return (
        <div className="InfoLabel">
          <h3>{`Parking space ${this.props.parkingSpace.neighborhood ? 'in ' + this.props.parkingSpace.neighborhood : ''}`}</h3>
          {this.props.activeVehicle !== "bike" &&
            <p>{`${this.state.FH.format(Math.round(this.props.parkingSpace.area))}m² = ${this.state.FH.format(Math.round(this.props.parkingSpace.area / 12))} cars`}</p>
          }
          {this.props.activeVehicle === "bike" &&
            <p>{`${this.state.FH.format(Math.round(this.props.parkingSpace.area))}m² = ${this.state.FH.format(Math.round(this.props.parkingSpace.area / 1.6))} bikes`}</p>
          }
        </div>
      );
    }

    return (
      <div className="InfoLabel">
        <h3>No Parking Selected</h3>
      </div>
    );
  }

  renderLaneRailParkingInfo() {
    if (this.props.laneRailParking.id > 0) {
      return (
        <div className="InfoLabel">
          <h3>{`Rail parking space ${this.props.laneRailParking.neighborhood ? 'in ' + this.props.laneRailParking.neighborhood : ''}`}</h3>
          <p>{`${this.state.FH.format(Math.round(this.props.laneRailParking.area))}m = ${this.state.FH.format(Math.round(this.props.laneRailParking.length))}m²`}</p>
        </div>
      );
    }

    return (
      <div className="InfoLabel">
        <h3>No Rail Parking Selected</h3>
      </div>
    );
  }

  renderLaneInfo() {
    if (this.props.lane.id > 0) {
      return (
        <div className="InfoLabel">
          <h3>{this.props.lane.name || this.props.lane.neighborhood || 'Lane'}</h3>
          <p>{`${this.state.FH.format(Math.round(this.props.lane.area))}m = ${this.state.FH.format(Math.round(this.props.lane.length))}m²`}</p>
        </div>
      );
    }

    return (
      <div className="InfoLabel">
        <h3>No Lane Selected</h3>
      </div>
    );
  }

  getHumanArea(area) {
    const cityLandmarkArea = this.props.cityLandmark.area;
    if (area < 225) {
      return `${this.state.FH1Digit.format(area)} m²`;
    } else if (area < 225*1000) { // change at 1000 playgrounds
      const playgroundArea = 225;
      const nbPlayground = Math.round( area / playgroundArea * 10 ) / 10;
      const playgroundLabel = nbPlayground > 1 ? 'Playgrounds' : 'Playground';
      return `${this.state.FH1Digit.format(nbPlayground)} ${playgroundLabel}`;
    } else if (area < cityLandmarkArea) {
      const soccerFieldArea = 7140;
      const nbSoccerField = Math.round( area / soccerFieldArea * 10 ) / 10;
      const soccerFieldLabel = nbSoccerField > 1 ? 'Soccer Fields' : 'Soccer Field';
      return `${this.state.FH1Digit.format(nbSoccerField)} ${soccerFieldLabel}`;
    } else {
      const nbCityLandmark = Math.round( area / cityLandmarkArea * 10 ) / 10;
      const cityLandmarkLabel = this.props.cityLandmark.name;
      return `${this.state.FH1Digit.format(nbCityLandmark)} ${cityLandmarkLabel}`;
    }
  }

  goToHomePage() {
    Router.push({
      pathname: '/',
      query: this.props.ownGuess.toJS()
    }, {
      pathname: `/${this.props.citySlug}`,
      query: this.props.ownGuess.toJS()
    }, { shallow: true });
  }

  showSearch() {
    this.props.dispatch(showSearch());
  }

  render() {
    return (
      <header className={this.props.mode === 'normal' ? 'NavigationBar' : 'ScrollPageNavigationBar'}>
          {this.props.mode === 'normal' &&
            <div className="Content">
              <Link prefetch href="/" as={{
                  pathname: `/${this.props.citySlug}`,
                  query: this.props.ownGuess.toJS()
                }}
              >
                <a
                  className="Title Link"
                >
                  {this.props.title}
                </a>
              </Link>
              <Link prefetch href="/about">
                <a
                  className="AboutLink Link"
                >
                  About
                </a>
              </Link>
              <SocialMediaButtons />
            </div>
          }
          {this.props.mode === 'explore' &&
            <div className="Content">
              <div className="Container ContainerLeft">
                <div className="NavButtons">
                  <div className="HomeButton">
                    <button onClick={() => this.goToHomePage()} >
                      <img alt="" className="HomeIcon" src={homeIcon} /><span>Home</span>
                    </button>
                  </div>
                  <div className="SearchButton">
                    <button onClick={() => this.showSearch()} >
                      <img alt="SearchIcon" src={searchIcon} /><span>Search streets</span>
                    </button>
                  </div>
                </div>
                <div className="SearchWrapper">
                  <div className="SearchBox">
                    <input
                      className="SearchInput"
                      type="search"
                      placeholder="Search..." />
                  </div>
                </div>
                {this.props.activeVehicle === 'rail' &&
                  this.renderLaneRailParkingInfo()
                }
                {this.props.activeVehicle !== 'rail' &&
                  this.renderParkingInfo()
                }
              </div>
              <div className="Container ContainerCenter">
                <div className="VehicleAndAreaM2">
                  <VehicleIcon vehicle={this.props.activeVehicle} width={70} height={70} />
                  <div className="AreaM2">
                    {this.state.FH.format(this.props.lane.cumulativeArea)} m²
                  </div>
                </div>
                <div className="AreaHuman">
                  {this.getHumanArea(this.props.lane.cumulativeArea)}
                </div>
              </div>
              <div className="Container ContainerRight">
                <SocialMediaButtons />
                {this.renderLaneInfo()}
              </div>
            </div>
          }
          <style jsx>{`
            .NavigationBar {
              z-index: ${METRICS.MetricsZindexHeader};
              top: 0;
              left: 0;
              width: 100%;
              display: flex;
              justify-content: center;
              background-color: #fff;
            }

            .ScrollPageNavigationBar {
              position: fixed;
              z-index: ${METRICS.MetricsZindexHeader};
              top: 0;
              left: 0;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #fff;
              box-shadow: ${COLORS.boxshadow};
              height: ${METRICS.MetricsHeaderHeight};
              padding-left: 15px;
              padding-right: 15px;
              padding-bottom: 10px;
              {/*animation: slideFromTop .2s ease-in;*/}
            }

            .ScrollPageNavigationBar .Content {
              padding: 0 15px;
            }

            .Title {
              font-size: 21px;
              line-height: 26px;
              text-align: left;
              color: ${COLORS.ColorForegroundText};
              flex-grow: 1;
              text-decoration: none;
              font-weight: 500;
            }

            .Content {
              display: flex;
              height: 80px;
              align-items: center;
              width: ${METRICS.MetricsContentWidth};
              padding: 0 ${METRICS.MetricsContentPadding};
            }

            .Container {
              flex-grow: 1;
              flex-shrink: 0;
              display: flex;
              flex-flow: column nowrap;
              justify-content: center;
              align-items: center;
            }

            .ContainerLeft {
              align-items: flex-start;
              flex-basis: 31%;
              height: 116px;
            }

            .ContainerCenter {
              display: flex;
              flex-basis: 38%;
              justify-content: center;
            }

            .ContainerRight {
              flex-basis: 31%;
              align-items: flex-end;
              text-align: right;
              height: 116px;
            }

            .VehicleAndAreaM2 {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
            }

            .AreaM2 {
              font-weight: 500;
              font-size: 24px;
              color: #A6C4FF;
              min-width: 160px;
              margin-left: 10px;
            }

            .AreaHuman {
              margin: 0;
              font-size: 35px;
              font-weight: 500;
              max-width: 463.1px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              line-height: 1.15em;
            }

            .AboutLink {
              font-size: 18px;
              font-weight: 500;
              line-height: 24px;
              color: ${COLORS.ColorForegroundOrange};
              margin-right: 15px;
              outline: none;
              cursor: pointer;
              text-decoration: none;
            }

            .Container :global(.InfoLabel) {
              color: ${COLORS.ColorForegroundOrange};
              margin-top: 20px;
            }

            .Container :global(.InfoLabel) :global(h3) {
              margin: 0;
              font-size: 24px;
              font-weight: 500;
              max-width: 378.2px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              line-height: 1.2em;
            }
            
            .Container :global(.InfoLabel) :global(p) {
              margin:0;
              margin-top: 5px;
              font-size: 24px;
              line-height: 1.2;
              max-width: 400px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            @keyframes slideFromTop {
              0% { transform: translate3d(0px, -20vh, 0px) }
              100% { transform: translate3d(0px, 0px, 0px) }
            }

            .SearchWrapper {
              z-index: 10000000;
              position: fixed;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              display: flex;
              align-items: center;
              justify-content: center;

              display: none;
            }

            .SearchBox {
                padding: 60px;
                width: 600px;
                background: white;
                box-shadow: ${COLORS.boxshadow};
            }

            .SearchInput {
              padding: 0 0 16px 0;
              width: 100%;
              outline: none;
              font-size: 21px;
              border-bottom: 2px solid blue;
              margin-bottom: 20px;
            }

            .SearchResult {
              padding: 20px 0;
              color: ${COLORS.ColorForegroundOrange};
              border-bottom: 1px solid #f2f2f2;
            }

            .SearchResult:hover {
              cursor: pointer;
            }

            .SearchResult:last-child {
              border: none;
              padding: 20px 0 0 0;
            }

            .Searchresultname {
              display: block;
              font-size: 30px;
              margin-bottom: 6px;
            }
            .Searchresultinfo {
              display: block;
              font-size: 16px;
            }

            .NavButtons {
              display: flex;
              flex-direction: row;
            }

            .SearchButton,.HomeButton {
              cursor: pointer;
              margin-right: 10px;
            }

            .SearchButton:hover,.SearchButton:focus,.SearchButton:active,
            .HomeButton:hover,.HomeButton:focus,.HomeButton:active {
              opacity: 0.5;
            }

            .Link:hover,.Link:focus,.Link:active {
              opacity: 0.5;
            }

            .SearchButton *,.HomeButton * {
              cursor: pointer;
              padding: 0;
            }

            .HomeIcon {
              position: relative;
              bottom: 3px;
            }

            .SearchButton span,.HomeButton span {
              margin-left: 5px;
            }
          `}</style>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ownGuess: state.guess.get('own'),
    citySlug: state.city.getIn(['actual_city','slug']),
    activeVehicle: state.vehicles.get('vehicle'),
    cityLandmark: state.cityMeta.getIn(['metaData','landmark']) && state.cityMeta.getIn(['metaData','landmark']).toJS(),
    laneRailParking: state.lanes.get('laneRailParking').toJS(),
    parkingSpace: state.parking.toJS(),
    lane: state.lanes.toJS()
  }
};

export default connect(mapStateToProps)(Header);
