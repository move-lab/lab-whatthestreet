import React from 'react';

class CitizenOwnershipTableRow extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    name: React.PropTypes.string,
    amount: React.PropTypes.number,
    unit: React.PropTypes.string,
  }

  render() {
    return (
      <tr>
        <td className="ColName">
          {this.props.name}
        </td>
        <td className="ColAmount">
          <span className="Amount">{this.props.amount.toString().includes('.') ? this.props.amount : `${this.props.amount}.0`}</span> {this.props.unit}
        </td>
        <style jsx>{`
          .ColName {
            font-size: 30px;
            line-height: 51px;
          }

          .ColAmount {
            text-align: right;
            font-size: 24px;
            line-height: 51px;
          }

          .Amount {
            font-family: 'Circular';
          }
        `}</style>
      </tr>
    );
  }
}

export default CitizenOwnershipTableRow;
