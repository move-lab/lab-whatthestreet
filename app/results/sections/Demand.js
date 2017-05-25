import React from 'react';

const CatImage = '/static/images/Illustration_Cat@2x.png';

import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';

class Demand extends React.PureComponent {

  render() {
    return (
      <section className="DemandSection">
        <div className="Wrapper">
          <h2 className="Title">
            Demand<br />better mobility
          </h2>
          <p className="Text">
            You can change how your city looks by your everyday transportation decisions. Citizen demand, urban policy and planning, and innovative design and services can transform how your get from A to B.
          </p>
          <p className="Text">
            You are never stuck in traffic — you are part of it.
          </p>
          <img className="Image" alt="Cat" src={CatImage} />
        </div>
        <style jsx>{`
          .DemandSection {
            background-color: ${COLORS.DemandSectionBackgroundColor};
            color: ${COLORS.ColorForegroundText};
          }

          .Wrapper {
            margin: 0 auto;
            width: ${METRICS.MetricsContentWidth};
            padding-left: ${METRICS.MetricsContentPadding};
            padding-right: ${METRICS.MetricsContentPadding};
            padding-top: ${METRICS.MetricsSectionPadding};
          }

          .Title {
            font-size: 47px;
            line-height: 56px;
            font-weight: 400;
            width: 320px;
            margin: 0 0 ${METRICS.MetricsSectionPadding} 0;
          }

          .Text {
            font-size: 21px;
            line-height: 27px;
            margin: 0 0 25px 0;
            font-family: 'LarsseitLight';
            width: 560px;
            }

          .Image {
            width: 700px;
            display: block;
            margin: 0 auto;
          }
        `}</style>
      </section>
    );
  }
}

export default Demand;
