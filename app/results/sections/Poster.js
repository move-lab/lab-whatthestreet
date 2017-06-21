import React from 'react';
import sample from 'lodash.sample';

import RoundedButton from '../../shared/components/RoundedButton';

import * as COLORS from '../../shared/style/colors';
import * as METRICS from '../../shared/style/metrics';

class PosterSection extends React.PureComponent {
  
  constructor(props) {
    super(props);
    this.goToPosterShop = this.goToPosterShop.bind(this);

    this.state = {
      posters: [{
        city: "berlin",
        shopLink: "https://www.redbubble.com/people/moovel/works/26889657-what-the-street-berlin"
      },
      {
        city: "tokyo",
        shopLink: "https://www.redbubble.com/people/moovel/works/26889136-what-the-street-tokyo"
      },
      {
        city: "amsterdam",
        shopLink: "https://www.redbubble.com/people/moovel/works/26888779-what-the-street-amsterdam"
      },
      {
        city: "beijing",
        shopLink: "https://www.redbubble.com/people/moovel/works/26888850-what-the-street-beijing"
      },
      {
        city: "boston",
        shopLink: "https://www.redbubble.com/people/moovel/works/26888898-what-the-street-boston"
      },
      {
        city: "budapest",
        shopLink: "https://www.redbubble.com/people/moovel/works/26889010-what-the-street-budapest"
      },
      {
        city: "copenhagen",
        shopLink: "https://www.redbubble.com/people/moovel/works/26889042-what-the-street-copenhagen"
      },
      {
        city: "stuttgart",
        shopLink: "https://www.redbubble.com/people/moovel/works/26889190-what-the-street-stuttgart"
      },
      {
        city: "hongkong",
        shopLink: "https://www.redbubble.com/people/moovel/works/26889190-what-the-street-stuttgart"
      },
      {
        city: "rome",
        shopLink: "https://www.redbubble.com/people/moovel/works/26889243-what-the-street-rome"
      }
      ]
    }
  }

  goToPosterShop() {
    window.open("https://www.redbubble.com/fr/people/moovel/shop", "_blank");
  }

  goToPosterShopItem(shopLink) {
    window.open(shopLink, "_blank");
  }

  renderShoppingBtn(shopLink) {
    return (
      <div className="BtnShopping"
        onClick={() => this.goToPosterShopItem(shopLink)}
      >
          <img src="/static/icons/Icon_ShoppingCart.svg" />
      </div>
    )
  }

  renderPoster(posterData, classPosition) {
    return (
      <div 
        className={`Poster ${classPosition}`}
        onClick={() => this.goToPosterShopItem(posterData.shopLink)}
      >
        <img src={`/static/poster/WTS_${posterData.city}.jpeg`} />
        {this.renderShoppingBtn(posterData.shopLink)}
      </div>
    )
  }

  render() {
    return (
      <div className="PosterSection">
        <div className="Wrapper">
          <h2 className="Title">
            Abstract art for your wall
          </h2>
          <div className="Content">
            <div className="Left">
              {this.renderPoster(sample(this.state.posters), "BigPoster")}
            </div>
            <div className="Right">
              <div className="PosterGroup">
                {this.renderPoster(sample(this.state.posters), "SmallPoster Left")}
                {this.renderPoster(sample(this.state.posters), "SmallPoster Right")}
              </div>
              <div className="CTAWrapper">
                <div className="Text">
                  Get posters of your favorite cities' mobility patterns for your living room!
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

          .Wrapper :global(.Poster) {
            margin-right: 80px;
            position: relative;
            cursor: pointer;
          }

          .Wrapper :global(.Poster:hover,.Poster:active,.Poster:focus) {
            opacity: 0.8;
          }

          .Wrapper :global(.Poster img) {
            width: 100%;
          }

          .PosterGroup {
            display: flex;
            flex-direction: row;
          }

          .Wrapper :global(.BigPoster) {
            margin-top: 120px;
            width: 320px;
            max-height: 478px;
          }

          .Wrapper :global(.SmallPoster) {
            width: 240px;
            max-height: 358px;
          }

          .Wrapper :global(.SmallPoster.Left) {
            margin-top: 50px;
          }

          .Wrapper :global(.SmallPoster.Right) {
            position: relative;
            top: -20px;
          }

          .Wrapper :global(.SmallPoster.Right) :global(.BtnShopping) {
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
            background-color: ${COLORS.ColorBlue};
            cursor: pointer;
          }

          :global(.BtnShopping:hover),:global(.BtnShopping:active),:global(.BtnShopping:focus) {
            background-color: ${COLORS.ButtonBackgroundColorDarker};
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
