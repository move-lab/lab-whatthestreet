import PropTypes from 'prop-types';
import React from 'react';

import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';
import { prefixURL } from '../../../utils/url';

const IllustrationRocks = prefixURL('/static/icons/Illustration_Rocks.svg');
const FreedUpImg = prefixURL('/static/icons/Arrow_FreedUp.svg');

class FreedUp extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    amount: PropTypes.number,
    intl: PropTypes.object,
  }

  render = () => (
    <section className="FreedUp">
      <div className="Wrapper">
        <img alt="Rocking Hand" className="Arrow" src={FreedUpImg} />
        <h2 className="Counter">{this.props.amount.toLocaleString('en')}</h2>
        <p className="Label">
          Parking spaces <br /> could be freed up.
        </p>
        <img alt="Illustration Rocks Icon" src={IllustrationRocks} />
      </div>
      <style jsx>{`
        .FreedUp {
          background: #FEBD99;
          color: ${COLORS.ColorBlue};
          text-align: center;
        }

        .Wrapper {
          width: 1280px;
          margin: 0 auto;
          padding: 150px 160px 60px 160px;
          position: relative;
        }

        .Counter {
          font-family: 'Circular';
          font-size: 80px;
          font-weight: 500;
          margin: 0;
        }

        .Label {
          font-size: 50px;
          margin: 0;
          margin-top: 30px;
          margin-bottom: 30px;
        }

        .Arrow {
          position: absolute;
          top: -70px;
          right: 290px;
        }
      `}</style>
    </section>
  )

}

export default FreedUp;
