import React from 'react';

// Components
import FooterNavLink from '../components/FooterNavLink';

// Images
const logoMoovelLab = '/static/icons/Logo_LabFooter.svg';

import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';


class FooterBar extends React.PureComponent {

  render = () => (
    <footer className="Footer">
      <ul className="Items">
        <li className="Item">
          <img alt="Logo Moovel Lab" src={logoMoovelLab} />
        </li>
        <li className="Item">
          <FooterNavLink link="https://twitter.com/moovelLab" name="Follow us on Twitter" />
        </li>
        <li className="Item">
          <FooterNavLink link="http://lab.moovel.com/about" name="About" />
        </li>
        <li className="Item">
          <FooterNavLink link="mailto:hello@lab.moovel.com" name="Contact" />
        </li>
        <li className="Item">
          <FooterNavLink link="https://www.moovel.com/en/DE/privacy-policy" name="Privacy Policy" />
        </li>
        <li className="Item">
          <FooterNavLink link="http://lab.moovel.com/provider" name="Company" />
        </li>
        <li className="Item">
          <FooterNavLink link="http://lab.moovel.com/jobs" name="Jobs" />
        </li>
      </ul>
      <style jsx>{`
        .Footer {
          background-color: ${COLORS.FooterBackgroundColor};
          height: ${METRICS.FooterHeight};
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .Items {
          display: flex;
          flex-basis: ${METRICS.FooterListWidth};
          flex-shrink: 0;
          list-style: none;
          justify-content: space-between;
          padding-right: ${METRICS.FooterListPaddingRight};
          color: ${COLORS.FooterColor};
        }

        .Item {
          color: inherit;
        }

        .Item a {
          color: inherit;
        }

        .Item:hover {
          text-decoration: underline;
        }

        .Item span {
          color: inherit;
          margin-right: 5px;
          font-size: 16px;
        }

        .Footer :global(.Link) {
          background-color: transparent;
          color: white;
          font-size: 16px;
          line-height: 27px;
          font-weight: 500;
          cursor: pointer;
          margin: 0;
          padding: 0;
          text-decoration: none;
          outline: none;
        }
      `}</style>
    </footer>
  )
}

export default FooterBar;
