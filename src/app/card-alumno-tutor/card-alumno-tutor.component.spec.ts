import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAlumnoTutorComponent } from './card-alumno-tutor.component';

describe('CardAlumnoTutorComponent', () => {
  let component: CardAlumnoTutorComponent;
  let fixture: ComponentFixture<CardAlumnoTutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardAlumnoTutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardAlumnoTutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
