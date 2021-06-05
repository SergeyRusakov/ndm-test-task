import { Observable } from 'rxjs';

export interface CrudHttpService<T, P> {
  fetch(params: P): Observable<T[]>;
}
