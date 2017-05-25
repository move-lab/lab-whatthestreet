import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import OtherCities from './sections/OtherCities';
import About from './sections/About';
import Legal from './sections/Legal';
import Footer from './sections/Footer';

class ResultsPage extends Component {

  render() {
    return (
      <div>
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
