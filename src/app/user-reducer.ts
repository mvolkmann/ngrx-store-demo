import {initialState} from './state';

export function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case 'setColor': {
      return {...state, color: action.payload};
    }
    case 'setName': {
      return {...state, name: action.payload};
    }
    default:
      return state;
  }
}
