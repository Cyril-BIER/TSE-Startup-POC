import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempsComponent } from './temps.component';

describe('TempsComponent', () => {
  let component: TempsComponent;
  let fixture: ComponentFixture<TempsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TempsComponent]
    });
    fixture = TestBed.createComponent(TempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
