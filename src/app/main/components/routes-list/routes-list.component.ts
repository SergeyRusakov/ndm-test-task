import { Component, OnInit } from '@angular/core';
import { RoutesDataService } from '../../services/routes-data.service';
import { Observable } from 'rxjs';
import { Route } from '../../types/route.type';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.scss']
})
export class RoutesListComponent implements OnInit {


  public displayedColumns = ['address', 'gateway', 'interface'];
  public routes$: Observable<Route[]>;
  public loading$: Observable<boolean>;

  constructor(
    private routesDataService: RoutesDataService
  ) {
    this.routes$ = this.routesDataService.connect();
    this.loading$ = this.routesDataService.loading$;
  }

  public ngOnInit(): void {
    this.routesDataService.update();
  }

}
