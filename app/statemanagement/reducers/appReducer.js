import { fromJS } from 'immutable';

// Initial state
const initialState = fromJS({
  someExample: false
});

// Actions
const EXAMPLE_ACTION = 'App/EXAMPLE_ACTION';


export function exampleAction() {
  return {
    type: EXAMPLE_ACTION
  }
}

// Reducer
export default function AppReducer(state = initialState, action = {}) {
  switch (action.type) {
    case EXAMPLE_ACTION:
      return state.set('someExample', true)
    default:
      return state;
  }
}
