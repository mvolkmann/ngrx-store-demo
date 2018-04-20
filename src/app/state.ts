export interface Car {
  make: string;
  model: string;
  year: number;
}

export interface User {
  name: string;
  color: string;
}

export interface AppState {
  car: Car;
  user: User;
}

export const initialState: AppState = {
  car: {
    make: 'MINI',
    model: 'Cooper',
    year: 2015
  },
  user: {
    name: 'Mark',
    color: 'yellow'
  }
};
