import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarMedicoComponent } from './navbar-medico.component';

describe('NavbarMedicoComponent', () => {
  let component: NavbarMedicoComponent;
  let fixture: ComponentFixture<NavbarMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarMedicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
