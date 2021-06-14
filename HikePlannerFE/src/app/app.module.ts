import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { TrailsMapModule } from './trails-map/trails-map.module';
import { MapDisplayComponent } from './map-display/map-display.component';
import { GetEquipmentsComponent } from './equipments/get-equipments/get-equipments.component';
import { AddEquipmentComponent } from './equipments/add-equipment/add-equipment.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { EditEquipmentComponent } from './equipments/edit-equipment/edit-equipment.component';
import { AddactivityComponent } from './activity/addactivity/addactivity.component';
import { GetactivityComponent } from './activity/getactivity/getactivity.component';
import { GettripsComponent } from './trips/gettrips/gettrips.component';
import { AddtripComponent } from './trips/addtrip/addtrip.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { ProfileComponent } from './profile/profile.component';
import { environment } from 'src/environments/environment';
import { AddChecklistComponent } from './checklist/add-checklist/add-checklist.component';
import { AddItemComponent } from './checklist/add-item/add-item.component';
import { GetItemsComponent } from './checklist/get-items/get-items.component';
import { GetChecklistsComponent } from './checklist/get-checklists/get-checklists.component';
import { SelectItemComponent } from './checklist/select-item/select-item.component';
import { CreatortripsComponent } from './trips/creatortrips/creatortrips.component';
import { TripdetailsComponent } from './trips/tripdetails/tripdetails.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    MapDisplayComponent,
    GetEquipmentsComponent,
    AddEquipmentComponent,
    EditEquipmentComponent,
    AddactivityComponent,
    GetactivityComponent,
    GettripsComponent,
    AddtripComponent,
    AuthButtonComponent,
    ProfileComponent,
    AddChecklistComponent,
    AddItemComponent,
    GetItemsComponent,
    GetChecklistsComponent,
    CreatortripsComponent,
    SelectItemComponent,
    TripdetailsComponent,
  ],
  imports: [
    TrailsMapModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    CommonModule,
    AuthModule.forRoot({
      domain: environment.AUTH_DMAIN,
      clientId: environment.AUTH_CLIENT_ID
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
