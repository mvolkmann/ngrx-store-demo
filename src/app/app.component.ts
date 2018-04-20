import {Component} from '@angular/core';
import {Store} from '@ngrx/store';

import {AppState} from './state';
import {StateService} from '../nse/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  car$ = null;
  user$ = null;

  constructor(private stateSvc: StateService, private store: Store<AppState>) {
    this.car$ = store.select('car');
    this.user$ = store.select('user');
  }

  setColor(newColor: string) {
    this.stateSvc.dispatchSet('user.color', null, newColor);
  }

  setMake(newMake: string) {
    this.stateSvc.dispatchSet('car.make', null, newMake);
  }

  setName(newName: string) {
    this.stateSvc.dispatchSet('user.name', null, newName);
  }

  special() {
    this.stateSvc.dispatchSet('user', null, {name: 'Amanda', color: 'green'});
    this.stateSvc.dispatchSet('car.make', null, 'BMW');
  }
}
