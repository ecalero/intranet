import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoxPlantillaComponent } from './dialog-box-plantilla.component';

describe('DialogBoxPlantillaComponent', () => {
  let component: DialogBoxPlantillaComponent;
  let fixture: ComponentFixture<DialogBoxPlantillaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoxPlantillaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoxPlantillaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
