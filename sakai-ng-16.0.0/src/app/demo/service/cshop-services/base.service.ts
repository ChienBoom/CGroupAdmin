import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BaseService {
    constructor(public http: HttpClient) {}

    protected get<T>(url: string, params?: HttpParams): Promise<T> {
        return this.http.get<T>(url, { params }).toPromise();
    }

    protected post<T>(
        url: string,
        body: any,
        headers?: HttpHeaders
    ): Promise<T> {
        return this.http.post<T>(url, body, { headers }).toPromise();
    }

    protected put<T>(
        url: string,
        body: any,
        headers?: HttpHeaders
    ): Promise<T> {
        return this.http.put<T>(url, body, { headers }).toPromise();
    }

    protected delete<T>(url: string, headers?: HttpHeaders): Promise<T> {
        return this.http.delete<T>(url, { headers }).toPromise();
    }
}
