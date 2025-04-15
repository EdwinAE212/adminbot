import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddminComponent } from './addmin.component';

describe('AddminComponent', () => {
  let component: AddminComponent;
  let fixture: ComponentFixture<AddminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
