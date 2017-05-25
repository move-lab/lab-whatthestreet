import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import Footer from './sections/Footer';

class ResultsPage extends Component {

  render() {
    return (
      <div>
        <Footer />
      </div>
    );
  }
}

export default ResultsPage
