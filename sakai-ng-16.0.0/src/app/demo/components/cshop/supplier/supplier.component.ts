import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WebSocketService } from 'src/app/demo/service/websocker-services/websocket.service';
import { SupplierService } from 'src/app/demo/service/cshop-services/supplier.service';
import { AddSupplierDialogComponent } from './add-supplier-dialog/add-supplier-dialog.component';

@Component({
    selector: 'app-supplier',
    templateUrl: './supplier.component.html',
    styleUrls: ['./supplier.component.scss'],
})
export class SupplierComponent implements OnInit{
    dialogRef: DynamicDialogRef | undefined;
    data: any[];
    isLoading = true;
    first: number = 0;
    rows: number = 10;
    pageOption: any[] = [5, 10, 20, 30];

    constructor(
        private supplierService: SupplierService,
        private dialogService: DialogService,
        private messageService: MessageService,
        private confirmService: ConfirmationService,
        public webSocketService: WebSocketService
    ) {}

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.supplierService.getSuppliers().subscribe((rs) => {
            this.data = rs.map((x, index) => {
                x.position = index + 1;
                return x;
            });
            this.isLoading = false;
        });
    }

    handleCreate() {
        this.dialogRef = this.dialogService.open(AddSupplierDialogComponent, {
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

    handleCopy(item: any) {
        this.dialogRef = this.dialogService.open(AddSupplierDialogComponent, {
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
                this.supplierService.remove(id).subscribe(
                    (rs) => {
                        this.fetchData();
                    },
                    (er) => {}
                );
            },
            reject: () => {},
        });
    }

    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
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
