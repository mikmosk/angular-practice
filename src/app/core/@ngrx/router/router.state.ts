import { Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
  fragment: string | null;
}

export interface RouterState {
  router: RouterReducerState<RouterStateUrl>;
}
