import React, { Component } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

import * as METRICS from '../style/metrics';
import * as COLORS from '../style/colors';

class Layout extends Component {

  static propTypes = {
     title: PropTypes.string
  }

  static defaultProps = {
    title: 'What the Street!?'
  }

  render() {
    return (
      <div>
        <Head>
          <title>Moovel Lab | {this.props.title}</title>
          <meta charset='utf-8' />
          <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/10up-sanitize.css/4.1.0/sanitize.min.css"/>
        </Head>
        {this.props.children}
        <style jsx>{`
          @font-face {
            font-family: 'LarsseitMedium';
            src: url('/static/fonts/Larsseit/Larsseit-Medium.eot');
            src: url('/static/fonts/Larsseit/Larsseit-Medium.ttf');
            src: url('/static/fonts/Larsseit/Larsseit-Medium.woff');
            src: url('/static/fonts/Larsseit/Larsseit-Medium.woff2');
          }

            @font-face {
            font-family: 'LarsseitLight';
            src: url('/static/fonts/Larsseit/Larsseit-Light.eot');
            src: url('/static/fonts/Larsseit/Larsseit-Light.woff');
            src: url('/static/fonts/Larsseit/Larsseit-Light.woff2');
          }

          @font-face {
            font-family: 'Sign-Painter';
            src: url('/static/fonts/Sign_Painter_House_Brush/SignPainter_HouseBrush.ttf');
          }

          @font-face {
            font-family: 'Circular';
            src: url('/static/fonts/Circular/CircularStd-Medium.otf');
          }

          html, body {
            height: 100%;
            width: 100%;
          }

          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            outline: none;
          }


          body {
            font-family: 'Larsseit', 'Helvetica Neue', Helvetica, Arial, sans-serif;
            color: ${COLORS.Color_Foreground_Text};
            line-height: 1;
          }

          h1 {
            margin: 0;
            line-height: 1em;
            font-size: 36px;
          }

          h2 {
            font-size: 21px;
            font-weight: 200;
          }

          h3 {
            margin-top: 0;
          }

          body.fontLoaded {
            font-family: 'Larsseit', 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
          }

          #app {
            background-color: #fafafa;
            min-height: 100%;
            min-width: 100%;
          }
        `}</style>
      </div>
    )
  }
}

export default Layout;
