import {carReducer} from './car-reducer';
import {initialState} from './state';
import {userReducer} from './user-reducer';
import {reducer as stateSvcReducer} from '../nse/state.service';

const reducerMap = {
  car: carReducer,
  user: userReducer
};

export function metaReducer(reducer) {
  return (state = initialState, action) => {
    let newState = stateSvcReducer(state, action);
    if (newState === null) {
      newState = {...state};
      Object.keys(reducerMap).forEach(key => {
        const reducer = reducerMap[key];
        const newValue = reducer(newState[key], action);
        newState[key] = newValue;
      });
    }
    return newState;
  };
}
