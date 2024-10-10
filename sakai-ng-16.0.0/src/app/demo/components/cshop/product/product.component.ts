import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductService } from 'src/app/demo/service/cshop-services/product.service';
import { AddProductDialogComponent } from './add-product-dialog/add-product-dialog.component';
import { AddProductDetailDialogComponent } from '../product-detail/add-product-detail-dialog/add-product-detail-dialog.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
    dialogRef: DynamicDialogRef | undefined;
    data: any[];
    totalCount: number = 0;
    isLoading = true;
    first: number = 0;
    rows: number = 10;
    pageOption: any[] = [5, 10, 20, 30];

    constructor(
        private router: Router,
        private productService: ProductService,
        private dialogService: DialogService,
        private messageService: MessageService,
        private confirmService: ConfirmationService
    ) {}

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.productService
            .getProducts(
                ['Category', 'Brand', 'Supplier'],
                this.first / this.rows,
                this.rows
            )
            .then((rs) => {
                this.totalCount = rs.totalCount;
                this.data = rs.data.map((x, index) => {
                    x.position = index + 1;
                    return x;
                });
                this.isLoading = false;
                console.log('data: ', this.data);
            })
            .catch((er) => console.log(er));
    }

    handleCreate() {
        this.dialogRef = this.dialogService.open(AddProductDialogComponent, {
            data: {
                data: {},
                IsCopy: false,
            },
            header: 'Custom dialog',
            width: '30%',
        });

        this.dialogRef.onClose.subscribe((result) => {
            if (result) {
                if (result.success) {
                    this.toastMessage(
                        'msg-toast',
                        'success',
                        'Thông báo',
                        'Thêm mới bản ghi thành công'
                    );
                    this.fetchData();
                } else {
                    this.toastMessage(
                        'msg-toast',
                        'error',
                        'Thông báo',
                        'Thêm mới bản ghi thất bại'
                    );
                }
            }
        });
    }

    handleAddDetail(item: any) {
        this.dialogRef = this.dialogService.open(
            AddProductDetailDialogComponent,
            {
                data: {
                    data: item,
                    IsCopy: false,
                },
                header: 'Custom dialog',
                width: '30%',
            }
        );

        this.dialogRef.onClose.subscribe((result) => {
            if (result) {
                if (result.success) {
                    this.toastMessage(
                        'msg-toast',
                        'success',
                        'Thông báo',
                        'Thêm mới bản ghi thành công'
                    );
                    this.fetchData();
                } else {
                    this.toastMessage(
                        'msg-toast',
                        'error',
                        'Thông báo',
                        'Thêm mới bản ghi thất bại'
                    );
                }
            }
        });
    }

    handleShowDetail(item: any) {
        this.router.navigate([`/cshop/product/${item.id}`]);
    }

    handleCopy(item: any) {
        console.log('dataCopy: ', this.data);
        console.log('itemCopy: ', item);
        this.dialogRef = this.dialogService.open(AddProductDialogComponent, {
            data: {
                data: item,
                IsCopy: true,
            },
            header: 'Custom dialog',
            width: '30%',
        });

        this.dialogRef.onClose.subscribe((result) => {
            if (result) {
                if (result.success) {
                    this.toastMessage(
                        'msg-toast',
                        'success',
                        'Thông báo',
                        'Cập nhật bản ghi thành công'
                    );
                    this.fetchData();
                } else {
                    this.toastMessage(
                        'msg-toast',
                        'error',
                        'Thông báo',
                        'Cập nhật bản ghi thất bại'
                    );
                }
            }
        });
    }

    handleDelete(id: string) {
        this.confirmService.confirm({
            message: 'Bạn có chắc chắn muốn xoá bản ghi này không?',
            header: 'Thông báo',
            icon: 'pi pi-trash',
            accept: () => {
                this.productService
                    .remove(id)
                    .then((rs) => {
                        this.fetchData();
                    })
                    .catch((er) => console.log(er));
            },
            reject: () => {},
        });
    }

    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
        this.fetchData();
    }

    toastMessage(
        key: string,
        severity: string,
        title: string,
        message: string
    ) {
        this.messageService.add({
            key: key,
            severity: severity,
            summary: title,
            detail: message,
        });
    }
}
