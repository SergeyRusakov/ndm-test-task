import { Injectable } from '@angular/core';
import { DataService } from '../interfaces/data-service.interface';
import { Route } from '../types/route.type';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { RoutesHttpService } from './routes-http.service';
import { catchError, filter, finalize } from 'rxjs/operators';
import { RoutesListSoringOption } from '../types/routes-list-soring-option.type';
import { RouteUpdateForm } from '../types/route-update-form.type';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouteCreateForm } from '../types/route-create-form.type';

@Injectable({
  providedIn: 'root'
})
export class RoutesDataService implements DataService<Route, void> {

  private readonly _loading$: BehaviorSubject<boolean>;
  private readonly routes$: BehaviorSubject<Route[]>;

  constructor(
    private httpService: RoutesHttpService,
    private snackBar: MatSnackBar,
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

  public create(route: RouteCreateForm): void {
    this.httpService.create(route)
      .pipe(
        catchError((text: string) => {
          this.showMessage(text);
          return of(null);
        }),
        filter(value => !!value)
      )
      .subscribe(uuid => {
        if (uuid) {
          const data = this.routes$.getValue();
          data.push({ uuid, ...route });
          this.routes$.next(data);
          this.showMessage('Route created');
        }
      });
  }

  public updateRoute(route: RouteUpdateForm, uuid: string): void {
    this._loading$.next(true);
    this.httpService.update(route, uuid)
      .pipe(
        finalize(() => this._loading$.next(false)),
        catchError((text: string) => {
          this.showMessage(text);
          return of(null);
        }),
        filter(value => !!value)
      )
      .subscribe(() => this.updateLocal(route, uuid));
  }

  private updateLocal(route: RouteUpdateForm, uuid: string): void {
    const data = this.routes$.getValue();
    const index = data.findIndex(item => item.uuid === uuid);
    if (index > -1) {
      data[index] = { ...data[index], ...route };
    }
    this.routes$.next(data);
  }

  private showMessage(text: string): void {
    this.snackBar.open(text, undefined, { duration: 3000 });
  }

}
