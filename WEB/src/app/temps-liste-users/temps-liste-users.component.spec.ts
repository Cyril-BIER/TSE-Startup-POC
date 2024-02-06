import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempsListeUsersComponent } from './temps-liste-users.component';

describe('TempsListeUsersComponent', () => {
  let component: TempsListeUsersComponent;
  let fixture: ComponentFixture<TempsListeUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TempsListeUsersComponent]
    });
    fixture = TestBed.createComponent(TempsListeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
