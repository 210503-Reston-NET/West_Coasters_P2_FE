import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GettripsComponent } from './gettrips.component';

describe('GettripsComponent', () => {
  let component: GettripsComponent;
  let fixture: ComponentFixture<GettripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GettripsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GettripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
