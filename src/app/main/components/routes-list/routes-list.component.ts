import { Component, OnInit } from '@angular/core';
import { RoutesDataService } from '../../services/routes-data.service';
import { Observable } from 'rxjs';
import { Route } from '../../types/route.type';
import { RoutesListSoringOption } from '../../types/routes-list-soring-option.type';
import { MatDialog } from '@angular/material/dialog';
import { RouteParamsDialogComponent } from '../route-params-dialog/route-params-dialog.component';

interface RoutesListColumn {
  name: string;
  key: keyof Route;
}

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.scss']
})
export class RoutesListComponent implements OnInit {

  public routes$: Observable<Route[]>;
  public loading$: Observable<boolean>;
  public columns: RoutesListColumn[] = [
    {
      name: 'Адрес назначения',
      key: 'address',
    },
    {
      name: 'Шлюз',
      key: 'gateway',
    },
    {
      name: 'Интерфейс',
      key: 'interface',
    }
  ];
  public displayedColumns: (keyof Route)[];
  public sortedBy?: RoutesListSoringOption;

  constructor(
    private routesDataService: RoutesDataService,
    private matDialog: MatDialog,
  ) {
    this.routes$ = this.routesDataService.connect();
    this.loading$ = this.routesDataService.loading$;
    this.displayedColumns = this.columns.map(column => column.key);
  }

  public ngOnInit(): void {
    this.update();
  }

  private update(): void {
    this.routesDataService.update();
  }

  public handleSortingClick(column: keyof Route): void {
    this.setSortedBy(column);
    this.sort();
  }

  private setSortedBy(column: keyof Route): void {
    if (this.sortedBy?.column === column) {
      this.sortedBy.isDesc = !this.sortedBy.isDesc;
    } else {
      this.sortedBy = { isDesc: true, column: column };
    }
  }

  private sort(): void {
    if (this.sortedBy) {
      this.routesDataService.sort(this.sortedBy);
    }
  }

  public handleRowClick(item: Route): void {
    this.matDialog.open(RouteParamsDialogComponent, {
      data: item,
      autoFocus: false,
    });
  }

}
