import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEquipmentComponent } from './equipments/add-equipment/add-equipment.component';
import { EditEquipmentComponent } from './equipments/edit-equipment/edit-equipment.component';
import { GetEquipmentsComponent } from './equipments/get-equipments/get-equipments.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
