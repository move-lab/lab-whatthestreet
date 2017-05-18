import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _findIndex from 'lodash.findindex';

// Styles
import * as METRICS from '../../shared/style/metrics';
import * as COLORS from '../../shared/style/colors';

// Components
import Loader from '../../shared/components/Loader';

class Lanes extends React.Component {

  static propTypes = {
    vehicle: React.PropTypes.string,
    city: React.PropTypes.string,
    baseUrl: React.PropTypes.string,
    onItemSelected: React.PropTypes.func,
    onLoaded: React.PropTypes.func,
    onLaneSelected: React.PropTypes.func,
    onPathClicked: React.PropTypes.func,
    registerItemsForSearch: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    
    this.state = {
      svg: '',
      lastIndex: 0,
      loading: true,
      pathsHasHandler: false,
    };
    
    this.initialize();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.svg) {
      this.activatePath(nextProps.active);
    } else if (!this.state.svg) {
      this.entry(true, nextProps);
    }

    if (!this.state.loading) {
      this.doesScroll(nextProps.scrollPosition);
    }
  }

  onPathSelected(path) {
    this.props.onLaneSelected(this.getPathData(path))
  }

  getPathData = (path) => {
    // This might cause perf issue as we are reading from the dom
    const absoluteX = this.element.childNodes[this.svgNodeIndex].getBBox().x + this.element.getBoundingClientRect().left;
    const absoluteY = this.element.childNodes[this.svgNodeIndex].getBBox().y + (this.element.getBoundingClientRect().top - 2);

    return ({
      id: parseInt(path.getAttribute('id'), 10),
      neighborhood: path.getAttribute('moovel_neighborhood'),
      name: path.getAttribute('moovel_name'),
      area: path.getAttribute('moovel_area'),
      length: path.getAttribute('moovel_length'),
      coordinates: { x: absoluteX, y: absoluteY },
    });
  }

  getSvg(city, vehicle) {
    const requestURL = `${this.props.baseUrl}/static/cities/${city}/lanes/${vehicle}.svg`;
    this.setState({ loading: true });
    return axios.get(requestURL);
  }

  entry(load, props = this.props) {
    if (this.state.svg) {
      this.activatePath(props.active);
    } else if (load && !this.state.svg) {
      this.initialize();
    }
  }

  initialize() {
    const self = this;
    this.getSvg(this.props.city, this.props.vehicle).then((response) => {
      this.setState({ svg: response.data, loading: false });
      this.reducedPathData = this.reducePathData();
      this.addClickHandler();
      this.props.onLoaded();
    }, (error) => { window.console.log(error); });
  }

  addClickHandler() {
    const paths = this.element.childNodes[this.svgNodeIndex].getElementsByTagName('path');
    for (let i = 0; i < paths.length; i += 1) {
      paths[i].addEventListener('click', (e) => this.pathClicked(e));
    }
  }

  pathClicked(event) {
    this.props.onPathClicked(this.getPathData(event.target), event);
  }

  reducePathData() {
    const paths = this.element.childNodes[this.svgNodeIndex].getElementsByTagName('path');

    const searchableItems = [];
    const importantPaths = [];

    for (let i = 0; i < paths.length; i += 1) {
      const path = paths[i];
      const coordinates = path.getBBox();
      searchableItems.push({ id: path.getAttribute('id'), name: path.getAttribute('moovel_name'), coordinates: { minY: coordinates.y, maxY: coordinates.y + coordinates.height } });
      importantPaths.push({ id: path.getAttribute('id'), coordinates: { minY: coordinates.y, maxY: coordinates.y + coordinates.height } });
    }

    this.props.registerItemsForSearch(searchableItems);
    return importantPaths;
  }

  doesScroll(lastKnownScrollPosition) {
    const ST = lastKnownScrollPosition;
    let activePath = this.reducedPathData.find((item) => {
      return isInRange(item.coordinates.minY, item.coordinates.maxY, ST)
    });

    if (activePath) {
      this.props.onItemSelected();
      this.activatePath(activePath.id);
    }
  }

  activatePath(index = 0) {
    if (!this.state.loading) {
      const svgElement = this.element.childNodes[this.svgNodeIndex].getElementById(index);

      if (this.state.lastIndex) this.element.childNodes[this.svgNodeIndex].getElementById(this.state.lastIndex).style.stroke = '';

      // This super costly because it cause a repaint of everything
      // Maybe avoid triggering it when scrolling super fast
      if (svgElement) svgElement.style.stroke = COLORS.ColorForegroundOrange;

      if (svgElement !== null) this.onPathSelected(svgElement);

      this.setState({ lastIndex: index });
    }
  }

  renderSvg(svgString) {
    return { __html: svgString };
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        {!this.state.loading &&
          <div
            className="LanesSvg"
            ref={(element) => {
              this.element = element;
              if(this.element) this.svgNodeIndex = _findIndex(this.element.childNodes, { nodeName: 'svg'});
            }}
            dangerouslySetInnerHTML={this.renderSvg(this.state.svg)}
          />
        }
        {this.state.loading &&
          <Loader />
        }
        <style jsx>{`
          .LanesSvg {
            position: relative;
            overflow: hidden;
            width: 600px;
          }

          .LanesSvg :global(svg) :global(path) {
            stroke: ${COLORS.pathcolor};
            transition: 200ms all;
            cursor: pointer;
          }

          .LanesSvg :global(svg) :global(path):hover {
            stroke: rgba(255, 104, 25, 0.8);
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
})(Lanes);
