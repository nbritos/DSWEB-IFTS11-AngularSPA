import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmbComponent } from './smb.component';

describe('SmbComponent', () => {
  let component: SmbComponent;
  let fixture: ComponentFixture<SmbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
