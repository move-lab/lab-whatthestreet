import React from 'react';

import CitizenOwnershipTableRow from './CitizenOwnershipTableRow';

import * as COLORS from '../../shared/style/colors';

/**
 * Renders the citizen ownership table on stats page
 */
class CitizenOwnership extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    city: React.PropTypes.string,
    data: React.PropTypes.object,
  }

  render = () => (
    <div>
      <h2 className="Title">
        Citizen Ownership
      </h2>
      <h3 className="SubTitle">
        If every citizen of {this.props.city} would own it’s fair share of each type of mobility.
      </h3>
      <div className="Container">
        <div className="TableContainer">
          <table className="TableHalf">
            <tbody>
              <CitizenOwnershipTableRow name="Bike Lanes" amount={this.props.data.moving.bike} unit="m" />
              <CitizenOwnershipTableRow name="Rails" amount={this.props.data.moving.rails} unit="m" />
              <CitizenOwnershipTableRow name="Road" amount={this.props.data.moving.road} unit="m" />
            </tbody>
          </table>
        </div>
        <div className="TableContainer">
          <table className="TableHalf">
            <tbody>
              <CitizenOwnershipTableRow name={"Bike Parking"} amount={this.props.data.parking.bike} unit={"bike"} />
              <CitizenOwnershipTableRow name={"Rail Parking"} amount={this.props.data.parking.rails} unit={"wagons"} />
              <CitizenOwnershipTableRow name={"Car Parking"} amount={this.props.data.parking.road} unit={"car"} />
            </tbody>
          </table>
        </div>
      </div>
      <style jsx>{`
        .Title {
          font-size: 40px;
          line-height: 50px;
          font-weight: 500;
          color: white;
          margin: 0;
        }

        .SubTitle {
          font-size: 21px;
          line-height: 27px;
          color: white;
          margin: 0 0 15px 0;
        }

        .Container {
          display: flex;
          justify-content: space-between;
        }

        .TableContainer {
          width: calc(50% - 40px);
          color: white;
          border-top: 1px solid ${COLORS.ColorLightYellow};
          padding-top: 10px;
        }

        .TableHalf {
          width: 100%;
          color: white;
        }
      `}</style>
    </div>
  )
}
export default CitizenOwnership;
