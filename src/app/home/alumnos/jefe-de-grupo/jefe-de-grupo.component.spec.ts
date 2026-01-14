import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JefeDeGrupoComponent } from './jefe-de-grupo.component';

describe('JefeDeGrupoComponent', () => {
  let component: JefeDeGrupoComponent;
  let fixture: ComponentFixture<JefeDeGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JefeDeGrupoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JefeDeGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
