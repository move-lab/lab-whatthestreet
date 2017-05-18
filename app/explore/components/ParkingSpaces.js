import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _findIndex from 'lodash.findindex';

// Styles
import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';

// Components
import Loader from '../../shared/components/Loader';

class ParkingSpaces extends React.Component {

  static propTypes = {
    vehicle: React.PropTypes.string,
    city: React.PropTypes.string,
    polygonSelected: React.PropTypes.func,
    onItemSelected: React.PropTypes.func,
    onLoaded: React.PropTypes.func,
    scrollParent: React.PropTypes.string,
    onPathClicked: React.PropTypes.func,
    registerItemsForSearch: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      svg: '',
      lastIndex: 0,
      loading: true,
      polygonsHasHandler: false,
    };

    this.initialize();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.svg) {
      this.activatePolygon(nextProps.active);
    } else if (!this.state.svg) {
      this.entry(true, nextProps);
    }

    if (!this.state.loading) {
      this.doesScroll(nextProps.scrollPosition);
    }
  }

  getSvg(city, vehicle) {
    const requestURL = `${this.props.baseUrl}/static/cities/${city}/parking/${vehicle}.svg`;
    this.setState({ loading: true });
    return axios.get(requestURL);
  }

  getPolygonData = (polygon) => ({
    id: parseInt(polygon.getAttribute('id'), 10),
    latitude: parseFloat(polygon.getAttribute('moovel_centroidlatlon').split(',')[1]),
    longitude: parseFloat(polygon.getAttribute('moovel_centroidlatlon').split(',')[0]),
    neighborhood: polygon.getAttribute('moovel_neighborhood'),
    area: parseFloat(polygon.getAttribute('moovel_area')),
    rotation: parseInt(polygon.getAttribute('moovel_rot'), 10),
    center: polygon.getAttribute('moovel_centroidlatlon').split(',').map((item) => (parseFloat(item))),
    coordinates: polygon.getAttribute('moovel_pointslatlon').split(' ').map((item) => (item.split(','))),
  })

  entry(load, props = this.props) {
    if (this.state.svg) {
      this.activatePolygon(props.active);
    } else if (load && !this.state.svg) {
      this.initialize();
    }
  }

  initialize() {
    const self = this;
    this.getSvg(this.props.city, this.props.vehicle).then((response) => {
      this.setState({ svg: response.data, loading: false });
      this.reducedPolygonData = this.reducePolygonData();
      this.addClickHandler();
      this.props.onLoaded();
    }, (error) => { window.console.log(error); });
  }

  addClickHandler() {
    const polygons = this.element.childNodes[this.svgNodeIndex].getElementsByTagName('polygon');
    for (let i = 0; i < polygons.length; i += 1) {
      polygons[i].addEventListener('click', (e) => this.props.onPathClicked(this.getPolygonData(e.target), e));
    }
  }

  reducePolygonData() {
    const polygons = this.element.childNodes[this.svgNodeIndex].getElementsByTagName('polygon');
    const importantPolygons = [];
    const searchableItems = [];

    for (let i = 0; i < polygons.length; i += 1) {
      const path = polygons[i];
      const coordinates = path.getBBox();

      searchableItems.push({ id: path.getAttribute('id'), name: path.getAttribute('moovel_neighborhood'), coordinates: { minY: coordinates.y, maxY: coordinates.y + coordinates.height } });

      // TODO: Evtl. sort by size and prior bigger ones
      if (coordinates.x > 150 && coordinates.width + coordinates.height > 10) importantPolygons.push({ id: path.getAttribute('id'), coordinates: { minY: coordinates.y, maxY: coordinates.y + coordinates.height } });
    }

    this.props.registerItemsForSearch(searchableItems);

    return importantPolygons;
  }

  doesScroll(lastKnownScrollPosition) {
    const ST = lastKnownScrollPosition;
    let activePolygon = this.reducedPolygonData.find((item) => {
      return isInRange(item.coordinates.minY, item.coordinates.maxY, ST)
    });

    if (activePolygon) {
      this.props.onItemSelected();
      this.activatePolygon(activePolygon.id);
    }
  }

  // polygonSelected(polygon) {
  //   this.props.polygonSelected(this.getPolygonData(polygon))
  // }

  activatePolygon(id) {
    if (!this.state.loading) {
      const svgElement = this.element.childNodes[this.svgNodeIndex].getElementById(id);

      if (this.state.lastIndex) this.element.childNodes[this.svgNodeIndex].getElementById(this.state.lastIndex).style.fill = '';
      if (svgElement) {
        svgElement.style.fill = COLORS.ColorForegroundOrange;
        // this.polygonSelected(svgElement);
      }

      this.setState({ lastIndex: id });
    }
  }

  renderSvg(svgString) { 
    return ({ __html: svgString })
  }

  render() {
    return (
      <div className="ParkingSpacesWrapper">
        {!this.state.loading &&
          <div
            className="ParkingSpacesSvg"
            ref={(element) => {
              this.element = element;
              if(this.element) this.svgNodeIndex = _findIndex(this.element.childNodes, { nodeName: 'svg'});
            }}
            id={`parkingspace-${this.props.vehicle}`}
            dangerouslySetInnerHTML={this.renderSvg(this.state.svg)}
          />
        }
        {this.state.loading &&
          <Loader />
        }
        <style jsx>{`
          .ParkingSpacesWrapper {
            position: relative;
            overflow: hidden;
            width: 600px;
          }

          .ParkingSpacesSvg {
            display : flex;
            justify-content: center;
          }

          .ParkingSpacesSvg :global(svg) :global(polygon) {
            fill: ${COLORS.pathcolor};
            color: ${COLORS.pathcolor};
            transition: 200ms all;
            cursor: pointer;
          }

          .ParkingSpacesSvg :global(svg) :global(polygon):hover {
            fill: rgba(255, 104, 25, 0.8);
          }
        `}</style>
      </div>
    )
  }
}

function isInRange(rangeMin, rangeMax, value) {
  return value > rangeMin && value < rangeMax;
}

export default connect((state) => {
  return {
    baseUrl: state.app.get('baseUrl'),
    scrollPosition: state.app.get('scrollPosition')
  }
})(ParkingSpaces);

