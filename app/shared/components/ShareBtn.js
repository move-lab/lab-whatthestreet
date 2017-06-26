import React from 'react';

import * as METRICS from '../style/metrics';
import * as COLORS from '../style/colors';

class ShareBtn extends React.PureComponent {

  static propTypes = {
    bottom: React.PropTypes.number,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func,
    onClick: React.PropTypes.func
  }

  render() { 
    return (
      <div
        className={`BtnShare bottom-${this.props.bottom}`}
        onClick={this.props.onClick}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
      >
        <img src="/static/icons/Icon_Share.svg" />
        <style jsx>{`
          .BtnShare {
            position: absolute;
            bottom: 5px;
            right: -30px;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: ${COLORS.ColorVersusLightOrange};
            cursor: pointer;
          }

          .BtnShare.bottom-50 {
            bottom: 50px;
          }

          .BtnShare:hover,.BtnShare:active,.BtnShare:focus {
            background-color: ${COLORS.ColorForegroundOrangeDarker};
          }

          .BtnShare img {
            width: 20px;
            height: 20px;
          }
        `}</style>
      </div>
    );
  }

}

export default ShareBtn;
