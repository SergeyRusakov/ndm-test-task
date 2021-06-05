import { Injectable } from '@angular/core';
import { DataService } from '../interfaces/data-service.interface';
import { Route } from '../types/route.type';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoutesHttpService } from './routes-http.service';
import { finalize } from 'rxjs/operators';
import { RoutesListSoringOption } from '../types/routes-list-soring-option.type';

@Injectable({
  providedIn: 'root'
})
export class RoutesDataService implements DataService<Route, void> {

  private readonly _loading$: BehaviorSubject<boolean>;
  private readonly routes$: BehaviorSubject<Route[]>;

  constructor(
    private httpService: RoutesHttpService,
  ) {
    this._loading$ = new BehaviorSubject<boolean>(false);
    this.routes$ = new BehaviorSubject<Route[]>([]);
  }

  public get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  public connect(): Observable<Route[]> {
    return this.routes$.asObservable();
  }

  public update(): void {
    this._loading$.next(true);
    this.httpService
      .fetch()
      .pipe(
        finalize(() => this._loading$.next(false))
      )
      .subscribe(response => this.routes$.next(response));
  }

  public sort(options: RoutesListSoringOption): void {
    const data = this.routes$.getValue();
    let compareFn;
    if (options.isDesc) {
      compareFn = (a: Route, b: Route) => (a[options.column] < b[options.column] ? 1 : -1);
    } else {
      compareFn = (a: Route, b: Route) => (a[options.column] > b[options.column] ? 1 : -1);
    }
    const sortedData = data.sort(compareFn);
    this.routes$.next(sortedData);
  }

}
