// Constants
import {
  NEXT_SCROLL_INDEX,
  PREVIOUS_SCROLL_INDEX,
  SET_SCROLL_INDEX,
  REGISTER_SCROLL_TARGET,
  FINISH_SCROLLING,
} from '../constants';

// Action Generators
export function nextScrollIndex() {
  return {
    type: NEXT_SCROLL_INDEX,
  };
}

export function previousScrollIndex() {
  return {
    type: PREVIOUS_SCROLL_INDEX,
  };
}

export function setScrollIndex(index) {
  return {
    type: SET_SCROLL_INDEX,
    scrollIndex: index,
  };
}

export function registerScrollTarget(targetname, minPositionTop, maxPositionTop) {
  return {
    type: REGISTER_SCROLL_TARGET,
    target: { name: targetname, top: { min: minPositionTop, max: maxPositionTop } },
  };
}

export function finishScrolling() {
  return {
    type: FINISH_SCROLLING,
  };
}
