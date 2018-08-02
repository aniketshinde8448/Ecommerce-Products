import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminupdatepageComponent } from './adminupdatepage.component';

describe('AdminupdatepageComponent', () => {
  let component: AdminupdatepageComponent;
  let fixture: ComponentFixture<AdminupdatepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminupdatepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminupdatepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
