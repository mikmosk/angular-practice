import { InjectionToken } from '@angular/core';

export const TasksAPI = new InjectionToken<string>('TasksAPI', {
  providedIn: 'any',
  factory: () => 'http://localhost:3000/tasks'
});
