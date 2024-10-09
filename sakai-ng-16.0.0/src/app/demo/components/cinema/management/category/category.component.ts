import { Component, OnInit } from "@angular/core";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CategoryService } from "src/app/demo/service/category.service";
import { CategoryDialogComponent } from "./category-dialog/category-dialog.component";


@Component({
    selector: 'management-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss'],
    providers: [DialogService],
})
export class CategoryComponent implements OnInit {
    data: any[] = [];
    showSideBar: boolean = false;
    ref: DynamicDialogRef | undefined;

    constructor(
        private categoryService: CategoryService,
        public dialogService: DialogService
    ) {}

    ngOnInit() {
        this.categoryService.getCategory().subscribe(
            (response: any) => {
                this.data = response.data;
            },
            (error) => {
                console.error('Error:', error);
            }
        );
    }

    handleAddBtn() {
        this.ref = this.dialogService.open(CategoryDialogComponent, {
            header: 'Thêm mới thể loại phim',
            width: '40%',
            height: '80%',
            contentStyle: { 'max-height': '500px', overflow: 'hidden' },
            baseZIndex: 10000,
            maximizable: true,
        });
        this.ref.onClose.subscribe((value: any) => {
            if (value) {
                console.log("Success")
            }
        });

        this.ref.onMaximize.subscribe((value) => {
        });
    }
}
