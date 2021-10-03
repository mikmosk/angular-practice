import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
// rxjs
import { Observable, of, EMPTY } from 'rxjs';
import { switchMap, delay, finalize, catchError, take } from 'rxjs/operators';
import { SpinnerService } from './../../widgets';

import { UserModel } from './../models/user.model';
import { UserObservableService } from './../services';

@Injectable({
  providedIn: 'any',
})

export class UserResolveGuard implements Resolve<UserModel> {
  constructor(
    private userObservableService: UserObservableService,
    private router: Router,
    private spinner: SpinnerService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<UserModel> {
    console.log('UserResolve Guard is called');

    if (!route.paramMap.has('userID')) {
      return of(new UserModel(null, '', ''));
    }

    this.spinner.show();
    const id = route.paramMap.get('userID')!;

    return this.userObservableService.getUser(id).pipe(
      delay(2000),
      switchMap((user: UserModel) => {
        if (user) {
          return of(user);
        } else {
          this.router.navigate(['/users']);
          return EMPTY;
        }
      }),
      take(1),
      catchError(() => {
        this.router.navigate(['/users']);
        // catchError MUST return observable
        return EMPTY;
      }),
      finalize(() => this.spinner.hide())
    );
  }
}
