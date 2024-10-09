import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/layout/service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent {
    valCheck: string[] = ['remember'];

    username!: string;
    password!: string;

    constructor(
        public layoutService: LayoutService,
        public authService: AuthService,
        public http: HttpClient,
        private router: Router
    ) {}

    handleLogin(): void {
        this.authService.login(this.username, this.password).subscribe({
            next: (rs) => {
                this.authService.setToken(
                    rs.accessToken,
                    rs.expirationAccessToken
                );
                this.router.navigate(['/'])
            },
            error: (er) => {
                console.log(er)
            }
        })

    }
}
