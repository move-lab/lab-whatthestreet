import React from 'react';

class FooterNavLink extends React.PureComponent {

  static propTypes = {
    name: React.PropTypes.string,
    link: React.PropTypes.string
  }

  render() {
    return (
      <a className="Link" href={this.props.link}>
        {this.props.name}
      </a>
    );
  }
}

export default FooterNavLink;
