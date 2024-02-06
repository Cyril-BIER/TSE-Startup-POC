import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmanagerComponent } from './adminmanager.component';

describe('AdminmanagerComponent', () => {
  let component: AdminmanagerComponent;
  let fixture: ComponentFixture<AdminmanagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminmanagerComponent]
    });
    fixture = TestBed.createComponent(AdminmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
