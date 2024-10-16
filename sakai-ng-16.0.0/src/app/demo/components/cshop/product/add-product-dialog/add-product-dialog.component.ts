import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BrandService } from 'src/app/demo/service/cshop-services/brand.service';
import { CategoryService } from 'src/app/demo/service/cshop-services/category.service';
import { ProductService } from 'src/app/demo/service/cshop-services/product.service';
import { SupplierService } from 'src/app/demo/service/cshop-services/supplier.service';
import UploadFirebase from 'src/app/demo/service/upload-service/uploadFile';

@Component({
    selector: 'app-add-product-dialog',
    templateUrl: './add-product-dialog.component.html',
    styleUrls: ['./add-product-dialog.component.scss'],
})
export class AddProductDialogComponent {
    item: any = {
        name: '',
        categoryId: '',
        brandId: '',
        supplierId: '',
        numberSold: 0,
        numberStock: 0,
        star: 0,
        numberEvaluate: 0,
        PictureUrl: '',
        description: '',
    };
    isCopy: boolean = false;
    categories: any[] = [
        {
            id: '',
            name: '',
        },
    ];
    brands: any[] = [
        {
            id: '',
            name: '',
        },
    ];
    suppliers: any[] = [
        {
            id: '',
            name: '',
        },
    ];

    constructor(
        private productService: ProductService,
        private categoryService: CategoryService,
        private brandService: BrandService,
        private supplierService: SupplierService,
        public dialogRef: DynamicDialogRef,
        public config: DynamicDialogConfig
    ) {}

    async ngOnInit() {
        await this.getSuppliers();
        await this.getCategories();
        await this.getBrands();
        if (this.config.data.IsCopy) {
            this.item = this.config.data.data;
            this.isCopy = true;
        }
    }

    async getCategories() {
        await this.categoryService
            .getCategories()
            .then((rs) => {
                this.categories = rs.data;
                this.categories.push({ id: '', name: '' });
            })
            .catch((er) => console.log(er));
    }

    async getBrands() {
        await this.brandService
            .getBrands()
            .then((rs) => {
                this.brands = rs.data;
                this.brands.push({ id: '', name: '' });
            })
            .catch((er) => console.log(er));
    }

    async getSuppliers() {
        await this.supplierService
            .getSuppliers()
            .then((rs) => {
                this.suppliers = rs.data;
                this.suppliers.push({ id: '', name: '' });
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
        // this.setItemValues()
        if (this.isCopy) {
            this.productService
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
            this.productService
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
            this.item.name == '' ||
            this.item.categoryId == '' ||
            this.item.brandId == '' ||
            this.item.supplierId == ''
        )
            return false;
        return true;
    }
}
