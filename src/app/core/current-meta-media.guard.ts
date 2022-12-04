import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { MetaMediaService } from '../provider/meta-media/meta-media.service';

/**
 * Ce guard s'assure que la navigation vers une page qui nécessitant un currentMetaMedia en ait bien un
 *
 */
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
    if (!key) {
      return false;
    }
    return (this.metaMediaService.findAndSetMediaByKey(key) != null);
  }
}
