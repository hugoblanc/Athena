import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { MetaMediaService } from '../provider/meta-media/meta-media.service';


@Injectable({
  providedIn: 'root'
})
export class CurrentMetaMediaGuard implements CanActivate {


  constructor(private metaMediaService: MetaMediaService) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const key = next.paramMap.get('key');
    return (this.metaMediaService.findAndSetMediaByKey(key) != null);
  }
}
