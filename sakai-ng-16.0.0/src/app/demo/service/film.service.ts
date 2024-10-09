import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class FilmService {
    private apiUrl = 'https://jsonplaceholder.typicode.com';
    constructor(private http: HttpClient) {}

    getFilms() {
        return this.http.get(`${this.apiUrl}/posts`);
    }
}
