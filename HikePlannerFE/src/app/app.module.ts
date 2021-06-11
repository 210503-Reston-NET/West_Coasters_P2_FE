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
import { DeleteEquipmentComponent } from './equipments/delete-equipment/delete-equipment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    GetEquipmentsComponent,
    AddEquipmentComponent,
    EditEquipmentComponent,
    DeleteEquipmentComponent
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
