import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoSalidaMaterialesComponent } from './ingreso-salida-materiales.component';

describe('IngresoSalidaMaterialesComponent', () => {
  let component: IngresoSalidaMaterialesComponent;
  let fixture: ComponentFixture<IngresoSalidaMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoSalidaMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoSalidaMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
