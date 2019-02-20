import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect'
import { getSearchSelectors } from 'redux-search';
import debounce from 'lodash.debounce';

const SearchIcon = '/static/icons/Icon_Search.svg';

import { search, setData } from '../../statemanagement/SearchableStreetsStateManagement';

// Styles
import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';

class SearchModal extends React.PureComponent {

  static propTypes = {
    close: PropTypes.func,
    onSelectResult: PropTypes.func,
    city: PropTypes.string,
  }

  constructor() {
    super();

    this.debouncedSearchStreet = debounce(this.searchStreet, 300).bind(this);

    this.state = {
      focusedResult: 0,
      searchText: "",
      suggestion: { name: '' },
    };
  }

  componentDidMount = () => {
    this.searchbox.focus();
    this.wrapper.addEventListener('keyup', (event) => ((event.keyCode === 27) && this.props.close()));
    this.searchbox.addEventListener('keyup', (event) => {
      if (event.keyCode === 38) this.focusPrevResult();
      if (event.keyCode === 40) this.focusNextResult();
      if (event.keyCode === 13) this.selectResult(this.state.focusedResult);
    });
  }

  componentWillReceiveProps = (newprops, oldprops) => {
    if (newprops !== oldprops) {
      if (newprops.results.length > 0) {
        const newSuggestion = newprops.results[0];
        this.setState({ suggestion: newSuggestion });
      }
    }
  }

  searchStreet(searchText) {
    this.setState({
      searchText: searchText
    });
    this.props.dispatch(search(searchText));
  }

  onChange(event) {
    this.debouncedSearchStreet(event.target.value);
  } 

  selectResult = (index) => {
    this.props.onSelectResult(this.props.results[index]);
    this.props.close();
  }

  focusPrevResult = () => {
    const newIndex = (this.state.focusedResult > 0) ? (this.state.focusedResult - 1) : (this.props.results.length - 1);
    this.setState({ focusedResult: newIndex, suggestion: this.props.results[newIndex] });
    this.resultsElement.scrollTop = 68 * newIndex;
  }

  focusNextResult = () => {
    const newIndex = (this.state.focusedResult < this.props.results.length - 1) ? this.state.focusedResult + 1 : 0;
    this.setState({ focusedResult: newIndex, suggestion: this.props.results[newIndex] });
    this.resultsElement.scrollTop = 68 * newIndex;
  }

  renderResult = (result, index) => (
    <li
      onClick={() => this.selectResult(index)}
      key={`result-${index}`}
      className={`Result ${this.state.focusedResult === index ? 'focused' : ''}`
    }>
      <span className="Title" >{result.name}</span>
      <span className="Text" >Street in {this.props.city}</span>
      <style jsx>{`
        .Result {
          color: ${COLORS.ColorForegroundOrange};
          list-style: 0;
          padding: 15px 5px;
          display: flex;
          flex-flow: column;
          cursor: pointer;
        }

        .Result.focused {
          border-left: 2px solid blue;
          background-color: rgba(0,0,255,0.05);
        }

        .Title {
          font-size: 25px;
        }

        .Text {
          font-size: 13px;
        }     
      `}</style>
    </li>
  )

  render = () => (
    <div
      onClick={() => this.props.close()}
      ref={(element) => { this.wrapper = element; }}
      className="SearchboxWrapper"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        ref={(element) => { this.box = element; }}
        className="Searchbox"
      >
        <div
          className="CloseBtn"
          onClick={() => this.props.close()}
        >
          <img src="/static/icons/Icon_Cross.svg" alt=""/>
        </div>
        <form
          onSubmit={(event) => { event.preventDefault(); }}
          className="Searchform"
        >
          <div className="InputWrapper">
            <input
              ref={(element) => { this.searchbox = element; }}
              onChange={(event) => this.onChange(event)}
              type="text"
              placeholder="Search Streets" />
            <img className="Icon" alt="SearchIcon" src={SearchIcon} />
          </div>
        </form>
        <ul
          ref={(element) => { this.resultsElement = element; }}
          className="Results">
          {this.state.searchText !== "" && this.props.results.length > 0 && this.props.results.map((result, index) => 
            this.renderResult(result, index)
          )}
        </ul>
      </div>
      <style jsx>{`
        .SearchboxWrapper {
          position: fixed;
          z-index: 999999999;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: all;
          background-color: rgba(0,0,0,0.5);
        }

        .Searchbox {
          position: relative;
          background: #fff;
          padding: 50px;
          height: 373px;
          width: 500px;
          position: fixed;
          box-shadow: ${COLORS.boxshadow};
        }

        .Searchform {
          position: relative;
        }

        .InputWrapper {
          position: relative;
          z-index: 1;
          border-bottom: 2px solid blue;
          display: flex;
        }

        input {
          border: 0;
          width: 350px;
          padding: 5px 0;
          font-size: 25px;
          flex-grow: 1;
          outline: none;
        }

        .Suggestion {
          position: absolute;
          z-index: 0;
          top: 0;
          left: 0;
          font-size: 25px;
          padding: 10px 0;
          color: transparentize(blue, 0.5);
        }

        .Icon {
          padding: 0 0 0 5px;
        }

        .Results {
          padding: 0;
          max-height: 200px;
          overflow: auto;
        }

        .CloseBtn {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 25px;
          height: 25px;
          cursor: pointer;
        }

        .CloseBtn:hover,.CloseBtn:active,.CloseBtn:focus {
          opacity: 0.5;
        }

        .CloseBtn img {
          width: 100%;
        }
      `}</style>
    </div>
  )

}

// Limit to 50 results
const result = state => state.search.carStreets.result.slice(0, 50);

const carStreets = state => state.searchableStreets.get('carStreets')

const carStreetsResults = createSelector(
  [result, carStreets],
  (resultsIds, carStreets) => {
    return resultsIds.map((id) => {
      return carStreets[id];
    });
  }
)

export default connect((state) => {
  return {
    results: carStreetsResults(state)
  }
})(SearchModal);
