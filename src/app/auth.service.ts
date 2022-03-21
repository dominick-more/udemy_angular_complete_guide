import { Injectable } from '@angular/core';

@Injectable()
export default class AuthService {
    private loggedIn: boolean = false;

    isAuthenticated(): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            setTimeout(() => {
                resolve(this.loggedIn);
            }, 800);
        })
    }

    login(): void {
        this.loggedIn = true;
    }

    logout(): void {
        this.loggedIn = false;
    }
}