import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { PhotoService } from 'src/app/demo/service/photo.service';
import { ProductService } from 'src/app/demo/service/product.service';

@Component({
    templateUrl: './film.component.html',
    providers: [],
})
export class FilmComponent implements OnInit {
    filmId: string = '';
    filmImages: any[] = [
        {
            itemImageSrc:
                'https://cdn.galaxycine.vn/media/2024/6/20/despicable-me-4-500_1718865149847.jpg',
            thumbnailImageSrc:
                'https://cdn.galaxycine.vn/media/2024/6/20/despicable-me-4-500_1718865149847.jpg',
            alt: 'Description for Image 1',
            title: 'Title 1',
        },
        {
            itemImageSrc:
                'https://cdn.galaxycine.vn/media/2024/5/6/inside-out-2-3_1714970461256.jpg',
            thumbnailImageSrc:
                'https://cdn.galaxycine.vn/media/2024/5/6/inside-out-2-3_1714970461256.jpg',
            alt: 'Description for Image 2',
            title: 'Title 2',
        },
    ];

    galleriaResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5,
        },
        {
            breakpoint: '960px',
            numVisible: 4,
        },
        {
            breakpoint: '768px',
            numVisible: 3,
        },
        {
            breakpoint: '560px',
            numVisible: 1,
        },
    ];

    selectedItem: any = 1;

    filteredItems: any[] = [
        {
            label: 'Toàn quốc',
            value: 1,
        },
        {
            label: 'Hà Nội',
            value: 2,
        },
        {
            label: 'TP. Hồ Chí Minh',
            value: 3,
        },
    ];

    items: any[] | undefined;

    @ViewChild('videoPlayer') videoPlayer: ElementRef;
    constructor(private route: ActivatedRoute) {}
    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.filmId = params.get('id');
        });
    }
    handleClickItem() {
        console.log('CLICK ITEM');
    }
    filterItems(event: AutoCompleteCompleteEvent) {
        console.log('Data: ', this.filteredItems);
    }
}
