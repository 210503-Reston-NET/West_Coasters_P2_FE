import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { SearchTrailComponent } from './trails-map/search-trail/search-trail.component';
@NgModule({
  declarations: [
    AppComponent,
    SearchTrailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
