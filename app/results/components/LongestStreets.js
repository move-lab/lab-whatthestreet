import React from 'react';

import * as COLORS from '../../shared/style/colors';

import StatsTableRow from './StatsTableRow';

class LongestStreets extends React.PureComponent {

  static propTypes = {
    city: React.PropTypes.string,
    streets: React.PropTypes.arrayOf(React.PropTypes.object),
  }

  renderTableRows = (street, index) => (<StatsTableRow key={index} position={index + 1} name={street.name} length={street.length} />)

  render = () => (
    <div>
      <h2 className="Title">
        Longest Streets
      </h2>
      <h3 className="SubTitle">
        Did you ever wonder what the longest streets of {this.props.city} are?
      </h3>
      <div className="Container">
        <div className="TableContainer">
          <table className="TableHalf">
            <tbody className="TableBody">
              {this.props.streets.slice(0, 5).map((street, i) => this.renderTableRows(street, i))}
            </tbody>
          </table>
        </div>
        <div className="TableContainer">
          <table className="TableHalf">
            <tbody className="TableBody">
              {this.props.streets.slice(5, 10).map((street, i) => this.renderTableRows(street, i + 5))}
            </tbody>
          </table>
        </div>
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
        }

        .Container {
          display: flex;
          justify-content: space-between;
          margin-bottom: 130px;
        }

        .TableContainer {
          display: flex;
          justify-content: space-between;
          border-top: 1px solid ${COLORS.ColorLightYellow};
          width: calc(50% - 40px);
          padding-top: 10px;
        }

        .TableHalf {
          width: 100%;
          color: white;
        }

        .TableBody {
          margin-top: 20px;
        }
      `}</style>
    </div>
  )
}

export default LongestStreets;
