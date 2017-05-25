import React from 'react';

import LetterCounter from './LetterCounter';

import * as COLORS from '../../shared/style/colors';

class LongestStreetNames extends React.PureComponent {

  static propTypes = {
    streets: React.PropTypes.arrayOf(React.PropTypes.string),
  }

  render = () => (
    <div>
      <h2 className="Title">
        Longest Street Names
      </h2>
      <h3 className="SubTitle">
        Or did you wonder which are the longest street names?
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
          font-family: 'LarsseitLight';
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
