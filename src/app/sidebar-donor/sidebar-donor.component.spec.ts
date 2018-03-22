import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarDonorComponent } from './sidebar-donor.component';

describe('SidebarDonorComponent', () => {
  let component: SidebarDonorComponent;
  let fixture: ComponentFixture<SidebarDonorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarDonorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarDonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
