import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxUsuarioComponent } from './dialog-box-usuario.component';

describe('DialogBoxUsuarioComponent', () => {
  let component: DialogBoxUsuarioComponent;
  let fixture: ComponentFixture<DialogBoxUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
