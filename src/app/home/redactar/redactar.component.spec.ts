import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactarComponent } from './redactar.component';

describe('RedactarComponent', () => {
  let component: RedactarComponent;
  let fixture: ComponentFixture<RedactarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedactarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedactarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
