import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempsFormulaireComponent } from './temps-formulaire.component';

describe('TempsFormulaireComponent', () => {
  let component: TempsFormulaireComponent;
  let fixture: ComponentFixture<TempsFormulaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TempsFormulaireComponent]
    });
    fixture = TestBed.createComponent(TempsFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
