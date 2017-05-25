import React from 'react';

class FooterNavLink extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    name: React.PropTypes.string,
    link: React.PropTypes.string,
    onClick: React.PropTypes.func,
  }

  render() {
    let Link;

    if (this.props.onClick) {
      Link = (
        <a className="Link" href={this.props.link}>
          {this.props.name}
        </a>
      );
    } else {
      Link = (
        <button onClick={() => this.props.onClick()} className="Link">
          {this.props.name}
        </button>
      );
    }

    return Link;
  }
}

export default FooterNavLink;
