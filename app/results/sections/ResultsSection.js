import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Components
import ResultsBarChart from '../components/ResultsBarChart';
import ComparisonBarChart from '../components/ComparisonBarChart';
import DeviderImage from '../components/DeviderImage';

// Images
const SnapDeviderBackground = '/static/images/Background_Highway.jpg';
const IllustrationSnap = '/static/icons/Illustration_Snap.svg';

// Selectors
import { CitySelectors, GuessSelectors } from '../../statemanagement/selectors';

class ResultsPage extends React.PureComponent {

  static propTypes = {
    own: React.PropTypes.objectOf(React.PropTypes.number),
    others: React.PropTypes.arrayOf(React.PropTypes.object),
    actual: React.PropTypes.object,
    city: React.PropTypes.object,
    isLoading: React.PropTypes.bool,
  }

  getSuggestion = () => ('Indiapolis')

  calculateGuessStrength = () => {
    const actual = this.props.actual;

    // Get correctness of each guess point
    let others = this.props.others.map((item) => ({ bike: getPercentOfRightness(actual.bike, item.bike), car: getPercentOfRightness(actual.car, item.car), rail: getPercentOfRightness(actual.rail, item.rail) }));
    let own = { bike: getPercentOfRightness(actual.bike, this.props.own.bike), car: getPercentOfRightness(actual.car, this.props.own.car), rail: getPercentOfRightness(actual.rail, this.props.own.rail) };


    others = others.map((item) => (Math.round((item.bike + item.car + item.rail) / 3)));
    own = Math.round((own.bike + own.car + own.rail) / 3);

    // Get own against others
    others = others.sort();
    let i = 0;
    for (i; i < others.length; i += 1) {
      if (own < others[i]) {
        break;
      }
    }
    const result = (100 / others.length) * i;

    return result;
  }

  render = () => {
    let toReturn = null;

    if (!this.props.isLoading) {
      toReturn = (
        <div>
          <ResultsBarChart guessStrength={this.calculateGuessStrength()} suggestion={this.getSuggestion()} actual={this.props.actual} own={this.props.own} city={this.props.city.name} />
          <DeviderImage alt="SnapDevider" background={SnapDeviderBackground} foreground={IllustrationSnap} />
          <ComparisonBarChart guessStrength={this.calculateGuessStrength()} actual={this.props.actual} own={this.props.own} others={this.props.others} city={this.props.city.name} />
        </div>
      );
    }
    return toReturn;
  }
}

const getPercentOfRightness = (valueA, valueB) => (100 - Math.round(Math.abs(((valueA * 100) - (valueB * 100)))));


const mapStateToProps = createStructuredSelector({
  own: GuessSelectors.makeSelectOwnGuess(),
  others: GuessSelectors.makeSelectOthersGuesses(),
  actual: GuessSelectors.makeSelectActualGuesses(),
  city: CitySelectors.makeSelectActualCity(),
  isLoading: GuessSelectors.makeSelectGuessLoadingState(),
});

export default connect(mapStateToProps)(ResultsPage);
