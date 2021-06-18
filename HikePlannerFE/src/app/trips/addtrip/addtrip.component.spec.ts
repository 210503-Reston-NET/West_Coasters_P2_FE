import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { AddtripComponent } from './addtrip.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HPApiService } from 'src/app/services/hpapi.service';
import { MapService } from 'src/app/services/map.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';

describe('AddtripComponent', () => {
  let component: AddtripComponent;
  let fixture: ComponentFixture<AddtripComponent>;
  let router: Router;
  let service: HPApiService;
  let route: ActivatedRoute;
  let mapService: MapService;
  let bar : MatSnackBar;

  class MockHPApiService
  {
    GetChecklistByUserId(id: string):Promise<any> {
      return new Promise<any>((resolve, reject) => {

      })
    };
    GetActivity(id: number):Promise<any> {
      return new Promise<any>((resolve, reject) => {

      })
    };
    AddTrip(trip : any) {}
  }

  class MockMatSnackBar{

  }

  class MockMapService
  {
    GetTrailById(id: number):Promise<any> {
      return new Promise<any>((resolve, reject) => {

      })
    };
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ AddtripComponent ],
      providers: [
        {provide: MapService, useClass: MockMapService},
        {provide: HPApiService, useClass: MockHPApiService},
        {provide: MatSnackBar, useClass: MockMatSnackBar}

      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    service = TestBed.inject(HPApiService);
    route = TestBed.inject(ActivatedRoute);
    mapService = TestBed.inject(MapService);
    bar = TestBed.inject(MatSnackBar);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('UserId should define on ngOnInit', () => {
    component.ngOnInit();
    expect(component.currentUserId).not.toBeUndefined;
  });

  it('Should have userChecklists ngOnInit', () => {
    component.ngOnInit();
    expect(component.userChecklists).not.toBeUndefined;
  });

  it('onSubmit should be called', fakeAsync(() => {
    spyOn(component, 'onSubmit');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  }));

  it("property should display", () => {
    let property: HTMLElement = fixture.debugElement.query(By.css('#prop')).nativeElement;
    expect(property.innerHTML).not.toBeNull();
  });

});
