// Constants
import { SCROLL } from '../constants';

// Action Generators
export function nextScrollIndex() {
  return {
    type: SCROLL.NEXT_SCROLL_INDEX
  };
}

export function previousScrollIndex() {
  return {
    type: SCROLL.PREVIOUS_SCROLL_INDEX
  };
}

export function setScrollIndex(index) {
  return {
    type: SCROLL.SET_SCROLL_INDEX,
    scrollIndex: index
  };
}

export function registerScrollTarget(targetname, minPositionTop, maxPositionTop) {
  return {
    type: SCROLL.REGISTER_SCROLL_TARGET,
    target: { name: targetname, top: { min: minPositionTop, max: maxPositionTop } }
  };
}

export function finishScrolling() {
  return {
    type: SCROLL.FINISH_SCROLLING
  };
}
