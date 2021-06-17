import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatortripsComponent } from './creatortrips.component';

describe('CreatortripsComponent', () => {
  let component: CreatortripsComponent;
  let fixture: ComponentFixture<CreatortripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatortripsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatortripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
