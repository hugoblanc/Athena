import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from '../provider/helper/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CheckFirstGuard implements CanLoad {
  constructor(private storageService: StorageService, private router: Router) { }

  canLoad(): Observable<boolean> {
    const isFirstLaunch = this.storageService.isFirstLaunch();
    return isFirstLaunch.pipe(map((isFirst: boolean) => {
      if (isFirst) {
        this.router.navigateByUrl('tuto');
      }
      return !isFirst;
    }));
  }
}
