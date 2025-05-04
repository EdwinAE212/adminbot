import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactarAvisoComponent } from './redactar-aviso.component';

describe('RedactarAvisoComponent', () => {
  let component: RedactarAvisoComponent;
  let fixture: ComponentFixture<RedactarAvisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RedactarAvisoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedactarAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
