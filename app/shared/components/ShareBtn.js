import React from 'react';

import * as METRICS from '../style/metrics';
import * as COLORS from '../style/colors';

class ShareBtn extends React.PureComponent {

  static propTypes = {
    bottom: React.PropTypes.number,
    small: React.PropTypes.bool,
    urlToShare: React.PropTypes.string,
    textToShare: React.PropTypes.string,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.onShareTwitter = this.onShareTwitter.bind(this);
  }

  onShareTwitter() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(this.props.textToShare)}&url=${encodeURIComponent(this.props.urlToShare)}`,'_blank');
  }

  render() { 
    return (
      <div
        className={`BtnShare bottom-${this.props.bottom} ${this.props.small ? 'small' : ''}`}
        onClick={this.onShareTwitter}
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

          .BtnShare.small {
            width: 30px;
            height: 30px;
          }

          .BtnShare:hover,.BtnShare:active,.BtnShare:focus {
            background-color: ${COLORS.ColorForegroundOrangeDarker};
          }

          .BtnShare img {
            width: 25px;
            height: 25px;
          }
        `}</style>
      </div>
    );
  }

}

export default ShareBtn;
