import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateAccountDialogComponent } from './activate-account-dialog.component';

describe('ActivateAccountDialogComponent', () => {
  let component: ActivateAccountDialogComponent;
  let fixture: ComponentFixture<ActivateAccountDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivateAccountDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ActivateAccountDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
