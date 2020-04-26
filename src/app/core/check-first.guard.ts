import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../provider/helper/storage.service';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckFirstGuard implements CanLoad {
  constructor(private storageService: StorageService, private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const isFirstLaunch = this.storageService.isFirstLaunch();
    return isFirstLaunch.pipe(map((isFirst: boolean) => {
      if (isFirst) {
        this.router.navigateByUrl('tuto');
      }
      // Return false si c'est le premier lancement
      return !isFirst;
    }));
  }
}
