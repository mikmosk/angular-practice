import { Injectable, Inject } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse,
  HttpContextToken,
  HttpContext
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, concatMap, retry, share } from 'rxjs/operators';

import { TaskModel } from './../models/task.model';
import { TasksAPI } from '../tasks.config';

export const interceptorTOKEN = new HttpContextToken(() => 'Some Default Value');

@Injectable({
  providedIn: 'any',
})

export class TaskObservableService {
  constructor(
    private http: HttpClient,
    @Inject(TasksAPI) private tasksUrl: string
  ) {}

  getTasks(): Observable<TaskModel[]> {
    const httpOptions = {
      context: new HttpContext().set(interceptorTOKEN, 'Some Value')
    };

    return this.http
      .get<TaskModel[]>(this.tasksUrl)
      .pipe(
        retry(3),
        share(),
        catchError(this.handleError)
      );
  }

  getTask(id: number | string): Observable<TaskModel> {
    const url = `${this.tasksUrl}/${id}`;

    return this.http
      .get<TaskModel>(url)
      .pipe(retry(3), share(), catchError(this.handleError));
  }

  updateTask(task: TaskModel): Observable<TaskModel> {
    const url = `${this.tasksUrl}/${task.id}`;

    return this.http
      .put<TaskModel>(url, task)
      .pipe(catchError(this.handleError));
  }

  createTask(task: TaskModel): Observable<TaskModel> {
    const url = this.tasksUrl;

    return this.http
      .post<TaskModel>(url, task)
      .pipe(catchError(this.handleError));
  }

  deleteTask(task: TaskModel): Observable<TaskModel[]> {
    const url = `${this.tasksUrl}/${task.id}`;

    return this.http.delete(url).pipe(
      concatMap(() => this.getTasks()),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );

  }
}
