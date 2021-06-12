import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetChecklistsComponent } from './get-checklists.component';

describe('GetChecklistsComponent', () => {
  let component: GetChecklistsComponent;
  let fixture: ComponentFixture<GetChecklistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetChecklistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetChecklistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
