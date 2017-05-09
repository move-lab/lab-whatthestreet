/**
 * GuessBarChart
 */

// Libraries
import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from 'components/GuessBarChart/messages';

import * as identifiers from 'identifiers';

// Components
import Bar from 'components/GuessBar';
import VehicleIcon from 'components/VehicleIcon';

// Images
import ArrowIcon from 'assets/icons/Arrow_Landing.svg';

// Styles
import styles from './main.scss';

/**
 * Renders BarChart with Bars that are ajustable
 */
class GuessBarChart extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

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

  shouldComponentUpdate = () => (true)

  onChange = () => this.props.onChange(this.state.guess);

  positionChanged = (procentualPosition, key) => {
    const guess = this.state.guess;

    if (procentualPosition >= 1.0) guess[key] = 1;
    else if (procentualPosition < 0.09) guess[key] = 0.0;
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

    this.setState({ guess });
    return true;
  }

  renderResult = (values, key) => (
    <div className={styles.Column} key={key}>
      <Bar positionChanged={(a, i) => this.positionChanged(a, i)} onChange={this.onChange} id={key} guess={values} />
      <div className={styles.Value}>{`${Math.round(this.state.guess[key] * 100)}`}<small>%</small></div>
    </div>
  )

  render = () => (
    <div className={styles.Chart}>
      <div className={styles.ExplainLabel}>
        <img alt="ArrowIcon" src={ArrowIcon} />
        <span>
          Take your
          <big>Best Guess</big>
          by adjusting the
          <big>Sliders</big>
        </span>
      </div>
      <div className={styles.ChartHeader}>
        <div className={styles.Column}>
          <VehicleIcon className={styles.Icon} vehicle={identifiers.bike} />
          <p className={styles.Header}>
            <FormattedMessage {...messages.bikes} />
          </p>
        </div>
        <div className={styles.Column}>
          <VehicleIcon className={styles.Icon} vehicle={identifiers.rail} />
          <p className={styles.Header}>
            <FormattedMessage {...messages.rails} />
          </p>
        </div>
        <div className={styles.Column}>
          <VehicleIcon className={styles.Icon} vehicle={identifiers.car} />
          <p className={styles.Header}>
            <FormattedMessage {...messages.cars} />
          </p>
        </div>
      </div>
      <div className={styles.ChartBody}>
        { this.renderResult(this.state.guess.bike, 'bike') }
        { this.renderResult(this.state.guess.rail, 'rail') }
        { this.renderResult(this.state.guess.car, 'car') }
      </div>
    </div>
  )
}

export default GuessBarChart;
