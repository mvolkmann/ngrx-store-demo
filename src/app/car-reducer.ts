import {initialState} from './state';

export function carReducer(state = initialState.car, action) {
  switch (action.type) {
    case 'setMake': {
      return {...state, make: action.payload};
    }
    case 'setModel': {
      return {...state, model: action.payload};
    }
    case 'setYear': {
      return {...state, year: action.payload};
    }
    default:
      return state;
  }
}
