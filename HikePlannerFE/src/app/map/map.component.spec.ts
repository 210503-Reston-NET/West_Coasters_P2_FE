import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { MapComponent } from './map.component';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
      ],
      declarations: [ MapComponent ],
      //providers: [Router]
    })
    .compileComponents();

    router = TestBed.inject(Router);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('verify view', () => {
    const fixture = TestBed.createComponent(MapComponent);
    const app = fixture.componentInstance;
    expect(app.view).toBeDefined();
  });

});
