import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchTrailComponent } from './search-trail/search-trail.component';


@NgModule({
  declarations: [
    SearchTrailComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchTrailComponent
  ]
})
export class TrailsMapModule { }
