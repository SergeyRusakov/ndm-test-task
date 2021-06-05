import { Observable } from 'rxjs';

export interface DataService<T, P> {
  loading$: Observable<boolean>;
  connect(): Observable<T[]>;
  update(params: P): void;
}
