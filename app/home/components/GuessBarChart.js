import React from 'react';

import * as identifiers from '../../statemanagement/constants/identifiersConstants';

import Bar from './GuessBar';
import VehicleIcon from '../../shared/components/VehicleIcon';

const ArrowIcon = '/static/icons/Arrow_Landing.svg';

// Styles
import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';

class GuessBarChart extends React.Component {

  static propTypes = {
    guess: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func,
  }

  constructor(props) {
    super();
    this.state = {
      guess: props.guess,
    };
  }

  onChange = () => this.props.onChange(this.state.guess);

  positionChanged = (procentualPosition, key) => {
    console.log(procentualPosition);
    const guess = this.state.guess;

    if (procentualPosition >= 1.0) guess[key] = 1;
    else if (procentualPosition < 0.01) guess[key] = 0.0;
    else guess[key] = procentualPosition;

    let guessSum = guess.bike + guess.car + guess.rail;
    let diff = guessSum - 1.000;

    let counter = 0;

    if (guessSum > 1) {
      while (Math.round(diff * 100) / 100 > 0 && counter < 100) {
        guessSum = guess.bike + guess.car + guess.rail;
        diff = guessSum - 1.000;
        const diffEach = diff / 2;

        for (let i = 0; i < Object.keys(guess).length; i += 1) {
          if (Object.keys(guess)[i] !== key && guess[Object.keys(guess)[i]] > diffEach) {
            guess[Object.keys(guess)[i]] -= diffEach;
            diff -= diffEach;
          }
        }
        counter += 1;
      }
    } else if (guessSum < 1) {
      while (Math.round(diff * 100) / 100 < 0 && counter < 100) {
        guessSum = guess.bike + guess.car + guess.rail;
        diff = guessSum - 1.000;
        const diffEach = diff / 2;

        for (let i = 0; i < Object.keys(guess).length; i += 1) {
          if (Object.keys(guess)[i] !== key && guess[Object.keys(guess)[i]] < 1.00000) {
            guess[Object.keys(guess)[i]] -= diffEach;
            diff -= diffEach;
          }
        }
        counter += 1;
      }
    }

    this.setState({ 
      guess: {
        bike: Math.round(guess.bike * 100) / 100,
        rail: Math.round(guess.rail * 100) / 100,
        car: Math.round(guess.car * 100) / 100
      }
    });
    return true;
  }

  renderResult = (values, key) => (
    <div className="Column" key={key}>
      <Bar positionChanged={(a, i) => this.positionChanged(a, i)} onChange={this.onChange} id={key} guess={values} />
      <div className="Value">{`${Math.round(this.state.guess[key] * 100)}`}<small>%</small></div>
    </div>
  )

  render = () => (
    <div className="Chart">
      <div className="ExplainLabel">
        <img alt="" src={ArrowIcon} />
        <span>
          Take your
          <big>Best Guess</big>
          by adjusting the
          <big>Sliders</big>
        </span>
      </div>
      <div className="ChartHeader">
        <div className="Column">
          <VehicleIcon className="Icon" vehicle={identifiers.car} />
          <p className="Header">Cars</p>
        </div>
        <div className="Column">
          <VehicleIcon className="Icon" vehicle={identifiers.rail} />
          <p className="Header">Rails</p>
        </div>
        <div className="Column">
          <VehicleIcon className="Icon" vehicle={identifiers.bike} />
          <p className="Header">Bikes</p>
        </div>
      </div>
      <div className="ChartBody">
        { this.renderResult(this.state.guess.car, 'car') }
        { this.renderResult(this.state.guess.rail, 'rail') }
        { this.renderResult(this.state.guess.bike, 'bike') }
      </div>
      <style jsx>{`
        .Chart {
          position: relative;
          width: ${METRICS.MetricsChartWidth};
        }

        .Chart ::selection {
          background-color: inherit;
          color: inherit;
        }

        .ChartHeader {
          background-color: ${COLORS.ColorWhite};
          width: 480px;
          height: 160px;
          display: flex;
          justify-content: space-between;
        }

        .ChartHeader .Column {
          padding-top: 40px;
        }

        .ChartBody {
          display: flex;
          width: 480px;
          justify-content: space-between;
        }

        .Chart :global(.Column) {
          position: relative;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          width: ${METRICS.MetricsBarWidth};
          background-color: ${COLORS.ColorWhite};
        }

        .Icon {
          padding-top: 40px;
        }

        .Header {
          font-size: 23px;
          font-weight: 500;
          line-height: 29px;
          margin: 15px 0 0 0;
        }

        .ExplainLabel {
          position: absolute;
          left: -200px;
          top: 280px;
          display: flex;
          flex-direction: column;
          width: 300px;
          transform: rotate(-20deg);
        }

        .ExplainLabel img {
          transform: rotate(20deg);
        }

        .ExplainLabel span {
          display: flex;
          flex-direction: column;
          color: ${COLORS.ColorForegroundOrange};
          font-family: 'sign-painter', sans-serif;
          text-align: center;
          margin-top: 5px;
          width: 150px;
        }

        .ExplainLabel big {
          font-size: 2em;
        }

        .Chart :global(.Value) {
          position: absolute;
          bottom: 0;
          color: ${COLORS.ColorBlack};
          padding-bottom: 30px;
          font-size: 1.5em;
          font-family: 'Circular', sans-serif;
          width: 100%;
          text-align: center;
          pointer-events: none;
        }

        .Chart :global(.Value) small {
          font-size: .6em;
        }
      `}</style>
    </div>
  )
}

export default GuessBarChart;
