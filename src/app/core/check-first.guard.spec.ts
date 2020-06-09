import { inject, TestBed } from '@angular/core/testing';
import { CheckFirstGuard } from './check-first.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { Storage } from '@ionic/storage';
import { storageIonicMock } from '../../testing/storage-mock';


describe('CheckFirstGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckFirstGuard, { provide: Storage, useValue: storageIonicMock }],
      imports: [RouterTestingModule]
    });
  });

  it('should ...', inject([CheckFirstGuard], (guard: CheckFirstGuard) => {
    expect(guard).toBeTruthy();
  }));
});
