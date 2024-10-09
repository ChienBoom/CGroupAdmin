import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'category', component: CategoryComponent },
            // { path: 'film/:id', component: FilmComponent },
            // { path: 'booking', component: BookingComponent },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class ManagementRoutingModule {}
