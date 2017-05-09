import React, { Component } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

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
        </Head>
        {this.props.children}
      </div>
    )
  }
}

export default Layout;
