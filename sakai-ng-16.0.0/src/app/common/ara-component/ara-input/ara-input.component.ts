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
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'ara-input',
  templateUrl: './ara-input.component.html',
  styleUrls: ['./ara-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AraInputComponent),
      multi: true,
    },
  ],
})
export class AraInputComponent
  implements ControlValueAccessor, OnInit, OnChanges
{
  @Input() useForm: boolean = true; // Sử dụng/không sử dụng form
  @Input() formGroup: FormGroup | undefined; // FormGroup (sử dụng khi useForm = true)
  @Input() controlName: string = ''; // ControlName (sử dụng khi useForm = true)
  @Input() value: string = ''; // Giá trị truyền vào (sử dụng khi useForm = false)
  @Input() label: string = ''; // Nhãn
  @Input() required: boolean = false; // Yêu cầu bắt buộc/ không bắt buộc
  @Input() disabled: boolean = false; // Disable/enable ô nhập input
  @Input() useClear: boolean = true; // Sử dụng/ không sử dụng nút Clear

  @Output() onChange: EventEmitter<any> = new EventEmitter(); // Hàm được sử dụng để đẩy giá trị mới ra ngoài nếu không sử dụng Form
  displayValue: string = ''; // Giá trị hiển thị trong ô input
  disableFormControl: boolean = false; // disable/enable FormControl
  control: any = {}; //FormControl

  _onChange: (value: any) => void = () => {};
  _onTouch: () => void = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['useForm']) {
      if (!changes['useForm'].currentValue) {
        this.value = changes['value']?.currentValue;
        this.displayValue = this.value;
      }
    }
  }

  ngOnInit(): void {
    if (!this.useForm) {
      this.displayValue = this.value;
    } else {
      this.control = this.formGroup?.get(this.controlName);
    }
  }

  handleClear() {
    this.displayValue = '';
    this._onChange('');
    this.onChange.emit('');
  }

  handleChangeInput(event: any) {
    this.displayValue = event.target.value;
    this._onChange(event.target.value);
    this.onChange.emit(event.target.value);
  }

  handleBlur(){
    this._onTouch()
  }

  writeValue(obj: any): void {
    this.displayValue = obj;
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
