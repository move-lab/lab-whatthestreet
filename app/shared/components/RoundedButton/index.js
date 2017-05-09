/**
 * RoundedButton
 */

// Libraries
import React from 'react';

// Images
// import angle from 'assets/icons/Icon_ButtonArrow_Blue.svg';
import arrow from 'assets/icons/Icon_ButtonArrow.svg';

// Styles
import styles from './main.scss';

/**
 * Renders a button with rounded Corners
 */
class RoundedButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node.isRequired,
    onClick: React.PropTypes.func,
    arrowUp: React.PropTypes.bool,
    arrowDown: React.PropTypes.bool,
    hidden: React.PropTypes.bool,
    hideIcon: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
  };

  render() {
    return (
      <button disabled={this.props.disabled} className={`${styles.Button} ${this.props.arrowUp && styles.arrowUp} ${this.props.arrowDown && styles.arrowDown} ${this.props.hidden && styles.hidden} ${this.props.disabled && styles.disabled}`} onClick={() => this.props.onClick()}>
        { this.props.children }
        { !this.props.hideIcon && <img alt="Icon" className={styles.Icon} src={arrow} /> }
      </button>
    );
  }

}

export default RoundedButton;
