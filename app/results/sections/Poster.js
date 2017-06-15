import React from 'react';

import RoundedButton from '../../shared/components/RoundedButton';

import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';

class PosterSection extends React.PureComponent {
  
  constructor(props) {
    super(props);
    this.goToPosterShop = this.goToPosterShop.bind(this)
  }

  goToPosterShop() {
    window.open("https://www.redbubble.com", "_blank");
  }

  renderShoppingBtn() {
    return (
      <div className="BtnShopping"
        onClick={this.goToPosterShop}
      >
          <img src="/static/icons/Icon_ShoppingCart.svg" />
      </div>
    )
  }

  render() {
    return (
      <div className="PosterSection">
        <div className="Wrapper">
          <h2 className="Title">
            Abstract Art for your Wall
          </h2>
          <div className="Content">
            <div className="Left">
              <div 
                className="Poster BigPoster"
                onClick={this.goToPosterShop}
              >
                <img src="/static/poster/example.png" />
                {this.renderShoppingBtn()}
              </div>
            </div>
            <div className="Right">
              <div className="PosterGroup">
                <div
                  className="Poster SmallPoster Left"
                  onClick={this.goToPosterShop}
                >
                  <img src="/static/poster/example.png" />
                  {this.renderShoppingBtn()}
                </div>
                <div
                  className="Poster SmallPoster Right"
                  onClick={this.goToPosterShop}
                >
                  <img src="/static/poster/example.png" />
                  {this.renderShoppingBtn()}
                </div>
              </div>
              <div className="CTAWrapper">
                <div className="Text">
                  We teamed up with RedBubble to bring the fight of cities' mobility modes to your living room
                </div>
                <RoundedButton
                  onClick={this.goToPosterShop}
                >
                 More posters
                </RoundedButton>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .PosterSection {
            background-color: white;
            color: ${COLORS.ColorForegroundText};
            display: flex;
            justify-content: center;
          }

          .Wrapper {
            width: ${METRICS.MetricsContentWidth};
            padding: ${METRICS.MetricsContentPadding};
            display: flex;
            flex-direction: column;
          }

          .Title {
            font-size: 47px;
            line-height: 47px;
            font-weight: 400;
            margin: 0;
            width: 350px;
          }

          .CTAWrapper {
            margin-top: 80px;
          }

          .Text {
            margin-bottom: 30px;
            font-size: 21px;
            line-height: 27px;
            margin: 0 0 30px 0;
          }

          .Content {
            display: flex;
            flex-direction: row;
          }

          .Poster {
            margin-right: 80px;
            position: relative;
            cursor: pointer;
          }

          .Poster:hover,.Poster:active,.Poster:focus {
            opacity: 0.8;
          }

          .Poster img {
            width: 100%;
          }

          .PosterGroup {
            display: flex;
            flex-direction: row;
          }

          .BigPoster {
            margin-top: 120px;
            width: 320px;
            max-height: 478px;
          }

          .SmallPoster {
            width: 240px;
            max-height: 358px;
          }

          .SmallPoster.Left {
            margin-top: 50px;
          }

          .SmallPoster.Right {
            position: relative;
            top: -20px;
          }

          .SmallPoster.Right :global(.BtnShopping) {
            bottom: -10px;
          }

          :global(.BtnShopping) {
            position: absolute;
            bottom: -30px;
            right: 30px;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: ${COLORS.ColorVersusLightOrange};
            cursor: pointer;
          }

          :global(.BtnShopping:hover),:global(.BtnShopping:active),:global(.BtnShopping:focus) {
            background-color:#ff8b5c;
          }

          :global(.BtnShopping img) {
            width: 20px;
            height: 20px;
          }

        `}</style>
      </div>
    );
  }
}

export default PosterSection;
