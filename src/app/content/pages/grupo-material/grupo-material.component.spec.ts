import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoMaterialComponent } from './grupo-material.component';

describe('GrupoMaterialComponent', () => {
  let component: GrupoMaterialComponent;
  let fixture: ComponentFixture<GrupoMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
