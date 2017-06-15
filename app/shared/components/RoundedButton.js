import React from 'react';
import PropTypes from 'prop-types';

import * as METRICS from '../style/metrics';
import * as COLORS from '../style/colors';

const loadingIcon = '/static/icons/Icon_Loading_spin.svg';

class RoundedButton extends React.PureComponent {

  static propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    arrowUp: PropTypes.bool,
    arrowDown: PropTypes.bool,
    hidden: PropTypes.bool,
    hideIcon: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    small: PropTypes.bool,
    orange: PropTypes.bool
  };

  render() {
    return (
      <button
        disabled={this.props.disabled}
        className={`Button 
        ${this.props.arrowUp ? 'arrowUp' : ''}
        ${this.props.arrowDown ? 'arrowDown' : ''}
        ${this.props.hidden  ? 'hidden' : ''}
        ${this.props.disabled ? 'disabled' : ''}
        ${this.props.small ? 'small' : ''}
        ${this.props.orange ? 'orange' : ''}
        ${this.props.loading ? 'loading' : ''}`}
        onClick={() => this.props.onClick()}>
        <span className="text-wrapper">
        { this.props.children }
        </span>
        {!this.props.hideIcon && !this.props.loading &&
          <img alt="Icon" className="Icon" src="/static/icons/Icon_ButtonArrow.svg" />
        }
        {!this.props.hideIcon && this.props.loading &&
          <img alt="Icon" className="Icon" src={loadingIcon} />
        }
        <style jsx>{`
          .Button {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: ${COLORS.ButtonBackgroundColor};
            color: ${COLORS.ButtonForegroundColor};
            border-radius: 50px;
            padding: ${METRICS.MetricsBasePadding};
            padding-left: 25px;
            padding-right: 20px;
            outline: none;
            box-shadow: 0 6px 10px rgba(0,0,0,0.08);
            font-size: 21px;
            cursor: pointer;
            opacity: 1;
            transition: 300ms opacity;
            font-weight: 500;
            pointer-events: auto;
          }

          .Button.small {
            padding: 10px;
            padding-left: 15px;
            padding-right: 15px;
            font-size: 15px;
          }

          .Button.orange {
            background-color: ${COLORS.ColorForegroundOrange};
          }

          .Button.orange:not(.disabled):hover {
            background-color: ${COLORS.ColorForegroundOrangeDarker};
          }

          .Button:not(.disabled):hover {
            background-color: ${COLORS.ButtonBackgroundColorDarker};
          }

          .Icon {
            margin-left: 50px;
            width: 8px;
          }

          .Button.loading .Icon {
            margin-left: 38px;
            width: 20px;
          }

          .Button.arrowUp .Icon {
            transform: rotate(-90deg);
          }

          .Button.arrowDown .Icon {
            transform: rotate(90deg);
            margin-left: 46px;
            margin-right: 4px;
          }

          .Button.hidden {
            pointer-events: false;
            opacity: 0;
          }

          .Button.disabled {
            opacity: 0.5;
          }

          .text-wrapper {
            position: relative;
            top: 2px;
          }
      `}</style>
      </button>
    );
  }

}

export default RoundedButton;
