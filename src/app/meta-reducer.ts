import {Action} from '@ngrx/store';

import {carReducer} from './car-reducer';
import {AppState, initialState} from './state';
import {userReducer} from './user-reducer';
import {getReducer} from '../nse/state.service';

type Reducer<T> = (state: T, action: Action) => T;

type ReducerFn = (state: AppState, action: Action) => AppState;

const reducerMap = {
  car: carReducer,
  user: userReducer
};

export function metaReducer(reducer: Reducer<AppState>): ReducerFn {
  const reducerFn: ReducerFn = (
    state: AppState = initialState,
    action: Action
  ): AppState => {
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
    return newState as AppState;
  };

  return reducerFn;
}
