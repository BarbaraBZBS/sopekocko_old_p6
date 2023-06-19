import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard  {

    constructor(private auth: AuthService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot, title: ActivatedRoute): Observable<boolean> {
        return Observable.create(
            (observer) => {
                this.auth.isAuth$.subscribe(
                    (auth) => {
                        if (auth) {
                            observer.next(true);
                        } else {
                            this.router.navigate(['/login']);
                        }
                    }
                );
            }
        );
    }
}
