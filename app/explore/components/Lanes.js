import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import _find from 'lodash.find';

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
    onPathSelected: React.PropTypes.func,
    onPathClicked: React.PropTypes.func,
    registerItemsForSearch: React.PropTypes.func,
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

  componentWillReceiveProps(props) {
    if (this.state.svg) {
      this.activatePath(props.active);
    } else if (!this.state.svg) {
      this.entry(true, props);
    }
  }

  onPathSelected(path) {
    this.props.onPathSelected(this.getPathData(path))
  }

  getPathData = (path) => {
    const svgNode = _find(this.element.childNodes, { nodeName: 'svg'});
    const absoluteX = svgNode.getBBox().x + this.element.getBoundingClientRect().left;
    const absoluteY = svgNode.getBBox().y + (this.element.getBoundingClientRect().top - 2);

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
    this.getSvg(this.props.city, this.props.vehicle).then((response) => {
      this.setState({ svg: response.data, loading: false });
      this.reducedPathData = this.reducePathData();
      this.addClickHandler();
      // registerScrollEventsToElement(document.getElementById(this.props.scrollParent), this.doesScroll);
      this.props.onLoaded();
    }, (error) => { window.console.log(error); });
  }

  addClickHandler() {
    const paths = _find(this.element.childNodes, { nodeName: 'svg'}).getElementsByTagName('path');
    for (let i = 0; i < paths.length; i += 1) {
      paths[i].addEventListener('click', (e) => this.pathClicked(e));
    }
  }

  pathClicked(event) {
    console.log('path clicked');
    this.props.onPathClicked(this.getPathData(event.target), event);
  }

  reducePathData() {
    const paths = _find(this.element.childNodes, { nodeName: 'svg'}).getElementsByTagName('path');

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

  // doesScroll() {
  //   const ST = document.getElementById(this.props.scrollParent).scrollTop;
  //   let activePathID = '';

  //   for (let i = 0; i < this.reducedPathData.length; i += 1) {
  //     if (isInRange(this.reducedPathData[i].coordinates.minY, this.reducedPathData[i].coordinates.maxY, ST)) {
  //       activePathID = this.reducedPathData[i].id;
  //     }
  //   }

  //   this.props.onItemSelected(ST >= this.element.offsetHeight);
  //   this.activatePath(activePathID);
  // }

  activatePath(index = 0) {
    if (!this.state.loading) {
      const svgElement = _find(this.element.childNodes, { nodeName: 'svg'}).getElementById(index);

      if (this.state.lastIndex) _find(this.element.childNodes, { nodeName: 'svg'}).getElementById(this.state.lastIndex).style.stroke = '';

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
            ref={(element) => { this.element = element; }}
            id={`lanes-${this.props.vehicle}`}
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

// function isInRange(rangeMin, rangeMax, value) {
//   return value > rangeMin && value < rangeMax;
// }


export default connect((state) => {
  return {
    baseUrl: state.app.get('baseUrl')
  }
})(Lanes);
