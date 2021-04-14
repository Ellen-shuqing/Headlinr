import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizedNewsCardComponent } from './personalized-news-card.component';

describe('PersonalizedNewsCardComponent', () => {
  let component: PersonalizedNewsCardComponent;
  let fixture: ComponentFixture<PersonalizedNewsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalizedNewsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizedNewsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
