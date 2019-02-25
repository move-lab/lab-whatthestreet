import PropTypes from 'prop-types';
import React from 'react';

import * as COLORS from '../../shared/style/colors';

class LetterCounter extends React.PureComponent {

  static propTypes = {
    streets: PropTypes.arrayOf(PropTypes.string),
  }

  renderChar = (char, index) => char === ' ' ? (<div className="EmptyChar" key={index} />) : (<div className="Char" key={index}>{char === 'ß' ? char : char.toUpperCase()}</div>)

  renderRow = (street, index) => (
    <tr key={index}>
      <td className="ColStreet">
        {street.split('').map((char, i) => this.renderChar(char, i))}
      </td>
      <td className="ColLength">
        <span className="Length">{street.length}</span>
        &nbsp;
        letters
      </td>
    </tr>
  )

  render = () => (
    <tbody className="TableBody">
      {this.props.streets.map((street, i) => this.renderRow(street, i))}
      <style jsx>{`
        .TableBody {
          margin-top: 10px;
        }

        .TableBody :global(.ColStreet) {
          padding: 10px 0;
          overflow: hidden;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          align-items: center;

        }

        .TableBody :global(.ColLength) {
          padding: 5px 0;
          text-align: right;
          font-size: 24px;
          line-height: 30px;
          height: 50px;
        }

        .TableBody :global(.Char) {
          height: 30px;
          width: 30px;
          background-color: white;
          color: ${COLORS.ColorForegroundText};
          font-size: 21px;
          line-height: 1;
          margin: 2px 2px 0 0;
          padding: 0;
          padding-top: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .TableBody :global(.EmptyChar) {
          height: 30px;
          width: 30px;
          background-color: white;
          opacity: 0.6;
          margin: 2px 2px 0 0;
          padding: 0;
        }

        .TableBody :global(.Length) {
          font-family: 'Circular';
        }
      `}</style>
    </tbody>
  )
}

export default LetterCounter;
