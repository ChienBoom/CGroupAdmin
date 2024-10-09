import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'management-category',
    templateUrl: './category-dialog.component.html',
    styleUrls: ['./category-dialog.component.scss'],
    providers: [],
})
export class CategoryDialogComponent implements OnInit {
    form: FormGroup;
    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            desc: [''],
        });
    }
    onSubmit() {
        console.log(this.form.value);
    }
}
