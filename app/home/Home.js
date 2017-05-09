import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// Actions
import { CityActions, GuessActions } from '../statemanagement/actions';

// Selectors
import { CitySelectors, GuessSelectors } from '../statemanagement/selectors';

// Components
// import RoundedButton from '../shared/RoundedButton';
import CitySelector from './components/CitySelector';
// import GuessBarChart from './GuessBarChart';

// Styles
import * as METRICS from '../shared/style/metrics';
import * as COLORS from '../shared/style/colors';

/**
 * Renders the Home page
 */
class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    availableCities: PropTypes.arrayOf(PropTypes.object),
    selectCity: PropTypes.func.isRequired,
    city: PropTypes.object,
    toggleCitySelection: PropTypes.func.isRequired,
    show_city_selection: PropTypes.bool,
    nextScrollIndex: PropTypes.func,
    ownGuess: PropTypes.objectOf(PropTypes.number),
    setGuess: PropTypes.func,
    saveGuess: PropTypes.func,
  }


  constructor() {
    super();
    this.state = {
      guessed : false
    }
  }

  onCityChanged = (identifyer) => this.props.selectCity(identifyer)
  onChangeGuess = (guess) => {
    this.setState({ guessed : true });
    this.props.setGuess(guess);
  }

  solved = () => {
    this.props.saveGuess(this.props.ownGuess);
    this.props.nextScrollIndex();
  }

  render = () => (
    <section className="HomePage">
      <div className="Wrapper">
        <div className="Container">
          <div className="Container">
            <h2 className="Title">Who owns</h2>
            <CitySelector
              selectorOpen={this.props.show_city_selection}
              onButtonClick={this.props.toggleCitySelection}
              availableCities={this.props.availableCities}
              city={this.props.city}
              onChange={this.onCityChanged}
            />
            <h3 className="SubTitle">How much space do bikes, trams</h3>
          </div>
          <div className="Container"></div>
        </div>
        <div className="Container">
          {/*{ <GuessBarChart onChange={(value, index) => this.onChangeGuess(value, index)} guess={this.props.ownGuess} /> }*/}
          <div className="CenteredContent">
            {/*<RoundedButton disabled={!this.state.guessed} onClick={() => this.solved()}>
              Get Started
            </RoundedButton>*/}
          </div>
        </div>
      </div>
      <style jsx>{`
        .HomePage {
          background-color: ${COLORS.HomePageBackgroundColor};
          min-height: ${METRICS.MetricsSectionMinHeight};
        }

        .Wrapper {
          display: flex;
          width: ${METRICS.MetricsContentWidth};
          margin: 0 auto;
          padding-top: ${METRICS.MetricsHeaderHeight};
          padding-bottom: ${METRICS.MetricsSectionPadding};
          padding-left: ${METRICS.MetricsContentPadding};
          padding-right: ${METRICS.MetricsContentPadding};
        }

        .CenteredContent {
          display: flex;
          width: ${METRICS.MetricsChartWidth};
          justify-content: center;
          margin-top: 30px;
        }

        .Container {
          flex-basis: 50%;
          flex-grow: 1;
        }

        .Title {
          font-size: 36px;
          line-height: 45px;
          font-weight: 400;
          margin: 65px 0 0 0;
          margin-bottom: 15px;
        }

        .SubTitle {
          font-size: 21px;
          line-height: 27px;
          font-weight: 200;
          margin-top: 15px;
          font-family: 'LarsseitLight';
        }
      `}</style>
    </section>
  )
}

const mapStateToProps = createStructuredSelector({
  availableCities: CitySelectors.makeSelectCities(),
  city: CitySelectors.makeSelectActualCity(),
  show_city_selection: CitySelectors.makeShowCitySelection(),
  ownGuess: GuessSelectors.makeSelectOwnGuess(),
});

const mapDispatchToProps = (dispatch) => ({
  loadCities: () => dispatch(CityActions.loadCities()),
  selectCity: (identifyer) => dispatch(CityActions.selectCity(identifyer)),
  toggleCitySelection: () => dispatch(CityActions.toggleCitySelection()),
  nextScrollIndex: (index) => dispatch(ScrollActions.nextScrollIndex(index)),
  setGuess: (guess) => dispatch(GuessActions.setOwnGuess(guess)),
  saveGuess: (guess) => dispatch(GuessActions.saveGuess(guess)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
