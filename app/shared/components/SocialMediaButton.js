import React from 'react';

// Images
const FacebookIcon = '/static/icons/Icon_Social_Facebook.svg';
const TwitterIcon = '/static/icons/Icon_Social_Twitter.svg';

class SocialMediaButton extends React.PureComponent {

  static propTypes = {
    provider: React.PropTypes.string,
  };

  constructor() {
    super();
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  onButtonPress() {
    const url = (this.props.provider === 'facebook') ? 'http://facebook.com/moovel' : 'http://twitter.com/moovelLab';
    window.open(url);
  }

  renderIcon = (provider) => {
    switch (provider.toLowerCase()) {
      case 'facebook':
        return (<img alt="FacebookIcon" src={FacebookIcon} />);
      case 'twitter':
        return (<img alt="TwitterIcon" src={TwitterIcon} />);
      default:
        return (<img alt="FacebookIcon" src={FacebookIcon} />);
    }
  }

  render() {
    return (
      <button className="Button" onClick={this.onButtonPress}>
        { this.renderIcon(this.props.provider) }
        <style jsx>{`
          .Button {
            list-style: none;
            cursor: pointer;
          }

          .Button:hover,.Button:focus,.Button:active {
            opacity: 0.5;
          }
        `}</style>
      </button>
    );
  }
}

export default SocialMediaButton;
