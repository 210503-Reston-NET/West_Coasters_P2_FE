import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import {ProfileComponentComponent} from "./profile-component/profile-component.component"
import { SearchTrailComponent } from './trails-map/search-trail/search-trail.component';
import { AddEquipmentComponent } from './equipments/add-equipment/add-equipment.component';
import { GetEquipmentsComponent } from './equipments/get-equipments/get-equipments.component';

const routes: Routes = [
  { path: 'profile',
    component: ProfileComponentComponent,
    //canActivate: [AuthGuard] 
  },
  { path: 'trail',
    component: SearchTrailComponent,
    //canActivate: [AuthGuard] 
  },
  {
    path: 'equipments',
    component: GetEquipmentsComponent
  },
  {
    path: 'addEquipment',
    component: AddEquipmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
