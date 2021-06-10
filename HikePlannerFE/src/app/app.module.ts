import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';

//Import Auth0 sdk
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponentComponent } from './auth-button-component/auth-button-component.component';
import { ProfileComponentComponent } from './profile-component/profile-component.component';

import { SearchTrailComponent } from './trails-map/search-trail/search-trail.component';
import { MapComponent } from './map/map.component';
import { TrailsMapModule } from './trails-map/trails-map.module';

import { GetEquipmentsComponent } from './equipments/get-equipments/get-equipments.component';
import { AddEquipmentComponent } from './equipments/add-equipment/add-equipment.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthButtonComponentComponent,
    HeaderComponent,
    FooterComponent,
    SearchTrailComponent,
    ProfileComponentComponent
  ],
  
  imports: [
    BrowserModule,
    FormsModule,    
    AppRoutingModule,
    HttpClientModule,
    
    AuthModule.forRoot({
      domain: 'dev-c74jvj1k.us.auth0.com',
      clientId: '2ekjl6sZMK3vjFWpTa8ngr1G66fHpJpE'
    }),
    
    TrailsMapModule,
    MapComponent,
    
    GetEquipmentsComponent,
    AddEquipmentComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
