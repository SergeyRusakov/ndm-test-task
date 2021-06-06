import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesListComponent } from './main/components/routes-list/routes-list.component';
import { RouteCreationFormComponent } from './main/components/route-creation-form/route-creation-form.component';

const routes: Routes = [
  { path: 'routes/list', component: RoutesListComponent },
  { path: 'routes/create', component: RouteCreationFormComponent },
  { path: '', redirectTo: 'routes/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
