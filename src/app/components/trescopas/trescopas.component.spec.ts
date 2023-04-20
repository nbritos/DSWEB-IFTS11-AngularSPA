import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrescopasComponent } from './trescopas.component';

describe('TrescopasComponent', () => {
  let component: TrescopasComponent;
  let fixture: ComponentFixture<TrescopasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrescopasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrescopasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
