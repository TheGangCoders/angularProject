import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoMaterialesComponent } from './ingreso-materiales.component';

describe('IngresoMaterialesComponent', () => {
  let component: IngresoMaterialesComponent;
  let fixture: ComponentFixture<IngresoMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
