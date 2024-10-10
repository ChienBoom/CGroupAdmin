import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddProductDetailDialogComponent } from './add-product-detail-dialog/add-product-detail-dialog.component';
import { ProductDetailService } from 'src/app/demo/service/cshop-services/product-detail.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
    productId: string;
    dialogRef: DynamicDialogRef | undefined;
    data: any[];
    totalCount: number = 0;
    isLoading = true;
    first: number = 0;
    rows: number = 10;
    pageOption: any[] = [5, 10, 20, 30];

    constructor(
        private productDetailService: ProductDetailService,
        private dialogService: DialogService,
        private messageService: MessageService,
        private confirmService: ConfirmationService,
        private route: ActivatedRoute
    ) {
        this.route.params.subscribe((params) => {
            this.productId = params['id'];
            console.log("id: ", this.productId);
        });
    }

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.productDetailService
            .getProductDetails(['Product'], this.first / this.rows, this.rows)
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
        this.dialogRef = this.dialogService.open(
            AddProductDetailDialogComponent,
            {
                data: {
                    data: {},
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

    handleCopy(item: any) {
        console.log('dataCopy: ', this.data);
        console.log('itemCopy: ', item);
        this.dialogRef = this.dialogService.open(
            AddProductDetailDialogComponent,
            {
                data: {
                    data: item,
                    IsCopy: true,
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
                this.productDetailService
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
