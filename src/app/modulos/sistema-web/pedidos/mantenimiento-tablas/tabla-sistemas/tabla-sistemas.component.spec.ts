import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaSistemasComponent } from './tabla-sistemas.component';

describe('TablaSistemasComponent', () => {
  let component: TablaSistemasComponent;
  let fixture: ComponentFixture<TablaSistemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaSistemasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaSistemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
