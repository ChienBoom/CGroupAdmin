import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { BrandComponent } from './brand/brand.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { RevenueComponent } from './revenue/revenue.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'supplier', component: SupplierComponent },
            { path: 'category', component: CategoryComponent },
            { path: 'brand', component: BrandComponent },
            { path: 'product', component: ProductComponent },
            { path: 'order', component: OrderComponent },
            { path: 'revenue', component: RevenueComponent },
            { path: 'product/:id', component: ProductDetailComponent },
            // { path: 'booking', component: BookingComponent },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class CShopRoutingModule {}
