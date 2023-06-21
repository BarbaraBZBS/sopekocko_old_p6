import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription, shareReplay } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    isAuth$: Observable<boolean>;
    authSubscription: Subscription;

    constructor(private auth: AuthService) { }

    ngOnInit() {
        this.isAuth$ = this.auth.isAuth$.pipe(
            shareReplay(1)
        )
    }


    onLogout() {
        this.auth.logout();
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }

}
