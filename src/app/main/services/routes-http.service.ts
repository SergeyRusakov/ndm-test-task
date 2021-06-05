import { Injectable } from '@angular/core';
import { CrudHttpService } from '../interfaces/crud-http-service.interface';
import { Route } from '../types/route.type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface RoutesResponse {
  message: string;
  code: number;
  successful: boolean;
  payload: {
    routes: Route[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class RoutesHttpService implements CrudHttpService<Route, void> {

  private readonly api = 'api/routes';

  constructor(
    private http: HttpClient
  ) { }

  public fetch(): Observable<Route[]> {
    return this.http
      .get<RoutesResponse>(this.api)
      .pipe(
        map(body => body.payload.routes)
      );
  }
}
