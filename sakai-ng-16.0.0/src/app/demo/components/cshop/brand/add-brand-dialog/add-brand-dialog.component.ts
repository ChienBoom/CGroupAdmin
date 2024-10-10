import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BrandService } from 'src/app/demo/service/cshop-services/brand.service';

@Component({
    selector: 'app-add-brand-dialog',
    templateUrl: './add-brand-dialog.component.html',
    styleUrls: ['./add-brand-dialog.component.scss'],
})
export class AddBrandDialogComponent {
    item: any = {
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        description: '',
    };
    isCopy: boolean = false;

    constructor(
        private brandService: BrandService,
        public dialogRef: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
        if (this.config.data.IsCopy) {
            this.item = this.config.data.data;
            this.isCopy = true;
        }
    }

    handleCancel() {
        this.dialogRef.close();
    }

    handleSave() {
        if (this.isCopy) {
            this.brandService
                .update(this.item.id, this.item)
                .then((rs) => {
                    this.dialogRef.close({
                        rs: rs,
                        success: true,
                        er: '',
                    });
                })
                .catch((er) => {
                    this.dialogRef.close({
                        rs: '',
                        success: false,
                        er: er,
                    });
                });
        } else {
            this.brandService
                .create(this.item)
                .then((rs) => {
                    this.dialogRef.close({
                        rs: rs,
                        success: true,
                        er: '',
                    });
                })
                .then((er) => {
                    this.dialogRef.close({
                        rs: '',
                        success: false,
                        er: er,
                    });
                });
        }
    }
}
