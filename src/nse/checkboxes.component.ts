import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';

import {StateService} from './state.service';

export interface TextPath {
  text: string;
  path: string;
}

/**
 * This component renders a set of checkboxes.
 * The `list` prop specifies the text and Redux state path
 * for each checkbox.
 * Specify a `className` prop to enable styling the checkboxes.
 */
@Component({
  selector: 'nse-checkboxes',
  template: `
    <div className="{{'nse-checkboxes ' + className}}">
      <div *ngFor="let obj of list; let i = index" class="item">
        <input
          [checked]="values[i]"
          [class]="getName(i)"
          (change)="onChange($event, obj.path)"
          type="checkbox"
        >
        <label>{{obj.text}}</label>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxesComponent<S> implements OnInit {
  @Input() className = '';
  @Input() list: TextPath[];
  @Input() values: boolean[] = [];

  constructor(
    private cd: ChangeDetectorRef,
    private stateSvc: StateService<S>
  ) {}

  ngOnInit(): void {
    this.list.forEach((obj: TextPath, index: number) =>
      this.stateSvc.getObservable(obj.path).subscribe((value: boolean) => {
        this.values[index] = value;
        this.cd.markForCheck();
      })
    );
  }

  getName(index: number): string {
    return 'rb' + (index + 1);
  }

  onChange(event: any, path: string): void {
    // We don't need to use a CaptureType here because the
    // Checkboxes component should only used with boolean properties.
    this.stateSvc.dispatchSet(path, null, event.target.checked);
  }
}
