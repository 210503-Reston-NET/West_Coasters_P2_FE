import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTrailComponent } from './search-trail.component';

describe('SearchTrailComponent', () => {
  let component: SearchTrailComponent;
  let fixture: ComponentFixture<SearchTrailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchTrailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTrailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
