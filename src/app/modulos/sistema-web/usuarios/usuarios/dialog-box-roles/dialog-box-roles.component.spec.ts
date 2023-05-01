import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxRolesComponent } from './dialog-box-roles.component';

describe('DialogBoxRolesComponent', () => {
  let component: DialogBoxRolesComponent;
  let fixture: ComponentFixture<DialogBoxRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
