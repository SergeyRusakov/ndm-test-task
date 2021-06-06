import { Injectable } from '@angular/core';
import { CrudHttpService } from '../interfaces/crud-http-service.interface';
import { Route } from '../types/route.type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { RouteUpdateForm } from '../types/route-update-form.type';
import { RouteCreateForm } from '../types/route-create-form.type';

interface ApiResponse <T> {
  message: string;
  code: number;
  successful: boolean;
  payload: T;
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
      .get<ApiResponse<{routes: Route[]}>>(this.api)
      .pipe(
        map(body => body.payload.routes)
      );
  }

  public delete(uid: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${uid}`);
  }

  public update(route: RouteUpdateForm, uuid: string): Observable<string> {
    return this.http.put<ApiResponse<{uuid: string}>>(`${this.api}/${uuid}`, route)
      .pipe(
        tap(response => {
          if (!response.successful) {
            throw Error(response.message);
          }
        }),
        map(response => response.payload.uuid),
      );
  }

  public create(route: RouteCreateForm): Observable<string> {
    return this.http.post<ApiResponse<{uuid: string}>>(this.api, route)
      .pipe(
        tap(response => {
          if (!response.successful) {
            throw Error(response.message);
          }
        }),
        map(response => response.payload.uuid),
      );
  }

}
