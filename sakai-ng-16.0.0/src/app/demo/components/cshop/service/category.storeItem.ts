import { cA } from '@fullcalendar/core/internal-common';
import { Observable } from 'rxjs';
import { StoreItem } from 'src/shared/storeItem';

export class CategoryStoreItem extends StoreItem<any> {
    constructor() {
        super({
            name: '',
            des: '',
        });
    }

    setCategory(category: any) {
        this.setValue(category);
    }

    get category$(): Observable<any> {
        return this.value$;
    }

    get category(): any {
        return this.value;
    }
}
