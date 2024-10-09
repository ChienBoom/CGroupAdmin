import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ara-slide-toggle',
  templateUrl: './ara-slide-toggle.component.html',
  styleUrls: ['./ara-slide-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AraSlideToggleComponent),
      multi: true,
    },
  ],
})
export class AraSlideToggleComponent
  implements OnInit, ControlValueAccessor, OnChanges
{
  @Input() label: string = ''; //Lable hiển thị
  @Input() useForm: boolean = true; // Sử dụng/không sử dụng form (Nếu không sử dụng form thì sẽ sử dụng Value làm giá trị)
  @Input() value: boolean = false; // Giá trị value được sử dụng khi không sử dụng Form
  @Input() isOnlyDisplayValue: boolean = true; // Chỉ hiển thị một giá trị
  @Input() displayValue: string = ''; //
  @Input() displayValueYes: string = ''; // Hiển thị cho giá trị Yes
  @Input() displayValueNo: string = ''; // Hiển thị cho giá trị No
  @Input() disabled: boolean = false; // Disable/Enable cho component

  disableFormControl: boolean = false; // Disable/Enable cho FormControl
  displayText: string = ''; //Hiển thị

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  _onChange: (value: any) => void = () => {};
  _onTouch: () => void = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['useForm']) {
      if (!changes['useForm'].currentValue) {
        this.value = changes['value'].currentValue;
      }
    }
  }

  ngOnInit(): void {
    if (this.isOnlyDisplayValue) {
      this.displayText = this.displayValue;
    } else {
      this.displayText =
        this.value == true ? this.displayValueYes : this.displayValueNo;
    }
  }

  handleChange(value: any) {
    this.value = value.checked;
    this.displayText =
      this.value == true ? this.displayValueYes : this.displayValueNo;
    this._onChange(value.checked);
    this.onChange.emit(value.checked);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disableFormControl = isDisabled;
  }
}
