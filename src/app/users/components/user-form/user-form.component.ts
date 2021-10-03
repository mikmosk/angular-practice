import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, UrlTree } from '@angular/router';
// rxjs
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserModel } from './../../models/user.model';
import { AutoUnsubscribe, DialogService, CanComponentDeactivate } from './../../../core';
import { UserObservableService } from './../../services';
import { Location } from '@angular/common';

@Component({
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})

@AutoUnsubscribe()

export class UserFormComponent
  implements OnInit, CanComponentDeactivate
{
  user!: UserModel | any;

  originalUser!: UserModel | any;

  private sub!: Subscription;

  constructor(
    private userObservableService: UserObservableService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(map((data) => data.user))
      .subscribe((user: UserModel) => {
        this.user = { ...user };
        this.originalUser = { ...user };
        console.log({ ...user });
      });
  }

  onSaveUser(): void {
    const user = { ...this.user };
    const method = user.id ? 'updateUser' : 'createUser';
    const observer = {
      next: (savedUser: UserModel) => {
        this.originalUser = { ...savedUser };
        user.id
          ? // optional parameter: http://localhost:4200/users;editedUserID=2
            this.router.navigate(['users', { editedUserID: user.id }])
          : this.onGoBack();
      },
      error: (err: any) => console.log(err),
    };
    this.sub = this.userObservableService[method](user).subscribe(observer);
  }

  onGoBack(): void {
    this.router.navigate(['../../']);
    this.location.back();
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('deactivated process started');

    const flags = Object.keys(this.originalUser).map((key) => {
      if (this.originalUser[key] === this.user[key]) {
        return true;
      }
      return false;
    });

    if (flags.every((el) => el)) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }
}
