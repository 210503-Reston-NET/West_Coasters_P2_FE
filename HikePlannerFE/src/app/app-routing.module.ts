import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddactivityComponent } from './activity/addactivity/addactivity.component';
import { AddEquipmentComponent } from './equipments/add-equipment/add-equipment.component';
import { EditEquipmentComponent } from './equipments/edit-equipment/edit-equipment.component';
import { GetEquipmentsComponent } from './equipments/get-equipments/get-equipments.component';
import { GetactivityComponent } from './activity/getactivity/getactivity.component';
import { GettripsComponent } from './trips/gettrips/gettrips.component';
import { AddtripComponent } from './trips/addtrip/addtrip.component';
import { AuthGuard } from '@auth0/auth0-angular';
// import { cpuUsage } from 'process';
import { AddChecklistComponent } from './checklist/add-checklist/add-checklist.component';
import { AddItemComponent } from './checklist/add-item/add-item.component';
import { GetChecklistsComponent } from './checklist/get-checklists/get-checklists.component';
import { GetItemsComponent } from './checklist/get-items/get-items.component';
import { SelectItemComponent } from './checklist/select-item/select-item.component';
import { MapComponent } from './map/map.component';
import { ProfileComponent } from './profile/profile.component';
import { CreatortripsComponent } from './trips/creatortrips/creatortrips.component';
import { TripdetailsComponent } from './trips/tripdetails/tripdetails.component';
import { AboutusComponent } from './aboutus/aboutus.component';

const routes: Routes = [
  {
    path: '',
    component: MapComponent
  },
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
    path: 'editEquipment',
    component: EditEquipmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addActivity',
    component: AddactivityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'activities',
    component: GetactivityComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gettrips',
    component: GettripsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'getcreatortrips',
    component: CreatortripsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addtrip',
    component: AddtripComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tripdetails',
    component: TripdetailsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addChecklist",
    component: AddChecklistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "checklists",
    component: GetChecklistsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "checklistItems",
    component: GetItemsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "selectItem",
    component: SelectItemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "addItem",
    component: AddItemComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "aboutus",
    component: AboutusComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
