import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FilmComponent } from './film/film.component';
import { BookingComponent } from './booking/booking.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: HomeComponent },
            { path: 'film/:id', component: FilmComponent },
            { path: 'booking', component: BookingComponent },
            {
                path: 'management',
                loadChildren: () =>
                    import('./management/management.module').then(
                        (m) => m.ManagementModule
                    ),
            },
            { path: '**', redirectTo: '/notfound' },
        ]),
    ],
    exports: [RouterModule],
})
export class CinemaRoutingModule {}
