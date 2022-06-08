import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertarStockComponent } from './insertar-stock.component';

describe('InsertarStockComponent', () => {
  let component: InsertarStockComponent;
  let fixture: ComponentFixture<InsertarStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertarStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertarStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
