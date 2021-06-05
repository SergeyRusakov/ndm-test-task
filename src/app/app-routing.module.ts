import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesListComponent } from './main/components/routes-list/routes-list.component';

const routes: Routes = [
  { path: 'routes/list', component: RoutesListComponent },
  { path: 'routes/create', component: RoutesListComponent },
  { path: '', redirectTo: 'routes/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
