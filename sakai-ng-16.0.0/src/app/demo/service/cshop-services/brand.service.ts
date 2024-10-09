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

    getBrands(includes: string[] = []): Observable<any> {
        let url = this.apiUrl;
        if (!includes || includes.length > 0) {
            url += '?';
            includes.map((x, index) => {
                if (index > 0) {
                    url += `&includes=${x}`;
                } else {
                    url += `includes=${x}`;
                }
            });
        }
        return this.get<any>(url);
    }

    create(body: any): Observable<any> {
        return this.post<any>(this.apiUrl, body);
    }

    update(id: string, body: any): Observable<any> {
        return this.put<any>(`${this.apiUrl}/${id}`, body);
    }

    remove(id: string): Observable<any> {
        return this.delete<any>(`${this.apiUrl}/${id}`);
    }
}
