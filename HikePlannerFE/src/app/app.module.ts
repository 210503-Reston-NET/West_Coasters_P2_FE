import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
//Import Auth0 sdk
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponentComponent } from './auth-button-component/auth-button-component.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SearchTrailComponent } from './trails-map/search-trail/search-trail.component';
import { ProfileComponentComponent } from './profile-component/profile-component.component';

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
    AuthModule.forRoot({
      domain: 'dev-c74jvj1k.us.auth0.com',
      clientId: '2ekjl6sZMK3vjFWpTa8ngr1G66fHpJpE'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
