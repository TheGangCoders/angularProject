import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidaMaterialesComponent } from './salida-materiales.component';

describe('SalidaMaterialesComponent', () => {
  let component: SalidaMaterialesComponent;
  let fixture: ComponentFixture<SalidaMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalidaMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalidaMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
