import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertUpdateMaterialComponent } from './insert-update-material.component';

describe('InsertUpdateMaterialComponent', () => {
  let component: InsertUpdateMaterialComponent;
  let fixture: ComponentFixture<InsertUpdateMaterialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertUpdateMaterialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertUpdateMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
