/**
 * CitySelector
 */

// Libraries
import React from 'react';

// Images
import CheckMarkIcon from 'assets/icons/Icon_Tick.svg';
import CityDropdownIcon from 'assets/icons/Icon_CityDropdown.svg';

// Styles
import styles from './main.scss';

/**
 * Renders the Cityselection modal
 */
class CitySelector extends React.PureComponent {
  static propTypes = {
    availableCities: React.PropTypes.arrayOf(React.PropTypes.object),
    city: React.PropTypes.object,
    onChange: React.PropTypes.func.isRequired,
    onButtonClick: React.PropTypes.func.isRequired,
    selectorOpen: React.PropTypes.bool,
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
    <img alt="icon" src={CheckMarkIcon} />
  )

  renderCityItem = (city, index) => (<div className={styles.CitySelectionModalItem} key={`citySelectorItem-${index}`} onClick={() => this.onChange(this.props.availableCities.indexOf(city))}><span className={styles.CitySelectionModalItemCheckedIndicator}>{city.slug === this.props.city.slug && this.renderCheckMarkIcon()}</span>{city.name}</div>); // eslint-disable-line

  render = () => (
    <div>
      <button className={styles.CitySelectionModalToggleButton} onClick={() => this.props.onButtonClick()}>
        {this.props.city.name} ?
        <img alt="CityDropdownIcon" src={CityDropdownIcon} />
      </button>
      {this.props.selectorOpen &&
        <div className={styles.CitySelectionModal}>
          <div className={styles.CitySelectionModalContent}>
            <h3 className={styles.CitySelectionModalHeading}>Who owns</h3>
            <div className={styles.CitySelectionModalItems}>
              {this.props.availableCities.map((city, index) => this.renderCityItem(city, index))}
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default CitySelector;
