import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import Loader from '../shared/components/Loader';
import MapInfoBox from './components/MapInfoBox';

let Map;

class MapModal extends Component {

  static propTypes = {
    onDismiss: React.PropTypes.func,
    citySlug: React.PropTypes.string,
    activeVehicle: React.PropTypes.string,
    ownGuess: React.PropTypes.object
  }

  constructor () {
    super();
    this.closeModal = this.closeModal.bind(this);
    this.state = { showMap: false };
  }

  componentDidMount() {
    // Do not render on server
    Map = require('./components/Map').default;
    this.setState({ showMap: true });
  }

  closeModal() {
    if (this.props.onDismiss) {
      this.props.onDismiss();
    } else {
      Router.push({
        pathname: '/explore',
        query: this.props.ownGuess.toJS()
      },{
        pathname: `/${this.props.citySlug}/explore/${this.props.activeVehicle}`,
        query: this.props.ownGuess.toJS()
      });
    }
  }

  render() {
    return (
      <div style={{ position: 'fixed', top:0, bottom:0, left:0, right:0, zIndex: 20000000}}>
        <MapInfoBox
          closeModal={this.closeModal}
        />
        {!this.state.showMap &&
          <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <Loader />
          </div>
        }
        {this.state.showMap &&
          <Map />
        }
      </div>
    );
  }
}

export default connect((state) => {
  return {
    citySlug: state.city.getIn(['actual_city','slug']),
    activeVehicle: state.vehicles.get('vehicle'),
    ownGuess: state.guess.get('own')
  }
})(MapModal);
