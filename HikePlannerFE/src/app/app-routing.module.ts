import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddactivityComponent } from './activity/addactivity/addactivity.component';
import { AddEquipmentComponent } from './equipments/add-equipment/add-equipment.component';
import { EditEquipmentComponent } from './equipments/edit-equipment/edit-equipment.component';
import { GetEquipmentsComponent } from './equipments/get-equipments/get-equipments.component';
import { GetactivityComponent } from './activity/getactivity/getactivity.component';
import { GettripsComponent } from './trips/gettrips/gettrips.component';
import { AddtripComponent } from './trips/addtrip/addtrip.component';

const routes: Routes = [
  {
    path: 'equipments',
    component: GetEquipmentsComponent
  },
  {
    path: 'addEquipment',
    component: AddEquipmentComponent
  },
  {
    path: 'editEquipment',
    component: EditEquipmentComponent
  },
  {
    path: 'addActivity',
    component: AddactivityComponent
  },
  {
    path: 'activities',
    component: GetactivityComponent
  },
  {
    path: 'gettrips',
    component: GettripsComponent
  },
  {
    path: 'addtrip',
    component: AddtripComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
