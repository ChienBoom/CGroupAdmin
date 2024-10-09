import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private apiUrl = 'https://localhost:7283/api/category';
    constructor(private http: HttpClient) {}

    getCategory() {
        return this.http.get(`${this.apiUrl}`);
    }
}
