import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetFormulaireComponent } from './projet-formulaire.component';

describe('ProjetFormulaireComponent', () => {
  let component: ProjetFormulaireComponent;
  let fixture: ComponentFixture<ProjetFormulaireComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProjetFormulaireComponent]
    });
    fixture = TestBed.createComponent(ProjetFormulaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
