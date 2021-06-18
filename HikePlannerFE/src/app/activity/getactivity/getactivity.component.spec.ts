import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HPApiService } from 'src/app/services/hpapi.service';
import { RouterTestingModule } from '@angular/router/testing';
import { GetactivityComponent } from './getactivity.component';
import { By } from '@angular/platform-browser';

describe('GetactivityComponent', () => {
  let component: GetactivityComponent;
  let fixture: ComponentFixture<GetactivityComponent>;
  let activityService: HPApiService;
  let router: Router;

  class MockHPApiService
  {
    GetAllActivitiesByUserId(): Promise<any> {
      return new Promise<void>((resolve, reject) => {

      });
    };
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ GetactivityComponent ],
      providers: [
        {provide: HPApiService, useClass: MockHPApiService}
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    activityService = TestBed.inject(HPApiService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should has activity ngOnInit', () => {
    component.ngOnInit();
    expect(component.activities).not.toBeUndefined;
  });

});
