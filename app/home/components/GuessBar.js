import React from 'react';

import * as COLORS from '../../shared/style/colors';

class GuessBar extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    guess: React.PropTypes.number.isRequired,
    onChange: React.PropTypes.func,
    id: React.PropTypes.string,
    positionChanged: React.PropTypes.func,
  }

  componentDidMount = () => {
    // TODO: Use once maybe for optimizing performance of guessbar and reducing window bubbling events
    document.getElementById(`bar-${this.props.id}`).addEventListener('mousedown', this.mouseDown);
    document.getElementById(`bar-${this.props.id}`).addEventListener('touchstart', this.mouseDown);
    this.element.style.height = `${this.props.guess > 0 ? this.props.guess * 320 : 0}px`;
  }

  componentWillReceiveProps = (props) => {
    this.element.style.height = `${props.guess > 0 ? props.guess * 320 : 0}px`;
  }

  onChange = (value) => this.props.onChange(value, this.props.id);

  getProcentualPosition = (mousePositionY, element) => ((mousePositionY - element.getBoundingClientRect().top) / (element.offsetHeight / 100)) / 100;

  setGuessBarPosition = (procentualPosition) => this.props.positionChanged(procentualPosition, this.props.id);

  mouseDown = (event) => {
    this.addMouseEvents();
    this.setGuessBarPosition(this.getProcentualPosition(event.pageY || event.changedTouches[0].pageY, event.target));
  }

  addMouseEvents = () => {
    window.addEventListener('mouseup', this.mouseUp);
    window.addEventListener('touchend', this.mouseUp);
    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('touchmove', this.mouseMove);
  }

  removeMouseEvents = () => {
    window.removeEventListener('mouseup', this.mouseUp);
    window.removeEventListener('touchend', this.mouseUp);
    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('touchmove', this.mouseMove);
  }

  mouseUp = () => {
    this.removeMouseEvents();
    this.onChange(this.props.guess, this.props.id);
  }

  mouseMove = (event) => {
    const element = document.getElementById(`bar-${this.props.id}`);
    this.setGuessBarPosition(this.getProcentualPosition(event.pageY || event.changedTouches[0].pageY, element));
  }

  render = () => (
    <div>
      <div className="Container" id={`bar-${this.props.id}`}>
        <div className="GuessBar" ref={(element) => { this.element = element; }} >
          <div className="DragPanel"><img alt="DragIcon" src="/static/icons/Slider.svg" /></div>
        </div>
      </div>
      <style jsx>{`
        .Container {
          position: relative;
          height: 320px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          border-bottom: 50px transparent;
          cursor: grab;
          cursor: -webkit-grab;
          background-color: ${COLORS.ColorChartBar};
        }

        .Container:active {
            cursor: grabbing;
            cursor: -webkit-grabbing;
        }

        .GuessBar {
          position: relative;
          width: 150px;
          background-color: #FF6819;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          pointer-events: none;
        }

        .DragPanel {
          cursor: grab;
          cursor: -webkit-grab;
          height: 56px;
          width: 56px;
          border-radius: 50%;
          bottom: -15px;
          background-color: white;
          margin-bottom: -28px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 6px 10px rgba(0,0,0,.08);
        }

        .DragPanel img::selection {
          background: transparent;
        }
      `}</style>
    </div>
  )
}

export default GuessBar;
