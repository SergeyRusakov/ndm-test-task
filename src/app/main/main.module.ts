import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MainComponent } from './components/main/main.component';
import { RouterModule } from '@angular/router';
import { RoutesListComponent } from './components/routes-list/routes-list.component';
import { SIDENAV_LINKS } from './tokens/sidenav-links.token';
import { sidenavLinksConfig } from './config/sidenav-links.config';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    SidenavComponent,
    MainComponent,
    RoutesListComponent
  ],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: SIDENAV_LINKS,
      useValue: sidenavLinksConfig,
    }
  ]
})
export class MainModule { }