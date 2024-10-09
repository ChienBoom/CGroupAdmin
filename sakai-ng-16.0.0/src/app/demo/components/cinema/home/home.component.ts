import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FilmService } from "src/app/demo/service/film.service";

@Component({
    templateUrl: './home.component.html',
    providers: [],
})
export class HomeComponent implements OnInit {
    products: any[] = [
        {
            id: '1000',
            code: 'f230fh0g3',
            name: 'Bamboo Watch',
            description: 'Product Description',
            image: 'https://cdn.galaxycine.vn/media/2024/6/20/despicable-me-4-2048_1718865168626.jpg',
            price: 65,
            category: 'Accessories',
            quantity: 24,
            inventoryStatus: 'INSTOCK',
            rating: 5,
        },
        {
            id: '1001',
            code: 'nvklal433',
            name: 'Black Watch',
            description: 'Product Description',
            image: 'https://cdn.galaxycine.vn/media/2024/2/8/2048x682_1707364876796.jpg',
            price: 72,
            category: 'Accessories',
            quantity: 61,
            inventoryStatus: 'INSTOCK',
            rating: 4,
        },
        {
            id: '1002',
            code: 'zz21cz3c1',
            name: 'Blue Band',
            description: 'Product Description',
            image: 'https://cdn.galaxycine.vn/media/2024/6/27/xummer2024-duatop-digital-2048x682_1719459622629.jpg',
            price: 79,
            category: 'Fitness',
            quantity: 2,
            inventoryStatus: 'LOWSTOCK',
            rating: 3,
        },
        {
            id: '1003',
            code: '244wgerg2',
            name: 'Blue T-Shirt',
            description: 'Product Description',
            image: 'https://cdn.galaxycine.vn/media/2024/6/4/mua-he-dep-nhat-4_1717486192239.jpg',
            price: 29,
            category: 'Clothing',
            quantity: 25,
            inventoryStatus: 'INSTOCK',
            rating: 5,
        },
        {
            id: '1004',
            code: 'h456wer53',
            name: 'Bracelet',
            description: 'Product Description',
            image: 'https://cdn.galaxycine.vn/media/2024/6/21/haunted-universities-3-1_1718938059593.jpg',
            price: 15,
            category: 'Accessories',
            quantity: 73,
            inventoryStatus: 'INSTOCK',
            rating: 4,
        },
        {
            id: '1005',
            code: 'av2231fwg',
            name: 'Brown Purse',
            description: 'Product Description',
            image: 'https://cdn.galaxycine.vn/media/2024/6/13/io2-2048_1718251991479.jpg',
            price: 120,
            category: 'Accessories',
            quantity: 0,
            inventoryStatus: 'OUTOFSTOCK',
            rating: 4,
        },
        {
            id: '1006',
            code: 'bib36pfvm',
            name: 'Chakra Bracelet',
            description: 'Product Description',
            image: 'https://cdn.galaxycine.vn/media/2024/6/7/aqp-2048_1717732514548.jpg',
            price: 32,
            category: 'Accessories',
            quantity: 5,
            inventoryStatus: 'LOWSTOCK',
            rating: 3,
        },
        {
            id: '1007',
            code: 'mbvjkgip5',
            name: 'Galaxy Earrings',
            description: 'Product Description',
            image: 'https://cdn.galaxycine.vn/media/2024/6/20/love-you-as-the-world-ends-1_1718865202697.jpg',
            price: 34,
            category: 'Accessories',
            quantity: 23,
            inventoryStatus: 'INSTOCK',
            rating: 5,
        },
        {
            id: '1008',
            code: 'vbb124btr',
            name: 'Game Controller',
            description: 'Product Description',
            image: 'https://cdn.galaxycine.vn/media/2024/6/26/voucher-shopeepay-giam-10k-danh-tang-cac-stars-2_1719370297038.jpg',
            price: 99,
            category: 'Electronics',
            quantity: 2,
            inventoryStatus: 'LOWSTOCK',
            rating: 4,
        },
        {
            id: '1009',
            code: 'cm230f032',
            name: 'Gaming Set',
            description: 'Product Description',
            image: 'https://cdn.galaxycine.vn/media/2024/6/26/voucher-shopeepay-giam-10k-danh-tang-cac-stars-2_1719370297038.jpg',
            price: 299,
            category: 'Electronics',
            quantity: 63,
            inventoryStatus: 'INSTOCK',
            rating: 3,
        },
    ];

    carouselResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3,
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2,
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1,
        },
    ];

    films: any[] = [
        {
            id: 1,
            pictureUrl:
                'https://cdn.galaxycine.vn/media/2024/6/20/despicable-me-4-500_1718865149847.jpg',
            name: 'Kẻ cắp mặt trăng',
        },
        {
            id: 2,
            pictureUrl:
                'https://cdn.galaxycine.vn/media/2024/5/6/inside-out-2-3_1714970461256.jpg',
            name: 'Ínide Out 2',
        },
        {
            id: 3,
            pictureUrl:
                'https://cdn.galaxycine.vn/media/2024/6/10/tru-bat-gioi-dai-nao-the-gioi-moi-3_1718003587616.jpg',
            name: 'Trư bát giới đại náo thế giới',
        },
        {
            id: 4,
            pictureUrl:
                'https://cdn.galaxycine.vn/media/2024/6/24/oceans-4_1719217509755.jpg',
            name: 'Đại dương',
        },
        {
            id: 5,
            pictureUrl:
                'https://cdn.galaxycine.vn/media/2024/5/22/transformers-one_1716352652451.jpg',
            name: 'Transformers 1',
        },
        {
            id: 6,
            pictureUrl:
                'https://cdn.galaxycine.vn/media/2024/6/3/deadpool-3-1_1717419262195.jpg',
            name: 'Deadpool & Wolverine',
        },
        {
            id: 7,
            pictureUrl:
                'https://cdn.galaxycine.vn/media/2024/4/16/joker-2-500_1713239571001.jpg',
            name: 'Joker: Điên có đôi',
        },
        {
            id: 8,
            pictureUrl:
                'https://cdn.galaxycine.vn/media/2024/5/2/mufasa-500_1714620600495.jpg',
            name: 'Mufasa: Vua sư tử',
        },
    ];

    first: number = 0;
    totalCount: number = this.films.length;
    rows: number = 10;
    constructor(private router: Router, private filmService: FilmService) {
        this.filmService
            .getFilms()
            .subscribe(
                (response) => {
                    console.log(response);
                },
                (error) => {
                    console.error('Error:', error);
                }
            );
    }
    ngOnInit(): void {}
    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }
    handleClickItem() {
        console.log('CLICK ITEM');
    }
    navigateToDetail(id: number) {
        this.router.navigate(['cinema/film', id]);
    }
}
