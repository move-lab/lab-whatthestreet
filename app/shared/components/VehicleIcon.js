import React from 'react';
import PropTypes from 'prop-types';
import { prefixURL } from '../../../utils/url';

const bikeIcon = prefixURL('/static/icons/Icon_Diagram_Bike.svg');
const tramIcon = prefixURL('/static/icons/Icon_Diagram_Rail.svg');
const carIcon = prefixURL('/static/icons/Icon_Diagram_Car.svg');

class VehicleIcon extends React.PureComponent {

  static propTypes = {
    vehicle: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  render() {
    const vehicleIcon = {
      src: bikeIcon,
      alt: 'bikeIcon',
    };

    switch (this.props.vehicle) {
      case 'car':
        vehicleIcon.src = carIcon;
        vehicleIcon.alt = 'carIcon';
        break;
      case 'rail':
        vehicleIcon.src = tramIcon;
        vehicleIcon.alt = 'tramIcon';
        break;
      case 'rails':
        vehicleIcon.src = tramIcon;
        vehicleIcon.alt = 'tramIcon';
        break;
      default:
        break;
    }

    return (
      <img
        alt={vehicleIcon.alt}
        src={vehicleIcon.src}
        className="vehicle-icon"
        width={this.props.width}
        height={this.props.height} 
      />
    );
  }
}

export default VehicleIcon;
