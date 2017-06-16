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

  componentDidMount() {
    require('smoothscroll-polyfill').polyfill();
  }

  render() {
    return (
      <div>
        <Head>
          <title>What the Street!? - moovel lab</title>
          <meta charset='utf-8' />
          <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" />
          <meta name="description" content="Who owns the city? Explore the distribution of mobility space amongst urban traffic. Discover every parking lot or street of 23 metropolises." />
          <link rel="apple-touch-icon" href="/static/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" href="/static/favicon/favicon.png" />
          <meta property="og:title" content="What the Street!? - moovel lab" />
          <meta property="og:url" content="http://whatthestreet.moovellab.com" />
          <meta property="og:image" content="http://whatthestreet.moovellab.com/static/images/wts-meta@2x.png" />
          <meta property="og:description" content="Who owns the city? Explore the distribution of mobility space amongst urban traffic. Discover every parking lot or street of 23 metropolises." />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="moovel lab" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@moovelLab" />
          <meta name="twitter:title" content="What the Street!? - moovel lab" />
          <meta name="twitter:description" content="Who owns the city? Explore the distribution of mobility space amongst urban traffic. Discover every parking lot or street of 23 metropolises." />
          <meta name="twitter:image" content="http://whatthestreet.moovellab.com/static/images/wts-meta@2x.png" />
        </Head>
        <div className="desktop">
          {this.props.children}
        </div>
        <div className="mobile">
          What the Street!? is unfortunately not working in this resolution 😢. Sorry! Please visit us again with your desktop browser or increase your window size (min. 1280px).
        </div>
        <style jsx global>{`
          .desktop {
            display: block;
          }

          .mobile {
            display: none;
            padding: 50px;
            text-align: center;
          }
          @media screen and (max-width: 1279px) {
            .desktop {
              display: none;
            }

            .mobile {
              display: block;
            }
          }
          @font-face {
            font-family: 'Larsseit';
            src: url('/static/fonts/Larsseit/Larsseit-Medium.eot');
            src: url('/static/fonts/Larsseit/Larsseit-Medium.ttf');
            src: url('/static/fonts/Larsseit/Larsseit-Medium.woff');
            src: url('/static/fonts/Larsseit/Larsseit-Medium.woff2');
            font-weight: 500;
          }

          @font-face {
            font-family: 'Larsseit';
            src: url('/static/fonts/Larsseit/Larsseit-Light.eot');
            src: url('/static/fonts/Larsseit/Larsseit-Light.ttf');
            src: url('/static/fonts/Larsseit/Larsseit-Light.woff');
            src: url('/static/fonts/Larsseit/Larsseit-Light.woff2');
            font-weight: 300;
          }

          @font-face {
            font-family: 'Sign-Painter';
            src: url('/static/fonts/Sign_Painter_House_Brush/SignPainter_HouseBrush.ttf');
          }

          @font-face {
            font-family: 'Circular';
            src: url('/static/fonts/Circular/CircularStd-Medium.otf');
          }

          progress,sub,sup{vertical-align:baseline}button,hr,input{overflow:visible}[type=checkbox],[type=radio],legend{padding:0}[aria-disabled],html{cursor:default} figcaption, menu,article,aside,details,figure,footer,header,main,nav,section,summary{display:block}audio,canvas,progress,video{display:inline-block}audio:not([controls]){display:none;height:0} [hidden],template{display:none}*,::after,::before{background-repeat:no-repeat;box-sizing:inherit}::after,::before{text-decoration:inherit;vertical-align:inherit}html{box-sizing:border-box;font-family:sans-serif;line-height:1.5;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}h1{font-size:2em;margin:.67em 0}code,kbd,pre,samp{font-family:monospace,monospace;font-size:1em}small,sub,sup{font-size:83.3333%}hr{height:0}nav ol,nav ul{list-style:none}abbr[title]{border-bottom:1px dotted;text-decoration:none}b,strong{font-weight:bolder}dfn{font-style:italic}mark{background-color:#ff0;color:#000}sub,sup{line-height:0;position:relative}sub{bottom:-.25em}sup{top:-.5em}::-moz-selection{background-color:#b3d4fc;color:#000;text-shadow:none}::selection{background-color:#b3d4fc;color:#000;text-shadow:none}audio,canvas,iframe,img,svg,video{vertical-align:middle}img{border-style:none}svg{fill:currentColor}svg:not(:root){overflow:hidden}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:hover{outline-width:0}table{border-collapse:collapse;border-spacing:0}button,input,select,textarea{background-color:transparent;border-style:none;color:inherit;font-size:1em;margin:0}button,input{}button,select{text-transform:none}[type=submit], [type=reset],button,html [type=button]{-webkit-appearance:button}::-moz-focus-inner{border-style:none;padding:0}:-moz-focusring{outline:ButtonText dotted 1px}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{display:table;max-width:100%;white-space:normal}textarea{overflow:auto;resize:vertical}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-cancel-button,::-webkit-search-decoration{-webkit-appearance:none}::-webkit-input-placeholder{color:inherit;opacity:.54}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}[aria-busy=true]{cursor:progress}[aria-controls]{cursor:pointer}[tabindex],a,area,button,input,label,select,textarea{-ms-touch-action:manipulation;touch-action:manipulation}[hidden][aria-hidden=false]{clip:rect(0,0,0,0);display:inherit;position:absolute}[hidden][aria-hidden=false]:focus{clip:auto}

          html, body {
            min-height: 100%;
            width: 100%;
          }

          * {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            outline: none;
          }


          body {
            font-family: "Larsseit", sans-serif;
            color: ${COLORS.ColorForegroundText};
            line-height: 1;
            font-weight: 300;
          }

          button {
            font-family: "Larsseit", sans-serif;
            cursor: pointer;
          }

          h1 {
            margin: 0;
            line-height: 1em;
            font-size: 36px;
            font-weight: 500;
          }

          h2 {
            font-size: 21px;
            font-weight: 500;
          }

          h3 {
            margin-top: 0;
            font-weight: 500;
          }

          h4 {
            font-weight: 500;
          }

          a,a:visited {
            color: ${COLORS.ColorForegroundText};
          }
        `}</style>
      </div>
    )
  }
}

export default Layout;
