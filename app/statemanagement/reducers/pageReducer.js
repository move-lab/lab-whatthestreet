import { fromJS } from 'immutable';

import { PAGE } from 'data/constants';

const initialState = fromJS({
  showAbout: false,
  showMap: false,
  showSearch: false,
  gifCreationMode: false,
});

export default function mapReducer(state = initialState, action) {
  switch (action.type) {
    case PAGE.TOGGLE_ABOUT:
      return state
      .set('showAbout', fromJS(!state.toJS().showAbout));
    case PAGE.TOGGLE_MAP:
      return state
      .set('showMap', fromJS(!state.toJS().showMap));
    case PAGE.TOGGLE_SEARCH:
      return state
      .set('showSearch', fromJS(!state.toJS().showSearch));
    case PAGE.TOGGLE_GIF_CREATION_MODE:
      return state
      .set('gifCreationMode', fromJS(!state.toJS().gifCreationMode));
    default:
      return state;
  }
}
