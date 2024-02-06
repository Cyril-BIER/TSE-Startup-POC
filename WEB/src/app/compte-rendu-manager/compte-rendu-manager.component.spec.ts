import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteRenduManagerComponent } from './compte-rendu-manager.component';

describe('CompteRenduManagerComponent', () => {
  let component: CompteRenduManagerComponent;
  let fixture: ComponentFixture<CompteRenduManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompteRenduManagerComponent]
    });
    fixture = TestBed.createComponent(CompteRenduManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
