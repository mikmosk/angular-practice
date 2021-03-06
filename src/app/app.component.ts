import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, NavigationStart  } from '@angular/router';
import { MessagesService, CustomPreloadingStrategyService  } from './core';
import { SpinnerService } from './widgets';
import { Title, Meta } from '@angular/platform-browser';
// rxjs
import { Subscription, merge } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
// @ngrx
import { Store } from '@ngrx/store';

// This import necessary for Router Selectors Demo
// import {
//   AppState,
//   selectQueryParams,
//   selectRouteParams,
//   selectRouteData,
//   selectUrl
// } from './core/@ngrx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  private sub: { [key: string]: Subscription } = {};

  constructor(
    public messagesService: MessagesService, private router: Router,
    public spinnerService: SpinnerService,
    private preloadingStrategy: CustomPreloadingStrategyService,
    private titleService: Title,
    private metaService: Meta,
    // Store necessary for Router Selectors Demo
    // private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    console.log(
      `Preloading Modules: `,
      this.preloadingStrategy.preloadedModules
    );
    this.setPageTitles();

    // Router Selectors Demo
    // const url$ = this.store.select(selectUrl);
    // const queryParams$ = this.store.select(selectQueryParams);
    // const routeParams$ = this.store.select(selectRouteParams);
    // const routeData$ = this.store.select(selectRouteData);
    // const source$ = merge(url$, queryParams$, routeParams$, routeData$);
    // source$.pipe(tap(val => console.log(val))).subscribe();
  }

  private setPageTitles(): void {
    this.sub.navigationEnd = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.router.routerState.root),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        switchMap(route => route.data)
      )
      .subscribe(
         data => this.titleService.setTitle(data.title)
      );
  }

  ngOnDestroy(): void {
    this.sub.navigationEnd.unsubscribe();
  }

  onDisplayMessages(): void {
    this.router.navigate([{ outlets: { messages: ['messages'] } }]);
    this.messagesService.isDisplayed = true;
  }

  onActivate($event: any, routerOutlet: RouterOutlet): void {
    // console.log('Activated Component', $event, routerOutlet);
    this.metaService.addTags(routerOutlet.activatedRouteData.meta);
  }

  onDeactivate($event: any, routerOutlet: RouterOutlet): void {
    // console.log('Deactivated Component', $event, routerOutlet);
  }
}
