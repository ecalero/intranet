import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxComponenteComponent } from './dialog-box-componente.component';

describe('DialogBoxComponenteComponent', () => {
  let component: DialogBoxComponenteComponent;
  let fixture: ComponentFixture<DialogBoxComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxComponenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
