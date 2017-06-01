import React from 'react';

// Components
import BarChart from './BarChart';
import ActualValueArrow from './ActualValueArrow';
import YourGuessArrow from './YourGuessArrow';
import OthersGuessesArrow from './OthersGuessesArrow';

// Images
const HappyEmoji = '/static/icons/Emoji_Happy.svg';
const GrinningEmoji = '/static/icons/Emoji_Grinning.svg';

import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';

class ComparisonBarChart extends React.PureComponent {

  static propTypes = {
    city: React.PropTypes.string,
    own: React.PropTypes.object,
    others: React.PropTypes.array,
    actual: React.PropTypes.object,
    guessStrength: React.PropTypes.number,
  }

  positionOthersArrow() {
    if (avg(this.props.others) < this.props.actual.car) {
      return 'above';
    }
    return 'below';
  }

  positionActualArrow() {
    if (this.props.actual.car <= avg(this.props.others)) {
      return 'above';
    }
    return 'below';
  }

  renderText(guess) {
    if (guess < 30) {
      return (
        <div className="Container">
          <h2 className="Title">We know you can do better than this <img alt="GrinningEmoji" src={GrinningEmoji} /></h2>
          <h3 className="SubTitle">Unfortunately your guess was far off</h3>
          <style jsx>{`
            .Container {
              width: 320px;
            }

            .Title {
              font-size: 47px;
              line-height: 56px;
              font-weight: 600;
              margin: 110px 0 0 0;
            }

            .SubTitle {
              font-size: 21px;
              line-height: 27px;
              font-weight: 100;
              font-family: 'LarsseitLight';
              margin: 15px 0 0 0;
            }
          `}</style>
        </div>
      );
    } else if (guess < 60) {
      return (
        <div className="Container">
          <h2 className="Title">Not a bad guess for the first time <img alt="GrinningEmoji" src={GrinningEmoji} /></h2>
          <h3 className="SubTitle">Your guess was similar to all other people</h3>
          <style jsx>{`
            .Container {
              width: 320px;
            }

            .Title {
              font-size: 47px;
              line-height: 56px;
              font-weight: 600;
              margin: 110px 0 0 0;
            }

            .SubTitle {
              font-size: 21px;
              line-height: 27px;
              font-weight: 100;
              font-family: 'LarsseitLight';
              margin: 15px 0 0 0;
            }
          `}</style>
        </div>
      );
    }
    return (
      <div className="Container">
        <h2 className="Title">You guessed better than most <img alt="HappyEmoji" src={HappyEmoji} /></h2>
        <h3 className="SubTitle">Your guess was more precise than {Math.round(guess)}% of all other people</h3>
        <style jsx>{`
          .Container {
              width: 320px;
          }

          .Title {
            font-size: 47px;
            line-height: 56px;
            font-weight: 600;
            margin: 110px 0 0 0;
          }

          .SubTitle {
            font-size: 21px;
            line-height: 27px;
            font-weight: 100;
            font-family: 'LarsseitLight';
            margin: 15px 0 0 0;
          }
        `}</style>
      </div>
    );
  }

  render = () => (
    <div className="MainContainer">
      <div className="Wrapper">
        <OthersGuessesArrow position={this.positionOthersArrow()} data={this.props.others} offset={offsetOthersArrow(avg(this.props.others), this.props.actual.car)} />
        <ActualValueArrow position={this.positionActualArrow()} data={this.props.actual.car} city={this.props.city} offset={offsetActualArrow(this.props.actual.car, avg(this.props.others))} />
        <BarChart actual={this.props.actual} others={this.props.others} own={this.props.own} />
        <YourGuessArrow data={this.props.own.bike} area={false} />
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
      `}</style>
    </div>
  )
}

export default ComparisonBarChart;

const avg = (values) => {
  let sum = 0;
  for (let i = 0; i < values.length; i += 1) {
    sum += parseFloat(values[i].car);
  }

  return (sum / values.length);
};

const offsetOthersArrow = (others, actual) => {
  if (Math.abs(others - actual) < 0.125 && others + Math.abs(others - actual) > 0.1) {
    return 35 - ((others - actual) * 350);
  }
  return 0;
};

const offsetActualArrow = (actual, others) => {
  if (actual - others < 0.125 && actual - others > 0 && others + Math.abs(others - actual) <= 0.1) {
    return 35 - ((actual - others) * 350);
  }
  return 0;
};
