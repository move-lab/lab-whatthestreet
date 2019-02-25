import React from 'react';

import * as COLORS from '../../shared/style/colors';
import { prefixURL } from '../../../utils/url';

// Images
const IllustrationEyes = prefixURL('/static/images/Illustration_Eyes.svg');

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
