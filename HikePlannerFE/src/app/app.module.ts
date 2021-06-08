import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TrailsMapModule } from './trails-map/trails-map.module';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    TrailsMapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
