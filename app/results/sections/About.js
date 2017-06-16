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
              What the Street!? was derived out of the question “How do new and old mobility concepts change our cities?”. It was raised by Michael Szell and Stephan Bogner during their residency at moovel lab. With support of the lab team they set out to wrangle data of cities around the world to develop and design this unique Mobility Space Report.
            </p>
            <p className="Text">
              What the Street!? was made out of open-source software and resources. Thanks to the OpenStreetMap contributors and many other pieces we put together the puzzle of urban mobility space seen above.
            </p>
            <p className="Text">
              Read more about the technical details behind The Mobility Space Report: What the Street!? on our blog:
            </p>
            <p className="Text">
              <a href="http://lab.moovel.com/blog/about-what-the-street" target="_blank">http://lab.moovel.com/blog/about-what-the-street</a>
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
            font-weight: 500;
            margin: 0;
            flex-basis: 33.333333%;
          }

          .Text {
            font-size: 21px;
            line-height: 27px;
            margin: 0 0 30px 0;
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
