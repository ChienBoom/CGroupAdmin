import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CinemaRoutingModule } from './cinema-routing.module';
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
import { MediaDemoRoutingModule } from '../uikit/media/mediademo-routing.module';
import { HomeComponent } from './home/home.component';
import { FilmComponent } from './film/film.component';
import { BookingComponent } from './booking/booking.component';

@NgModule({
    declarations: [HomeComponent, FilmComponent, BookingComponent],
    imports: [
        CommonModule,
        CinemaRoutingModule,
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
    ],
})
export class CinemaModule {}
