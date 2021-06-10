import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import {ProfileComponentComponent} from "./profile-component/profile-component.component"
import { SearchTrailComponent } from './trails-map/search-trail/search-trail.component';

const routes: Routes = [
  { path: 'profile',
    component: ProfileComponentComponent,
    //canActivate: [AuthGuard] 
  },
  { path: 'trail',
    component: SearchTrailComponent,
    //canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
