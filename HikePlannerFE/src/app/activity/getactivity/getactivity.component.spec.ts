import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetactivityComponent } from './getactivity.component';

describe('GetactivityComponent', () => {
  let component: GetactivityComponent;
  let fixture: ComponentFixture<GetactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetactivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
