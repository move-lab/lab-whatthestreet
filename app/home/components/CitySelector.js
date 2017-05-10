import React from 'react';
import PropTypes from 'prop-types';

import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';

class CitySelector extends React.PureComponent {

  static propTypes = {
    availableCities: PropTypes.arrayOf(PropTypes.object),
    city: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    onButtonClick: PropTypes.func.isRequired,
    selectorOpen: PropTypes.bool,
  }

  componentWillReceiveProps = (props) => {
    if (props.selectorOpen === true) {
      window.addEventListener('keyup', (event) => this.keyUp(event), { once: true });
    }
  }

  onChange = (city) => {
    this.props.onChange(city);
    this.props.onButtonClick();
  }

  close = () => this.props.onButtonClick()

  keyUp = (event) => {
    if (event.keyCode === 27) {
      this.close();
    }
  }

  renderCheckMarkIcon = () => (
    <img alt="icon" src="/static/icons/Icon_Tick.svg" />
  )

  renderCityItem = (city, index) => (
    <div
      className="CitySelectionModalItem"
      key={`citySelectorItem-${index}`}
      onClick={() => this.onChange(this.props.availableCities.indexOf(city))}>
      <span className="CitySelectionModalItemCheckedIndicator">
        {city.slug === this.props.city.slug && this.renderCheckMarkIcon()}
      </span>
      {city.name}
    </div>
  );

  render = () => (
    <div>
      <button
        className="CitySelectionModalToggleButton"
        onClick={() => this.props.onButtonClick()}
      >
        {this.props.city.name} ?
        <img alt="CityDropdownIcon" src="/static/icons/Icon_CityDropdown.svg" />
      </button>
      {this.props.selectorOpen &&
        <div className="CitySelectionModal">
          <div className="CitySelectionModalContent">
            <h3 className="CitySelectionModalHeading">
              Who owns
            </h3>
            <div className="CitySelectionModalItems">
              {this.props.availableCities.map((city, index) => this.renderCityItem(city, index))}
            </div>
          </div>
        </div>
      }
      <style jsx>{`
        .CitySelectionModalToggleButton {
          font-size: 47px;
          line-height: 56px;
          outline: none;
          padding: 0;
          font-family: 'LarsseitMedium';
          cursor: pointer
        }

        .CitySelectionModal {
          position: fixed;
          height: 100vh;
          width: 100vw;
          top: 0;
          left: 0;
          font-size: 47px;
          background-color: ${COLORS.ColorWhite};
          overflow: hidden;
          z-index: ${METRICS.Metrics_Zindex_Header};
        }

        .CitySelectionModalContent {
          position: relative;
          height: 100vh;
          width: 100vw;
          padding: 60px 80px;
          display: flex;
          flex-direction: column;
          height: 100vh;
        }

        .CitySelectionModalHeading {
          font-size: 40px;
          padding-left: 50px;
        }

        .CitySelectionModalItems {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
        }

        .CitySelectionModalItems :global(.CitySelectionModalItem) {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 12.5%;
          flex-shrink: 0;
          cursor: pointer;
        }

        .CitySelectionModalItems :global(.CitySelectionModalItemCheckedIndicator) {
          width: 50px;
        }
      `}</style>
    </div>
  )
}

export default CitySelector;
