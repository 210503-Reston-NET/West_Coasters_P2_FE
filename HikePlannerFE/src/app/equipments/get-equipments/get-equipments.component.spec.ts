import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetEquipmentsComponent } from './get-equipments.component';

describe('GetRestaurantsComponent', () => {
  let component: GetEquipmentsComponent;
  let fixture: ComponentFixture<GetEquipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetEquipmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GetEquipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
