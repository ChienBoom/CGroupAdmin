import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SupplierService } from 'src/app/demo/service/cshop-services/supplier.service';

@Component({
    selector: 'app-add-supplier-dialog',
    templateUrl: './add-supplier-dialog.component.html',
    styleUrls: ['./add-supplier-dialog.component.scss'],
})
export class AddSupplierDialogComponent {
    item: any = {
        name: '',
        email: '',
        phoneNumber: '',
        address: '',
        description: '',
    };
    isCopy: boolean = false;

    constructor(
        private supplierService: SupplierService,
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
            this.supplierService.update(this.item.id, this.item).subscribe(
                (rs) => {
                    this.dialogRef.close({
                        rs: rs,
                        success: true,
                        er: '',
                    });
                },
                (er) => {
                    this.dialogRef.close({
                        rs: '',
                        success: false,
                        er: er,
                    });
                }
            );
        } else {
            this.supplierService.create(this.item).subscribe(
                (rs) => {
                    this.dialogRef.close({
                        rs: rs,
                        success: true,
                        er: '',
                    });
                },
                (er) => {
                    this.dialogRef.close({
                        rs: '',
                        success: false,
                        er: er,
                    });
                }
            );
        }
    }
}
