import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BrandService extends BaseService {
    private domain = environment.apiUrl;
    private apiUrl = `${this.domain}/cshop-gateway/brand`;

    constructor(http: HttpClient) {
        super(http);
    }

    getBrands(
        includes: string[] = [],
        skip: number = 0,
        top: number = 9999
    ): Promise<any> {
        let url = this.apiUrl;
        url += `?skip=${skip}&top=${top}`;
        if (!includes || includes.length > 0) {
            includes.map((x) => {
                url += `&includes=${x}`;
            });
        }
        return this.get<any>(url);
    }

    create(body: any): Promise<any> {
        return this.post<any>(this.apiUrl, body);
    }

    update(id: string, body: any): Promise<any> {
        return this.put<any>(`${this.apiUrl}/${id}`, body);
    }

    remove(id: string): Promise<any> {
        return this.delete<any>(`${this.apiUrl}/${id}`);
    }
}
