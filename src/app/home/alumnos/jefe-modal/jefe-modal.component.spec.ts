import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JefeModalComponent } from './jefe-modal.component';

describe('JefeModalComponent', () => {
  let component: JefeModalComponent;
  let fixture: ComponentFixture<JefeModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JefeModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JefeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
