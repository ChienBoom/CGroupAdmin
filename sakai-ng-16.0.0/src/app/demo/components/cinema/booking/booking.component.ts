import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    templateUrl: './booking.component.html',
    providers: [],
})
export class BookingComponent implements OnInit {
    items: MenuItem[] | undefined;

    activeIndex: number = 0;
    selectedItem: any = '';
    filteredItems: any[] = [
        {
            value: 1,
            label: 'Galaxy Mipec Long Biên',
        },
        {
            values: 2,
            label: 'Galaxy Trần Phú Hà Đông',
        },
    ];
    positions: any[] = [
        {
            id: 1,
            name: 'A',
            row: 'A',
            chairs: [
                {
                    id: 1,
                    column: 1,
                },
                {
                    id: 2,
                    column: 2,
                },
                {
                    id: 3,
                    column: 3,
                },
                {
                    id: 4,
                    column: 4,
                },
                {
                    id: 5,
                    column: 5,
                },
                {
                    id: 6,
                    column: 6,
                },
                {
                    id: 7,
                    column: 7,
                },
                {
                    id: 8,
                    column: 8,
                },
                {
                    id: 9,
                    column: 9,
                },
                {
                    id: 10,
                    column: 10,
                },
                {
                    id: 11,
                    column: 11,
                },
                {
                    id: 12,
                    column: 12,
                },
                {
                    id: 13,
                    column: 13,
                },
                {
                    id: 14,
                    column: 14,
                },
                {
                    id: 15,
                    column: 15,
                },
            ],
        },
        {
            id: 2,
            name: 'B',
            row: 'B',
            chairs: [
                {
                    id: 1,
                    column: 1,
                },
                {
                    id: 2,
                    column: 2,
                },
                {
                    id: 3,
                    column: 3,
                },
                {
                    id: 4,
                    column: 4,
                },
                {
                    id: 5,
                    column: 5,
                },
                {
                    id: 6,
                    column: 6,
                },
                {
                    id: 7,
                    column: 7,
                },
                {
                    id: 8,
                    column: 8,
                },
                {
                    id: 9,
                    column: 9,
                },
                {
                    id: 10,
                    column: 10,
                },
                {
                    id: 11,
                    column: 11,
                },
                {
                    id: 12,
                    column: 12,
                },
                {
                    id: 13,
                    column: 13,
                },
                {
                    id: 14,
                    column: 14,
                },
                {
                    id: 15,
                    column: 15,
                },
            ],
        },
    ];
    combos: any[] = [
        {
            id: 1,
            name: 'Combo 1 Big Extra STD',
            price: 109000,
            desc: '1 Ly nước ngọt size L + 1 Hộp bắp + 1 Snack',
        },
        {
            id: 2,
            name: 'Combo 1 Big STD',
            price: 89000,
            desc: '1 Ly nước ngọt size L + 1 Hộp bắp',
        },
        {
            id: 3,
            name: 'Combo 2 Big Extra STD',
            price: 129000,
            desc: '2 Ly nước ngọt size L + 1 Hộp bắp + 1 Snack',
        },
    ];

    constructor() {}
    ngOnInit(): void {
        this.items = [
            {
                label: 'Chọn Rạp/ Phim/ Suất chiếu',
                command: (event: any) => console.log(event),
            },
            {
                label: 'Chọn ghế',
                command: (event: any) => console.log(event),
            },
            {
                label: 'Chọn đồ ăn',
                command: (event: any) => console.log(event),
            },
            {
                label: 'Thanh toán',
                command: (event: any) => console.log(event),
            },
            {
                label: 'Xác nhận',
                command: (event: any) => console.log(event),
            },
        ];
    }
    onActiveIndexChange(event: number) {
        console.log('active: ', event);
        this.activeIndex = event;
    }
    handleBack() {
        if (this.activeIndex === 0) return;
        this.activeIndex = this.activeIndex - 1;
    }
    handleContinue() {
        if (this.activeIndex === 4) return;
        this.activeIndex = this.activeIndex + 1;
    }
}
