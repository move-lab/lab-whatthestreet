import React from 'react';

import * as COLORS from '../../shared/style/colors';

class VersusRanking extends React.PureComponent {

  static propTypes = {
    rankings: React.PropTypes.arrayOf(React.PropTypes.string),
    currentCity: React.PropTypes.string,
  }

  cleanedRankings(rankings) {
    let cleanedRankings = [];
    let currentCity;

    for (let i = 0; i < rankings.length; i += 1) {
      cleanedRankings.push({ position: i + 1, city: rankings[i] });

      if (this.props.currentCity === rankings[i] && i > 4) {
        for (let j = 3; j < i; j += 1) {
          delete cleanedRankings[j];
          currentCity = { position: i + 1, city: rankings[i] };
        }
      }
    }
    cleanedRankings = cleanedRankings.slice(0, 5);

    if (currentCity !== undefined) {
      cleanedRankings[3] = { position: null, city: '...' };
      cleanedRankings[4] = currentCity;
    }

    return cleanedRankings;
  }

  renderRow = (cityObj, index) => {
    let current = false;
    if (this.props.currentCity === cityObj.city) {
      current = true;
    }

    return (
      <div key={index}
        className={`TableRow ${current ? 'current' : ''}`}>
        <div className="ColPosition">
          {cityObj.position}
        </div>
        <div className="ColCity">
          {cityObj.city}
        </div>
        <style jsx>{`
          .TableRow {
            display: flex;
          }

          .TableRow.current {
            background-color: ${COLORS.ColorBackgroundLightBlue};
          }

          .ColPosition {
            width: 60px;
            padding: 0 10px 10px 0;
            padding-top: 8px;
            text-align: right;
            font-size: 21px;
            line-height: 42px;
            font-family: 'Circular';
          }

          .ColCity {
            padding: 10px 0;
            font-size: 21px;
            line-height: 42px;
          }

          .TableRow:first-of-type .ColPosition {
            padding-top: 15px;
          }

          .TableRow:first-of-type .ColCity {
            font-size: 35px;
            line-height: 50px;
          }
        `}</style>
      </div>
    );
  }

  render = () => (
    <div>
      {this.cleanedRankings(this.props.rankings).map((city, i) => this.renderRow(city, i))}
    </div>
  )
}

export default VersusRanking;
