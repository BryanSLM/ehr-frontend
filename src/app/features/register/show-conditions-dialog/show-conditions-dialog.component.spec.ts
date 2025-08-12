import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowConditionsDialogComponent } from './show-conditions-dialog.component';

describe('ShowConditionsDialogComponent', () => {
  let component: ShowConditionsDialogComponent;
  let fixture: ComponentFixture<ShowConditionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowConditionsDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShowConditionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
