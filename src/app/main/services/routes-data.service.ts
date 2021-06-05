import { Injectable } from '@angular/core';
import { DataService } from '../interfaces/data-service.interface';
import { Route } from '../types/route.type';
import { BehaviorSubject, Observable } from 'rxjs';
import { RoutesHttpService } from './routes-http.service';
import { finalize } from 'rxjs/operators';

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
        finalize(() => this._loading$.next(true))
      )
      .subscribe();
  }
}
