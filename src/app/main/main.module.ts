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
import { MatIconModule } from '@angular/material/icon';
import { LoadingOverlayComponent } from './components/loading-overlay/loading-overlay.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouteParamsDialogComponent } from './components/route-params-dialog/route-params-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { IPV4_REGEX } from './tokens/ipv4-regex.token';
import { ipv4Regex } from './config/ipv4-regex.config';

@NgModule({
  declarations: [
    SidenavComponent,
    MainComponent,
    RoutesListComponent,
    LoadingOverlayComponent,
    RouteParamsDialogComponent
  ],
  exports: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    {
      provide: SIDENAV_LINKS,
      useValue: sidenavLinksConfig,
    },
    {
      provide: IPV4_REGEX,
      useValue: ipv4Regex,
    }
  ]
})
export class MainModule { }
