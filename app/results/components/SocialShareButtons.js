import React from 'react';

const FacebookIcon = '/static/icons/Icon_Social_Facebook.svg';
const TwitterIcon = '/static/icons/Icon_Social_Twitter.svg';

class SocialShareButtons extends React.PureComponent {

  static propTypes = {
    result: React.PropTypes.string,
    suggestion: React.PropTypes.string,
  }

  twitterUrl(result) {
    let text = '';
    switch (result) {
      case 'good':
        text = 'I am a mobility expert 😀';
        break;
      case 'average':
        text = `I should move to ${this.props.suggestion} 🙃`;
        break;
      case 'bad':
        text = `I should move to ${this.props.suggestion} 🙃`;
        break;
      default:
        text = 'I am a mobility expert 😀';
        break;
    }
    text += ' … according to ';
    const website = 'https://whatthestreet.moovellab.com';

    return `https://twitter.com/intent/tweet?text=${encodeURI(text)}&url=${encodeURI(website)}`;
  }

  facebookUrl(result) {
    let text = '';
    switch (result) {
      case 'good':
        text = 'I am a mobility expert :-)';
        break;
      case 'bad':
        text = `I should move to ${this.props.suggestion} (-:`;
        break;
      default:
        text = 'I am a mobility expert :-)';
        break;
    }
    text += ' … according to ';
    const website = 'https://whatthestreet.moovellab.com';

    return `https://www.facebook.com/sharer.php?u=${encodeURI(website)}`;
  }

  render() {
    return (
      <div className="List">
        <a className="Button" href={this.facebookUrl(this.props.result)} target="_blank"><img alt="FacebookIcon" src={FacebookIcon} /></a>
        <a className="Button" href={this.twitterUrl(this.props.result)} target="_blank"><img alt="TwitterIcon" src={TwitterIcon} /></a>
        <style jsx>{`
          .List {
            display: flex;
            margin-bottom: 10px;
          }

          .Button {
            list-style: none;
            cursor: pointer;
            padding: 0 5px 0 0;
          }

          .Button:hover,.Button:focus,.Button:active {
            opacity: 0.5;
          }
        `}</style>
      </div>
    );
  }
}

export default SocialShareButtons;
