import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {HasChangeDetector, StateService} from './state.service';

@Component({
  selector: 'nse-input',
  template: `
    <input
      class="nse-input"
      [checked]="checked"
      [type]="type"
      [(ngModel)]="value"
      (change)="onChange($event)"
      (keypress)="onKeyPress($event)"
      (keyup)="onChange($event)"
    >
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent<S> extends HasChangeDetector implements OnInit {
  @Input() autofocus: boolean;
  @Input() path: string;
  @Input() type = 'text';

  @Output() checked = false;
  @Output() enter = new EventEmitter();
  @Output() value = '';

  constructor(cd: ChangeDetectorRef, private stateSvc: StateService<S>) {
    super(cd);
  }

  ngOnInit() {
    this.stateSvc.watch(this.path, this, 'value');
    if (this.type === 'checkbox') {
      this.checked = Boolean(this.value);
    }
  }

  onChange(event: any) {
    const {checked, value} = event.target;
    const {path, type} = this;

    let v = value;
    if (type === 'checkbox') {
      v = checked;
      this.checked = checked;
    } else if (type === 'number' || type === 'range') {
      if (value.length) v = Number(value);
    }

    // We don't need to use a CaptureType here because the
    // Input component should only used with string properties,
    // or boolean if type is 'checkbox'.
    this.stateSvc.dispatchSet(path, null, v);

    //TODO: Support custom change handling.
    //if (onChange) onChange(event);
  }

  onKeyPress(event: any) {
    if (event.key === 'Enter') this.enter.emit();
  }
}
