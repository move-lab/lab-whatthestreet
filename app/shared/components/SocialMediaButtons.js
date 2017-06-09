import React from 'react';

import SocialMediaButton from './SocialMediaButton';

class SocialMediaButtons extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="List">
        <SocialMediaButton provider="twitter" icon="Icon_Social_Twitter" />
        <SocialMediaButton provider="facebook" icon="Icon_Social_Facebook" />
        <style jsx>{`
          .List {
            display: flex;
          }
        `}</style>
      </div>
    );
  }
}

export default SocialMediaButtons;
