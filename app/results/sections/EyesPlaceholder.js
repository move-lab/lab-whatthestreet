import React from 'react';

// Images
const IllustrationEyes = '/static/images/Illustration_Eyes.svg';

import * as COLORS from '../../shared/style/colors';

class EyesPlaceholder extends React.PureComponent {

  render = () => (
    <section className="EyePlaceholer">
      <img alt="Eyes" src={IllustrationEyes} />
      <style jsx>{`
        .EyePlaceholer {
          background: ${COLORS.EyePlaceholderBackgroundColor};
          width: 100%;
          padding: 100px;
          text-align: center;
        }
      `}</style>
    </section>
  )
}

export default EyesPlaceholder;
