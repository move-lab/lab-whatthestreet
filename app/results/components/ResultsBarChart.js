import React from 'react';

import * as identifiers from '../../statemanagement/constants/identifiersConstants';

// Components
import BarChart from './BarChart';
import ActualValueArrow from './ActualValueArrow';
import YourGuessArrow from './YourGuessArrow';
import SocialShareButtons from './SocialShareButtons';

// Images
const ShockedEmoji = '/static/icons/Emoji_Shocked.svg';
const UpsideDownEmoji = '/static/icons/Emoji_UpsideDown.svg';
const GrinningEmoji = '/static/icons/Emoji_Grinning.svg';

import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';

class ResultsBarChart extends React.PureComponent {

  static propTypes = {
    city: React.PropTypes.string,
    guessStrength: React.PropTypes.number,
    suggestion: React.PropTypes.object,
    own: React.PropTypes.objectOf(React.PropTypes.number),
    others: React.PropTypes.arrayOf(React.PropTypes.objectOf(React.PropTypes.number)),
    actual: React.PropTypes.objectOf(React.PropTypes.number).isRequired,
  }

  renderText = (guessStrength) => {
    if (guessStrength < 50) {
      return (
        <div className="Container">
          <SocialShareButtons result="bad" suggestion={this.props.suggestion.get('name')} />
          <h2 className="Title">You should move to {this.props.suggestion.get('name')} <img alt="UpsideDownEmoji" src={UpsideDownEmoji} /></h2>
          <h3 className="SubTitle">That’s the city your guess matches best.</h3>
          <style jsx>{`
            .Container {
              width: 350px;
              transform: translate(30px, 0px);
              padding-top: 110px;
            }
          `}</style>
        </div>
      );
    } else if(guessStrength >= 50 && guessStrength < 80) {
      return (
        <div className="Container">
          <SocialShareButtons result="good" suggestion={this.props.suggestion.get('name')} />
          <h2 className="Title">We know you can do better than this <img alt="GrinningEmoji" src={GrinningEmoji} /></h2>
          <h3 className="SubTitle">Your should move to {this.props.suggestion.get('name')}, that’s the city your guess matches best.</h3>
          <style jsx>{`
            .Container {
              width: 350px;
              transform: translate(30px, 0px);
              padding-top: 110px;
            }
          `}</style>
        </div>
      );
    } else {
      return (
        <div className="Container">
          <SocialShareButtons result="good" suggestion={this.props.suggestion.get('name')} />
          <h2 className="Title">You must be from {this.props.city} <img alt="ShockedEmoji" src={ShockedEmoji} /></h2>
          <h3 className="SubTitle">Your guess was almost perfect, you mobility guru.</h3>
          <style jsx>{`
            .Container {
              width: 350px;
              transform: translate(30px, 0px);
              padding-top: 110px;
            }
          `}</style>
        </div>
      );
    }
  }

  render = () => (
    <div className="MainContainer">
      <div className="Wrapper">
        <ActualValueArrow data={this.props.actual[identifiers.car]} city={this.props.city} offset={0} />
        <BarChart own={this.props.own} actual={this.props.actual} others={this.props.others} />
        <YourGuessArrow data={this.props.own[identifiers.bike]} area />
        {this.renderText(this.props.guessStrength)}
      </div>
      <style jsx>{`
        .MainContainer {
          background-color: ${COLORS.ColorBackgroundLightBlue};
          padding: ${METRICS.MetricsSectionPadding} 0;
          padding-bottom: 150px;
        }

        .Wrapper {
          width: ${METRICS.MetricsContentWidth};
          padding: 0 ${METRICS.MetricsContentPadding};
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          position: relative;
        }

        .Wrapper :global(.Title) {
          font-size: 47px;
          line-height: 56px;
          font-weight: 500;
          margin: 0;
        }

        .Wrapper :global(.SubTitle) {
          font-size: 21px;
          line-height: 27px;
          font-weight: 300;
          margin: 15px 0 0 0;
          overflow: visible;
          width: 110%;
        }
      `}</style>
    </div>
  )
}


export default ResultsBarChart;
