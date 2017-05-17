import React from 'react';

class Loader extends React.PureComponent {

  render = () => (
    <div className="Wrapper">
      <div className="Loader"></div>
      <style jsx>{`
        .Loader {
          border: 10px solid #f3f3f3;
          border-top: 10px solid blue;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          animation: spin 2s linear infinite;
          margin: 0 auto;
          align-self: center;
        }

        .Wrapper {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )

}

export default Loader;
