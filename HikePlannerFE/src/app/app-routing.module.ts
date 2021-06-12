import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AddEquipmentComponent } from './equipments/add-equipment/add-equipment.component';
import { EditEquipmentComponent } from './equipments/edit-equipment/edit-equipment.component';
import { GetEquipmentsComponent } from './equipments/get-equipments/get-equipments.component';
import { MapComponent } from './map/map.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'equipments',
    component: GetEquipmentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'trail',
    component: MapComponent
  },
  {
    path: 'addEquipment',
    component: AddEquipmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '*',
    component: MapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
