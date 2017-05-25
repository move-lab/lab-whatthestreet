import React from 'react';

import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';

class AboutSection extends React.PureComponent {

  render() {
    return (
      <div className="AboutSection">
        <div className="Wrapper">
          <h2 className="Title">
            About
          </h2>
          <div className="Container">
            <p className="Text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis risus sagittis mauris scelerisque ullamcorper. Etiam egestas lacus massa, non luctus tellus dictum non.
            </p>
            <p className="Text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lobortis risus sagittis mauris scelerisque ullamcorper. Etiam egestas lacus massa, non luctus tellus dictum non.
            </p>
          </div>
        </div>
        <style jsx>{`
          .AboutSection {
            background-color: ${COLORS.AboutSectionBackgroundColor};
            color: ${COLORS.ColorForegroundText};
            display: flex;
            justify-content: center;
          }

          .Wrapper {
            width: ${METRICS.MetricsContentWidth};
            padding: ${METRICS.MetricsContentPadding};
            display: flex;
          }

          .Container {
            flex-basis: 66.666666%;
          }

          .Title {
            font-size: 47px;
            line-height: 47px;
            font-weight: 400;
            margin: 0;
            flex-basis: 33.333333%;
          }

          .Text {
            font-size: 21px;
            line-height: 27px;
            margin: 0 0 30px 0;
            font-family: 'LarsseitLight';
          }

          .Text:last-child {
            margin: 0;
          }

        `}</style>
      </div>
    );
  }
}

export default AboutSection;
