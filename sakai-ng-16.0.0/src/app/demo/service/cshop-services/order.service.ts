import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class OrderService extends BaseService {
    private domain = environment.apiUrl;
    private apiUrl = `${this.domain}/cshop-gateway/order`;

    constructor(http: HttpClient) {
        super(http);
    }

    getOrders(): Observable<any> {
        return this.get<any>(this.apiUrl);
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
