import React from 'react';

// Images
const logoMoovelLab = '/static/icons/Logo_LabFooter.svg';

import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';


class FooterBar extends React.PureComponent {

  render = () => (
    <footer className="Footer">
      <div className="container">
        <div className="sctn-txt">
          <div className="row">
            <div className="col-sm-6">
              <a href="http://lab.moovel.com" target="_blank">
                <img src="/static/images/moovellab-logo.png" alt="moovel-lab" className="logo" />
              </a>
            </div>
            <div className="col-sm-3">
              <ul>
                <li><a target="_blank" href="http://lab.moovel.com/about">About</a></li>
                <li><a href="mailto:hello@lab.moovel.com">Contact</a></li>
                <li><a target="_blank" href="https://www.moovel.com/en/DE/cookies">Cookies</a></li>
              </ul>
            </div>
            <div className="col-sm-3">
              <ul>
                <li><a target="_blank" href="https://www.moovel.com/en/DE/privacy-policy">Privacy Statement</a></li>
                <li><a target="_blank" href="http://lab.moovel.com/provider">Provider</a></li>
                <li><a target="_blank" href="http://lab.moovel.com/residency">Residency</a></li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <p>
                <a href="https://twitter.com/moovelLab" target="_blank" className="icn-grp">
                  <span className="icn-grp-icn">
                    <img src="/static/images/twitter-logo.png" alt="twitter" className="icn icn-twttr-logo" />
                  </span>
                  <span className="icn-grp-lbl alt">Follow us on Twitter</span>
                </a>
              </p>
              <p className="reversed">
                <small>© {new Date().getFullYear()} moovel Group GmbH — All rights reversed</small>
              </p>	
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .Footer {
          background-color: #00b7bf;
          color: #fff;
        }

        .sctn-txt {
          padding: 60px 120px;
        }

        .sctn-txt a {
          text-decoration: none;
          color: #fff;
          cursor: pointer;
        }

        .sctn-txt a:hover {
          text-decoration: underline
        }

        .icn-grp {
          position: relative;
          padding: 5px 0 5px 35px;
          font-size: 20px;
          line-height: 1.3em;
        }

        .icn-twttr-logo {
          max-width: 25px
        }

        .icn-grp-icn {
          -moz-transform: translate(0, -50%);
          -o-transform: translate(0, -50%);
          -ms-transform: translate(0, -50%);
          -webkit-transform: translate(0, -50%);
          transform: translate(0, -50%);
          left: 0;
          top: 50%;
          position: absolute;
          display: block
        }

        .logo {
          max-width: 180px;
          margin-bottom: 20px;
        }

        .row {
          display: flex;
        }

        .col-sm-6 {
          width: 50%;
        }

        .col-sm-3 {
          width: 25%;
        }

        .container {
          width: 1100px;
          margin: auto;
        }

        ul {
          padding: 0;
          margin: 0 0 20px 0;
        }

        li {
          list-style: none;
          font-size: 18px;
          line-height: 1.3em;
        }
      `}</style>
    </footer>
  )
}

export default FooterBar;
