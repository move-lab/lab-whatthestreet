import PropTypes from 'prop-types';
import React from 'react';

import LetterCounter from './LetterCounter';

import * as COLORS from '../../shared/style/colors';

class LongestStreetNames extends React.PureComponent {

  static propTypes = {
    streets: PropTypes.arrayOf(PropTypes.string),
  }

  render = () => (
    <div>
      <h2 className="Title">
        Longest street names
      </h2>
      <h3 className="SubTitle">
        Here's a Scrabble joker for you! These are the longest street names of {this.props.city}.
      </h3>
      <div className="TableContainer">
        <table className="Table">
          <LetterCounter streets={this.props.streets} />
        </table>
      </div>
      <style jsx>{`
        .Title {
          font-size: 40px;
          line-height: 50px;
          font-weight: 500;
          color: white;
          margin: 0;
        }

        .SubTitle {
          font-size: 21px;
          line-height: 27px;
          color: white;
          margin: 0 0 15px 0;
          overflow: visible;
          width: 110%;
        }

        .TableContainer {
          border-top: 1px solid ${COLORS.ColorLightYellow};
          width: 100%;
          padding-top: 10px;
        }

        .Table {
          color: white;
          width: 100%;
          margin-bottom: 150px;
        }
      `}</style>
    </div>
  )
}

export default LongestStreetNames;
