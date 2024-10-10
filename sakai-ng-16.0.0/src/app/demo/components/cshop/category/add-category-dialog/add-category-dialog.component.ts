import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryService } from 'src/app/demo/service/cshop-services/category.service';
import UploadFirebase from 'src/app/demo/service/upload-service/uploadFile';

@Component({
    selector: 'add-category-dialog',
    templateUrl: './add-category-dialog.component.html',
    styleUrls: ['./add-category-dialog.component.scss'],
})
export class AddCategoryDialogComponent implements OnInit {
    item: any = {
        name: '',
        numberProduct: 1,
        pictureUrl: '',
        status: '',
        description: '',
    };
    isCopy: boolean = false;

    constructor(
        private categoryService: CategoryService,
        public dialogRef: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {}

    ngOnInit(): void {
        if (this.config.data.IsCopy) {
            this.item = this.config.data.data;
            this.isCopy = true;
        }
    }

    async onUpload(event: any) {
        const imgUrl = await UploadFirebase(event.currentFiles[0]);
        this.item.pictureUrl = imgUrl;
    }

    handleCancel() {
        this.dialogRef.close();
    }

    handleSave() {
        if (this.isCopy) {
            this.categoryService
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
            this.categoryService
                .create(this.item)
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
        }
    }
}
