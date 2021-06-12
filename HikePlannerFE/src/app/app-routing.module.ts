import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddChecklistComponent } from './checklist/add-checklist/add-checklist.component';
import { AddItemComponent } from './checklist/add-item/add-item.component';
import { GetChecklistsComponent } from './checklist/get-checklists/get-checklists.component';
import { GetItemsComponent } from './checklist/get-items/get-items.component';
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
  },
  {
    path: "addChecklist",
    component: AddChecklistComponent
  },
  {
    path: "checklists",
    component: GetChecklistsComponent
  },
  {
    path: "checklistItems",
    component: GetItemsComponent
  },
  {
    path: "addItem",
    component: AddItemComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
