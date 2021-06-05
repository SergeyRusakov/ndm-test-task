import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MainComponent } from './components/main/main.component';
import { RouterModule } from '@angular/router';
import { RoutesListComponent } from './components/routes-list/routes-list.component';

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
    RouterModule
  ]
})
export class MainModule { }
