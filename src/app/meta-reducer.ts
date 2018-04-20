import {carReducer} from './car-reducer';
import {initialState} from './state';
import {userReducer} from './user-reducer';
import {getReducer} from '../nse/state.service';

const reducerMap = {
  car: carReducer,
  user: userReducer
};

export function metaReducer(reducer) {
  return (state = initialState, action) => {
    const stateSvcReducer = getReducer();
    let newState = stateSvcReducer(state, action);
    if (newState === null) {
      newState = {...state};
      Object.keys(reducerMap).forEach((key: string) => {
        const theReducer = reducerMap[key];
        const newValue = theReducer(newState[key], action);
        newState[key] = newValue;
      });
    }
    return newState;
  };
}
