import PropTypes from 'prop-types';
import React from 'react';

const logoResidencyProgram = '/static/icons/Logo_ResidencyProgram.svg';

import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';

class Legal extends React.Component {

  static propTypes = {
    cities: PropTypes.arrayOf(PropTypes.object),
  }

  render() {
    return (
      <div className="LegalSection">
        <div className="Wrapper">
          <div className="ContainerLeft Container">
            <h3 className="SubTitle">
              What the Street!? is the<br />outcome of the
            </h3>
            <h2 className="Title">
              <img alt="Logo of Residency Program" src={logoResidencyProgram} />
            </h2>
            <p className="Label">
              with
            </p>
            <div className="NameBox">
              <p className="Name">
                <a href="http://lab.moovel.com/people/stephan-bogner">
                  Stephan Bogner
                </a>
              </p>
              <p className="Position">
                Resident Artist
              </p>
              <p className="Name">
                <a href="http://lab.moovel.com/people/michael-szell">
                  Michael Szell
                </a>
              </p>
              <p className="Position">
                Resident Researcher
              </p>
            </div>
            <p className="Label">
              about
            </p>
            <div className="NameBox">
              <p className="Name">
                <a href="http://lab.moovel.com/residency">The Residency Program</a>
              </p>
              <p className="Name">
                <a href="http://lab.moovel.com/blog/about-what-the-street">Technical Making of What the Street!?</a>
              </p>
              <p className="Name">
                <a href="https://github.com/moovel/lab-what-the-street">Source Code</a>
              </p>
            </div>
          </div>
          <div className="ContainerRight Container">
            <p className="Label">
              Concept and Coding
            </p>
            <p className="Name">
              <a href="http://lab.moovel.com/people/michael-szell">
                Michael Szell
              </a>
            </p>
            <p className="Name">
              <a href="http://lab.moovel.com/people/stephan-bogner">
                Stephan Bogner
              </a>
            </p>
            <p className="Label">
              Direction
            </p>
            <p className="Name">
              <a href="http://lab.moovel.com/people/benedikt-gross">
                Benedikt Groß
              </a>
            </p>
            <p className="Label">
              Website Front & Backend Engineering
            </p>
            <p className="Name">
              <a href="http://thibault-durand.fr/">
                Thibault Durand
              </a>
            </p>
            <p className="Label">
              Website Implementation Assistant
            </p>
            <p className="Name">
              Tobias Lauer
            </p>
            <p className="Label">
              Visual Design
            </p>
            <p className="Name">
              <a href="https://www.anagrama.ro/">
                Anagrama
              </a>
            </p>
            <p className="Label">
              Extended Team
            </p>
            <p className="Name">
              <a href="http://lab.moovel.com/people/raphael-reimann">Raphael Reimann</a><br />
              <a href="http://lab.moovel.com/people/joey-lee">Joey Lee</a><br />
              <a href="http://lab.moovel.com/people/daniel-schmid">Daniel Schmid</a><br />
              <a href="http://lab.moovel.com/people/tilman-haeuser">Tilman Häuser</a><br />
            </p>
            <p className="Label">
              City Data Wrangling Assistant
            </p>
            <p className="Name">
              <a href="http://johanneswachs.com/">
                Johannes Wachs
              </a>
            </p>
            <p className="Label">
              Data Sources
            </p>
            <p className="Name">
              <a href="https://www.openstreetmap.org/">
                OpenStreetMap
              </a>
            </p>
            <p className="Text">
              <a href="https://www.openstreetmap.org" target="_blank">OpenStreetMap</a> is a free alternative to services like Google Maps. Please contribute, if you notice poor data quality.
            </p>
            <p className="Text">
              <a href="https://en.wikipedia.org/wiki/Modal_share" target="_blank">Modal Share</a> for {' '}
              {this.props.cities.map((city, i) => i === this.props.cities.length - 1 ? (<a href={`/${city.slug}`} key={i}>{city.name}.</a>) : (<a href={`/${city.slug}`} key={i}>{city.name}, </a>))}
            </p>
            <p className="Text">
              Emoji provided free by <a href="https://www.emojione.com/" target="_blank">EmojiOne.</a>
            </p>
          </div>
        </div>
        <style jsx>{`
          .LegalSection {
            display: flex;
            justify-content: center;
            background-color: ${COLORS.LegalsSectionBackgroundColor};
            color: ${COLORS.ColorForegroundText};
            overflow: hidden;
          }

          .Wrapper {
            width: ${METRICS.MetricsContentWidth};
            padding: 0 ${METRICS.MetricsSectionPadding};
            padding-top: ${METRICS.MetricsSectionPadding};
            display: flex;
            align-items: flex-start;
          }

          .ContainerLeft.Container {
            flex-basis: 50%;
            margin-left: 80px;
            display: flex;
            flex-wrap: wrap;
            align-items: flex-start;
            justify-content: flex-start;
          }

          .ContainerLeft .NameBox {
            width: 80%;
            margin-bottom: 55px;
          }

          .ContainerLeft .Title {
            font-size: 47px;
            font-weight: 500;
            margin: 0 0 ${METRICS.MetricsSectionPadding} 0;
            width: 100%;
          }

          .ContainerLeft .SubTitle {
            font-size: 23px;
            line-height: 27px;
            font-weight: 500;
            margin: 0;
            color: ${COLORS.ColorForegroundGrey};
            width: 100%;
            padding-left: 20%;
            margin-bottom: 15px;
          }

          .ContainerLeft .Label {
            font-size: 23px;
            line-height: 23px;
            margin: 0;
            color: ${COLORS.ColorForegroundGrey};
            width: 20%;
            text-align: right;
            padding-right: 20px;
          }

          .ContainerLeft .Position {
            font-size: 13px;
            line-height: 18px;
            margin: 0 0 10px 0;
            color: ${COLORS.ColorForegroundText};
          }

          .ContainerRight.Container {
            flex-basis: 50%;
            margin-left: 80px;
            padding: ${METRICS.MetricsSectionPadding};
            padding-bottom: 0;
            background-color: ${COLORS.ColorWhite};
          }

          .ContainerRight .Label {
            font-size: 13px;
            line-height: 18px;
            margin: 20px 0 0 0;
            color: ${COLORS.ColorForegroundGrey};
          }

          .ContainerRight .Label:first-child {
            margin: 0;
          }

          .ContainerRight .Text {
            font-size: 13px;
            line-height: 18px;
            margin: 0 0 20px 0;
            color: ${COLORS.ColorForegroundGrey};
          }

          a {
            text-decoration: none;
          }

          a:active,a:focus,a:hover {
            text-decoration: underline;
          }

          .ContainerRight .Text a:active,
          .ContainerRight .Text a:focus,
          .ContainerRight .Text a:hover,
          .ContainerRight .Text a:link,
          .ContainerRight .Text a:visited {
            color: ${COLORS.ColorBlack};
            font-weight: 500;
          }

          .Name {
            font-size: 23px;
            line-height: 27px;
            margin: 0;
            margin-bottom: 10px;
          }

        `}</style>
      </div>
    );
  }
}

export default Legal;
