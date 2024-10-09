import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CarouselModule } from 'primeng/carousel';
import { AccordionModule } from 'primeng/accordion';
import { GalleriaModule } from 'primeng/galleria';
import { ImageModule } from 'primeng/image';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { PaginatorModule } from 'primeng/paginator';
import { StepsModule } from 'primeng/steps';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MediaDemoRoutingModule } from '../uikit/media/mediademo-routing.module';
import { SidebarModule } from 'primeng/sidebar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { CShopRoutingModule } from './cshop-routing.module';
import { CategoryComponent } from './category/category.component';
import { CategoryStoreItem } from './service/category.storeItem';
import { AddCategoryDialogComponent } from './category/add-category-dialog/add-category-dialog.component';
import { BrandComponent } from './brand/brand.component';
import { TranslateModule } from '@ngx-translate/core';
import { AddBrandDialogComponent } from './brand/add-brand-dialog/add-brand-dialog.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { RevenueComponent } from './revenue/revenue.component';

@NgModule({
    declarations: [
        CategoryComponent,
        AddCategoryDialogComponent,
        BrandComponent,
        AddBrandDialogComponent,
        SupplierComponent,
        ProductComponent,
        OrderComponent,
        RevenueComponent,
    ],
    imports: [
        CShopRoutingModule,
        CommonModule,
        TableModule,
        FileUploadModule,
        FormsModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        MediaDemoRoutingModule,
        ImageModule,
        GalleriaModule,
        CarouselModule,
        ButtonModule,
        AccordionModule,
        AutoCompleteModule,
        CalendarModule,
        DividerModule,
        PaginatorModule,
        StepsModule,
        ProgressBarModule,
        ProgressSpinnerModule,
        SidebarModule,
        ConfirmDialogModule,
        TranslateModule.forChild()
    ],
    providers: [CategoryStoreItem],
})
export class CShopModule {}
