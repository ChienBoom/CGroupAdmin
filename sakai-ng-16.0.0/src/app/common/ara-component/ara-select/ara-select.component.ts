import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ara-select',
  templateUrl: './ara-select.component.html',
  styleUrls: ['./ara-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AraSelectComponent),
      multi: true,
    },
  ],
})
export class AraSelectComponent
  implements ControlValueAccessor, OnInit, OnChanges
{
  @Input() useForm: boolean = true; //Sử dụng/Không sử dụng Form (Nếu không sử dụng Form thì sẽ nhận Value làm giá trị hiển thị)
  @Input() value: string = ''; // Giá trị được sử dụng nếu không sử dụng form
  @Input() lstOption: any[] = []; // Danh sách các Option được truyển vào
  @Input() displayOption: string = 'name'; //Trường thông tin sẽ được hiển thị nếu option là các obj
  @Input() valueOption: string = 'id'; //Trường thông tin sẽ được lấy giá trị nếu option là các obj
  @Input() label: string = ''; // Hiển thị
  @Input() required: boolean = false; // Đánh dấu là trường bắt buộc / Không
  @Input() disabled: boolean = false; // Disable/Enable ô select
  @Input() multiple: boolean = false; // Cho phép lựa chọn 1 hay nhiều option
  @Input() formGroup: FormGroup | undefined; // FormGroup từ bên ngoài truyền vào
  @Input() controlName: string = ''; // Tên control

  @Output() onChange: EventEmitter<any> = new EventEmitter();

  disableFormControl: boolean = false; // disable/enable FormControl
  control: any = {}; //FormControl

  _onChange: (value: any) => void = () => {};
  _onTouch: () => void = () => {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['useForm']) {
      if (!changes['useForm'].currentValue) {
        this.value = changes['value']?.currentValue;
      }
    }
  }

  ngOnInit(): void {
    if (this.useForm) {
      this.control = this.formGroup?.get(this.controlName);
    }
  }

  handleChange(event: any) {
    this.value = event;
    this._onChange(event);
    this.onChange.emit(event);
  }

  handleBlur(){
    this._onTouch();
  }

  writeValue(obj: any) {
    this.value = obj;
  }

  registerOnChange(fn: any) {
    this._onChange = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouch = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disableFormControl = isDisabled;
  }
}
