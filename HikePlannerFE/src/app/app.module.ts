import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { TrailsMapModule } from './trails-map/trails-map.module';
import { GetEquipmentsComponent } from './equipments/get-equipments/get-equipments.component';
import { AddEquipmentComponent } from './equipments/add-equipment/add-equipment.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { EditEquipmentComponent } from './equipments/edit-equipment/edit-equipment.component';
import { AddChecklistComponent } from './checklist/add-checklist/add-checklist.component';
import { AddItemComponent } from './checklist/add-item/add-item.component';
import { GetItemsComponent } from './checklist/get-items/get-items.component';
import { GetChecklistsComponent } from './checklist/get-checklists/get-checklists.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    GetEquipmentsComponent,
    AddEquipmentComponent,
    EditEquipmentComponent,
    AddChecklistComponent,
    AddItemComponent,
    GetItemsComponent,
    GetChecklistsComponent
  ],
  imports: [
    BrowserModule,
    TrailsMapModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
