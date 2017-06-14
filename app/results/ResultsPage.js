import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import ResultsSection from './sections/ResultsSection';
import Stats from './sections/Stats';
import Versus from './sections/Versus';
import EyesPlaceholder from './sections/EyesPlaceholder';
import Future from './sections/Future';
import Demand from './sections/Demand';
import OtherCities from './sections/OtherCities';
import About from './sections/About';
import Legal from './sections/Legal';
import Footer from './sections/Footer';
import Poster from './sections/Poster';

class ResultsPage extends Component {

  render() {
    return (
      <div>
        <ResultsSection />
        <Stats />
        <Versus />
        <Poster />
        <EyesPlaceholder />
        <Future />
        <Demand />
        <OtherCities
          city={this.props.city}
          cities={this.props.availableCities}
        />
        <About />
        <Legal cities={this.props.availableCities} />
        <Footer />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    availableCities: state.city.get('availableCities').toJS(),
    city: state.city.get('actual_city').toJS()
  }
})(ResultsPage)
