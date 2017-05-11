import React from 'react';
import PropTypes from 'prop-types';

const bikeIcon = '/static/icons/Icon_Diagram_Bike.svg';
const tramIcon = '/static/icons/Icon_Diagram_Rail.svg';
const carIcon = '/static/icons/Icon_Diagram_Car.svg';

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
        width={this.props.width}
        height={this.props.height} 
      />
    );
  }
}

export default VehicleIcon;
