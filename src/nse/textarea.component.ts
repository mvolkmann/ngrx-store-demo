import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {HasChangeDetector, StateService} from './state.service';

@Component({
  selector: 'nse-textarea',
  template: `
    <textarea
      class="nse-textarea"
      [(ngModel)]="value"
      (change)="onChange($event)"
      (keyup)="onChange($event)"
    ></textarea>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextAreaComponent<S> extends HasChangeDetector implements OnInit {
  @Input() path: string;
  @Output() value = '';

  constructor(cd: ChangeDetectorRef, private stateSvc: StateService<S>) {
    super(cd);
  }

  ngOnInit() {
    this.stateSvc.watch(this.path, this, 'value');
  }

  onChange(event: any) {
    // We don't need to use a CaptureType here because the
    // TextArea component should only used with string properties.
    this.stateSvc.dispatchSet(this.path, '', event.target.value);
  }
}
