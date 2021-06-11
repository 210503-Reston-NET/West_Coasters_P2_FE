import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MapComponent } from './map/map.component';
import { TrailsMapModule } from './trails-map/trails-map.module';
import { MapDisplayComponent } from './map-display/map-display.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MapComponent,
    MapDisplayComponent
  ],
  imports: [
    BrowserModule,
    TrailsMapModule,
    FormsModule,
    HttpClient
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
