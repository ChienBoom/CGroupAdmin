import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/demo/service/cshop-services/category.service';
import { CategoryStoreItem } from '../service/category.storeItem';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { WebSocketService } from 'src/app/demo/service/websocker-services/websocket.service';

@Component({
    selector: 'cshop-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit{
    dialogRef: DynamicDialogRef | undefined;
    data: any[];
    totalCount: number = 0;
    isLoading = true;
    first: number = 0;
    rows: number = 10;
    pageOption: any[] = [5, 10, 20, 30];

    constructor(
        private categoryService: CategoryService,
        public categoryStore: CategoryStoreItem,
        private dialogService: DialogService,
        private messageService: MessageService,
        private confirmService: ConfirmationService

    ) {}

    ngOnInit() {
        this.fetchData();
    }

    fetchData() {
        this.categoryService.getCategories([], this.first/this.rows, this.rows).subscribe((rs) => {
            this.totalCount = rs.totalCount
            this.data = rs.data.map((x, index) => {
                x.position = index + 1;
                return x;
            });
            this.isLoading = false;
        });
    }

    handleCreate() {
        this.dialogRef = this.dialogService.open(AddCategoryDialogComponent, {
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
        this.dialogRef = this.dialogService.open(AddCategoryDialogComponent, {
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
                this.categoryService.remove(id).subscribe(
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
        this.fetchData()
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
