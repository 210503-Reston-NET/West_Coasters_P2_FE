import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { AddactivityComponent } from './addactivity.component';
import { MapService } from 'src/app/services/map.service';
import { activity } from 'src/app/models/activity';
import { HPApiService } from 'src/app/services/hpapi.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';

describe('AddactivityComponent', () => {
  let component: AddactivityComponent;
  let fixture: ComponentFixture<AddactivityComponent>;
  let mapService: MapService;
  let router: Router;
  let activityService: HPApiService;
  let route: ActivatedRoute;

  class MockMapService
  {
    GetTrailById(id: number):Promise<any> {
      return new Promise<any>((resolve, reject) => {

      })
    };
  }
  class MockHPApiService
  {
    AddAnActivity(activity: activity) {};
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ AddactivityComponent ],
      providers: [
        {provide: MapService, useClass: MockMapService},
        {provide: HPApiService, useClass: MockHPApiService}
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    mapService = TestBed.inject(MapService);
    activityService = TestBed.inject(HPApiService);
    route = TestBed.inject(ActivatedRoute);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("property should display", () => {
    let property: HTMLElement = fixture.debugElement.query(By.css('h5')).nativeElement;
    expect(property.innerHTML).not.toBeNull();
  });

  it('onSubmit should be called', fakeAsync(() => {
    spyOn(component, 'onSubmit');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  }));

});
