import { Injectable } from '@angular/core';
import { DataService } from '../interfaces/data-service.interface';
import { Route } from '../types/route.type';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoutesHttpService } from './routes-http.service';
import { finalize } from 'rxjs/operators';
import { RoutesListSoringOption } from '../types/routes-list-soring-option.type';
import { RouteForm } from '../types/route-form.type';

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

  public delete(uid: string): void {
    this._loading$.next(true);
    this.httpService.delete(uid)
      .pipe(finalize(() => this._loading$.next(false)))
      .subscribe(() => {
        const data = this.routes$.getValue();
        const updatedData = data.filter(item => item.uuid != uid);
        this.routes$.next(updatedData);
      });
  }

  public updateRoute(route: RouteForm, uuid: string): void {
    this._loading$.next(true);
    this.httpService.update(route, uuid)
      .subscribe(uuid => {
        const data = this.routes$.getValue();
        const index = data.findIndex(item => item.uuid === uuid);
        if (index > -1) {
          data[index] = { ...data[index], ...route };
        }
        this.routes$.next(data);
        this._loading$.next(false);
      });
  }

}
