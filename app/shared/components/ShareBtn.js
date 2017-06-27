import React from 'react';

import * as METRICS from '../style/metrics';
import * as COLORS from '../style/colors';

const FacebookIconWhite = '/static/icons/Icon_Social_Facebook_White.svg';
const TwitterIconWhite = '/static/icons/Icon_Social_Twitter_White.svg';
const IconDownload = '/static/icons/Icon_Download.svg';

class ShareBtn extends React.PureComponent {

  static propTypes = {
    bottom: React.PropTypes.number,
    small: React.PropTypes.bool,
    urlToShare: React.PropTypes.string,
    urlToDownload: React.PropTypes.string,
    textToShare: React.PropTypes.string,
    onMouseOut: React.PropTypes.func,
    onMouseOver: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.twitterUrl = this.twitterUrl.bind(this);
    this.facebookUrl = this.facebookUrl.bind(this);
  }

  twitterUrl() {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(this.props.textToShare)}&url=${encodeURIComponent(this.props.urlToShare)}`;
  }

  facebookUrl() {
    return `https://www.facebook.com/sharer.php?u=${encodeURIComponent(this.props.urlToShare)}`;
  }

  render() { 
    return (
      <div
        className={`BtnShare bottom-${this.props.bottom} ${this.props.small ? 'small' : ''}`}
        onClick={this.onShareTwitter}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
      >
        <img className="ShareIcon" src="/static/icons/Icon_Share.svg" />
        <div className="List">
          <a className="Button" href={this.twitterUrl()} target="_blank">
            <img alt="TwitterIconWhite" src={TwitterIconWhite} />
          </a>
          <a className="Button" href={this.facebookUrl()} target="_blank">
            <img alt="FacebookIconWhite" src={FacebookIconWhite} />
          </a>
          <a className="Button" href={this.props.urlToDownload} download target="_blank">
            <img className="IconDownload" alt="IconDownload" src={IconDownload} />
          </a>
        </div>
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
            transition: all 200ms ease;
            z-index: 2;
          }

          .BtnShare.bottom-50 {
            bottom: 50px;
          }

          .BtnShare.small {
            width: 30px;
            height: 30px;
          }

          .BtnShare img {
            width: 25px;
            height: 25px;
          }

          .BtnShare:hover,.BtnShare:active,.BtnShare:focus {
            justify-content: flex-start;
            padding-left: 10px;
            width: 145px;
            right: -115px;
          }

          .BtnShare:hover .List,.BtnShare:active .List,.BtnShare:focus .List {
            opacity: 1;
            display: flex;
          }

          .List {
            width: 15px;
            display: flex;
            display: none;
          }

          .Button {
            list-style: none;
            cursor: pointer;
            margin: 0 5px;
            line-height: 1;
          }

          .Button img {
            transition: all 200ms ease;
          }

          .Button .IconDownload {
            height: 18px;
            width: 18px;
            top: 3px;
            position:relative;
          }

          .Button img:hover {
            transform: scale(1.4);
          }
        `}</style>
      </div>
    );
  }

}

export default ShareBtn;
