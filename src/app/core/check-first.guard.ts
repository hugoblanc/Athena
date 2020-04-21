import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../../shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CheckFirstGuard implements CanLoad {
  constructor(private storageService: StorageService, private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    const isFirstLaunch = this.storageService.isFirstLaunch();
    if (!isFirstLaunch) {
      this.router.navigateByUrl('tabs/tabs/home');
    }
    return isFirstLaunch;
  }
}
