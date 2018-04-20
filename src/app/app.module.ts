import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActionReducerMap, StoreModule} from '@ngrx/store';

import {AppComponent} from './app.component';
import {metaReducer} from './meta-reducer';
import {initialState} from './state';
import {NseModule} from '../nse/nse.module';
import {StateService} from '../nse/state.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    NseModule,
    StoreModule.forRoot({}, {metaReducers: [metaReducer]})
  ],
  providers: [StateService],
  bootstrap: [AppComponent]
})
export class AppModule {}
