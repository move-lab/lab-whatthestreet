import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Router from 'next/router';
import Link from 'next/link';

// Components
import SocialMediaButtons from './SocialMediaButtons';
import VehicleIcon from './VehicleIcon';

// Selectors
import { ParkingSelectors, LaneSelectors } from '../../statemanagement/selectors';

const searchIcon = '/static/icons/Icon_Search.svg';
const homeIcon = '/static/icons/Icon_Home.svg';

import * as METRICS from '../style/metrics';
import * as COLORS from '../style/colors';

class Header extends React.Component {

  static propTypes = {
    title: React.PropTypes.string,
    vehicle: React.PropTypes.string,
    parkingSpace: React.PropTypes.object,
    lane: React.PropTypes.object,
    onSearchButtonClick: React.PropTypes.func,
    mode: React.PropTypes.oneOf(['explore', 'normal'])
  }

  static defaultProps = {
    mode: 'normal'
  }

  renderParkingInfo() {
    if (this.props.parkingSpace.neighborhood && this.props.parkingSpace.neighborhood.length > 0) {
      return (
        <div className="InfoLabel">
          <h3>{`Parking space in ${this.props.parkingSpace.neighborhood}`}</h3>
          <p>{`${Math.round(this.props.parkingSpace.area)}m² = ${Math.round(this.props.parkingSpace.area / 12)} cars`}</p>
        </div>
      );
    }

    return (
      <div className="InfoLabel">
        <h3>No Parking Selected</h3>
      </div>
    );
  }

  renderLaneInfo() {
    if (this.props.lane.name || this.props.lane.neighborhood) {
      return (
        <div className="InfoLabel">
          <h3>{this.props.lane.name || this.props.lane.neighborhood}</h3>
          <p>{`${Math.round(this.props.lane.area)}m = ${Math.round(this.props.lane.length)}m²`}</p>
        </div>
      );
    }

    return (
      <div className="InfoLabel">
        <h3>No Lane Selected</h3>
      </div>
    );
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
                  href="#"
                  className="Title"
                >
                  {this.props.title}
                </a>
              </Link>
              <span className="AboutLink">
                <button
                  className="AboutButton"
                  onClick={() => console.log('TODO ABOUT MODAL')} >
                  About
                </button>
              </span>
              <SocialMediaButtons />
            </div>
          }
          {this.props.mode === 'explore' &&
            <div className="Content">
              <div className="Container">
                <div className="NavButtons">
                  <div className="HomeButton">
                    <button onClick={() => this.goToHomePage()} >
                      <img alt="HomeIcon" className="HomeIcon" src={homeIcon} /><span>Home</span>
                    </button>
                  </div>
                  <div className="SearchButton">
                    <button onClick={() => console.log('TODO onsearch CLICK')} >
                      <img alt="SearchIcon" src={searchIcon} /><span>Search</span>
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
                {this.renderParkingInfo()}
              </div>
              <div className="Container">
                <VehicleIcon vehicle={this.props.vehicle} width={60} height={60} />
                <div className="CenterInfo">
                  <p>{`${0.5} Flats`}</p>
                  <p>{`12m²`}</p>
                </div>
              </div>
              <div className="Container">
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

            .Container:first-child {
              align-items: flex-start;
              flex-basis: 45%;
            }

            .Container:nth-child(2) {
              display: flex;
              flex-basis: 10%;
              justify-content: center;
            }

            .Container:last-child {
              flex-basis: 45%;
              align-items: flex-end;
              text-align: right;
            }

            .AboutLink {
              font-size: 18px;
              line-height: 24px;
              color: ${COLORS.ColorForegroundOrange};
              margin-right: 15px;
              outline: none;
            }

            .AboutButton {
              outline: none;
              cursor: pointer;
            }

            .Container :global(.InfoLabel) {
              color: ${COLORS.ColorForegroundOrange};
              margin-top: 20px;
            }

            .Container :global(.InfoLabel) h3 {
              margin: 0;
            }
            
            .Container :global(.InfoLabel) p {
              margin: 0;
              margin-top: 10px;
            }

            .CenterInfo {
              margin: 0;
              text-align: center;
            }

            .CenterInfo p {
              margin: 0;
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
              font-weight: 200;
            }

            .NavButtons {
              display: flex;
              flex-direction: row;
            }

            .SearchButton,.HomeButton {
              padding: 10px 0;
              cursor: pointer;
              margin-right: 10px;
            }

            .SearchButton:hover,.SearchButton:focus,.SearchButton:active,
            .HomeButton:hover,.HomeButton:focus,.HomeButton:active, {
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

const structuredSelector = createStructuredSelector({
  parkingSpace: ParkingSelectors.makeSelectActualParkingPlace(),
  lane: LaneSelectors.makeSelectActualLane(),
});

const mapStateToProps = (state) => {
  return {
    ...structuredSelector(state),
    ownGuess: state.guess.get('own'),
    citySlug: state.city.getIn(['actual_city','slug'])
  }
};

export default connect(mapStateToProps)(Header);
