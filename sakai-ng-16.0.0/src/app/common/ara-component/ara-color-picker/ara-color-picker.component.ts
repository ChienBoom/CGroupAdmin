import { Component, EventEmitter, Input, OnInit, Output, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColorPicker } from '../../enums/qc';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'ara-color-picker',
  templateUrl: './ara-color-picker.component.html',
  styleUrls: ['./ara-color-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AraColorPickerComponent),
      multi: true,
    },
  ],
})
export class AraColorPickerComponent implements ControlValueAccessor, OnInit {
  @Input() required: boolean = false;
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() disabled: boolean = false;

  currentColorValue: string = '';
  colorValue: string = '';
  alphaValue: string = '';
  option: string = 'color';
  lstAlpha: any[] = [];

  lstColor: any[] = ColorPicker;

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  disableFormControl: boolean = false;

  @ViewChild(MatMenuTrigger) menu!: MatMenuTrigger;

  _onChange: (value: any) => void = () => {};
  _onTouch: () => void = () => {};

  ngOnInit(): void {
    this.lstColor.map((x) =>
      x.lstAlpha.map((y: any) => {
        if (y.value == this.value) {
          this.colorValue = x.name;
          this.currentColorValue = x.name;
          this.alphaValue = y.name;
          this.option = 'alpha'
          this.lstAlpha = x.lstAlpha;
          return;
        }
      })
    );
  }

  handleClickColor(event: any, color: any) {
    this.lstAlpha = color.lstAlpha;
    this.colorValue = color.name;
    this.option = 'alpha';
    event.stopPropagation();
  }

  handleClickAlpha(alpha: any) {
    this.alphaValue = alpha;
    this.lstColor.map(x => {
      if(x.name == this.colorValue){
        x.lstAlpha.map((y: any) => {
          if(y.name == this.alphaValue){
            this.value = y.value;
            this.currentColorValue = x.name
            return
          }
        })
      }
    })
    this.onChange.emit(this.value)
  }

  handleBack(event: any) {
    this.option = 'color';
    event.stopPropagation();
  }

  writeValue(obj: any): void {
    this.colorValue = obj;
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disableFormControl = isDisabled;
  }

}
