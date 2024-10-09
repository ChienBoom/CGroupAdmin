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
export class AddProductDialogComponent implements OnInit {
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

    async ngOnInit(): Promise<void> {
        if (this.config.data.IsCopy) {
            this.item = this.config.data.data;
            this.isCopy = true;
        }
        this.getSuppliers();
        this.getCategories();
        this.getBrands();
    }

    getCategories() {
        this.categoryService.getCategories().subscribe((rs) => {
            this.categories = rs;
            this.categories.push({id: '', name:''})
        });
    }

    getBrands() {
        this.brandService.getBrands().subscribe((rs) => {
            this.brands = rs
            this.brands.push({ id: '', name: '' });
        });
    }

    getSuppliers() {
        this.supplierService.getSuppliers().subscribe((rs) => {
            this.suppliers = rs
            this.suppliers.push({ id: '', name: '' });
        });
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
            this.productService.update(this.item.id, this.item).subscribe(
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
            this.productService.create(this.item).subscribe(
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

    get formValid() {
        if (this.item.name == '' || this.item.categoryId == '' || this.item.brandId == '' || this.item.supplierId == '') return false;
        return true;
    }
}
