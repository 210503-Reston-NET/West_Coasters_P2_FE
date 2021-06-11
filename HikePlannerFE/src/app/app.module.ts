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
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './auth-button/auth-button.component';
import { ProfileComponent } from './profile/profile.component';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    GetEquipmentsComponent,
    AddEquipmentComponent,
    AuthButtonComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    TrailsMapModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AuthModule.forRoot({
      domain: environment.AUTH_DMAIN,
      clientId: environment.AUTH_CLIENT_ID
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
