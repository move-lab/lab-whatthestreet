import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

// Components
import ResultsBarChart from '../components/ResultsBarChart';
import ComparisonBarChart from '../components/ComparisonBarChart';
import DeviderImage from '../components/DeviderImage';

// Selectors
import { CitySelectors, GuessSelectors } from '../../statemanagement/selectors';
import { prefixURL } from '../../../utils/url';

// Images
const SnapDeviderBackground = prefixURL('/static/images/Background_Highway.jpg');
const IllustrationSnap = prefixURL('/static/icons/Illustration_Snap.svg');



class ResultsPage extends React.PureComponent {

  static propTypes = {
    own: PropTypes.objectOf(PropTypes.number),
    others: PropTypes.arrayOf(PropTypes.object),
    actual: PropTypes.object,
    city: PropTypes.object,
    suggestion: PropTypes.object,
    isLoading: PropTypes.bool,
  }

  constructor(props) {
    super(props);

    this.state = {
      guessStrength: this.calculateGuessStrength(props)
    }
  }

  calculateGuessStrength = (props) => {
    const actual = props.actual;

    // Get correctness of each guess point
    let others = props.others.map((item) => ({ bike: getPercentOfRightness(actual.bike, item.bike), car: getPercentOfRightness(actual.car, item.car), rail: getPercentOfRightness(actual.rail, item.rail) }));
    let own = { bike: getPercentOfRightness(actual.bike, props.own.bike), car: getPercentOfRightness(actual.car, props.own.car), rail: getPercentOfRightness(actual.rail, props.own.rail) };

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

    return {
      own: own,
      ownAgainstOther: result
    };
  }

  render = () => {
    let toReturn = null;

    if (!this.props.isLoading) {
      toReturn = (
        <div>
          <ResultsBarChart
            guessStrength={this.state.guessStrength.own}
            suggestion={this.props.suggestion}
            actual={this.props.actual}
            own={this.props.own}
            city={this.props.city.name}
          />
          <DeviderImage 
            alt="SnapDevider"
            background={SnapDeviderBackground}
            foreground={IllustrationSnap}
          />
          {this.props.others && this.props.others.length > 0 &&
            <ComparisonBarChart
              guessStrength={this.state.guessStrength.ownAgainstOther}
              actual={this.props.actual}
              own={this.props.own}
              others={this.props.others}
              city={this.props.city.name}
            />
          }
        </div>
      );
    }
    return toReturn;
  }
}

const getPercentOfRightness = (valueA, valueB) => (100 - Math.round(Math.abs(((valueA * 100) - (valueB * 100)))));


const structuredSelector = createStructuredSelector({
  own: GuessSelectors.makeSelectOwnGuess(),
  others: GuessSelectors.makeSelectOthersGuesses(),
  actual: GuessSelectors.makeSelectActualGuesses(),
  city: CitySelectors.makeSelectActualCity(),
  isLoading: GuessSelectors.makeSelectGuessLoadingState(),
});

export default connect((state) => {
  return {
    ...structuredSelector(state),
    suggestion: state.guess.get('suggestion')
  }
})(ResultsPage);
