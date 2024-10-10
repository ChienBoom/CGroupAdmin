import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductDetailService } from 'src/app/demo/service/cshop-services/product-detail.service';
import { ProductService } from 'src/app/demo/service/cshop-services/product.service';
import UploadFirebase from 'src/app/demo/service/upload-service/uploadFile';

@Component({
    selector: 'app-add-product-detail-dialog',
    templateUrl: './add-product-detail-dialog.component.html',
    styleUrls: ['./add-product-detail-dialog.component.scss'],
})
export class AddProductDetailDialogComponent {
    item: any = {
        productId: '',
        size: '',
        color: '',
        unit: '',
        numberSold: 0,
        numberStock: 0,
        price: 0,
        PictureUrl: '',
        description: '',
    };
    isCopy: boolean = false;
    Products: any[] = [{ id: '', name: '' }];

    constructor(
        private productDetailService: ProductDetailService,
        private productService: ProductService,
        public dialogRef: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {}

    async ngOnInit() {
        await this.getProducts();
        if (this.config.data.IsCopy) {
            this.item = this.config.data.data;
            this.isCopy = true;
        }
        else{
            this.item.productId = this.config.data.data.id;
        }
    }

    async getProducts() {
        await this.productService
            .getProducts()
            .then((rs) => {
                this.Products = rs.data;
                this.Products.push({ id: '', name: '' });
            })
            .catch((er) => console.log(er));
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
            this.productDetailService
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
            this.productDetailService
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

    get formValid() {
        if (
            this.item.size == '' ||
            this.item.color == '' ||
            this.item.price < 0
        )
            return false;
        return true;
    }
}
