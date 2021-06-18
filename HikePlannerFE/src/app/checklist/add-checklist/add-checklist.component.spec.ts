import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { EMPTY } from 'rxjs';
import { HPApiService } from 'src/app/services/hpapi.service';

import { AddChecklistComponent } from './add-checklist.component';

describe('AddChecklistComponent', () => {
  let component: AddChecklistComponent;
  let fixture: ComponentFixture<AddChecklistComponent>;
  let checklistService: HPApiService;
  let router: Router;

  class MockHPApiService
  {

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [ AddChecklistComponent ],
      providers: [
        {provide: HPApiService, useClass: MockHPApiService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit should be called', fakeAsync(() => {
    spyOn(component, 'onSubmit');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.onSubmit).toHaveBeenCalled();
  }));

  it('Should be no checklist ngOnInit', () => {
    component.ngOnInit();
    expect(component.new).toBeNull;
  });

});
