import { Pipe, PipeTransform } from '@angular/core';
import { Capacitor } from '@capacitor/core';

/**
 * Route une image distante via le proxy d'image weserv.nl (fetch côté serveur,
 * CORS ok, redimensionné) pour les sources qui bloquent les requêtes <img> du
 * navigateur (hotlink/WAF), p.ex. les photos de assemblee-nationale.fr.
 *
 * Uniquement en web/PWA : sur le natif, la WebView charge ces images
 * cross-origin sans blocage (origine capacitor://), donc on garde l'URL directe
 * — pas de dépendance tierce ni de hop inutile sur la plateforme qui ship.
 *
 * Pure pipe : ne recalcule que si l'URL change (≈ une fois par image), donc pas
 * de coût à chaque cycle de change detection, contrairement à un appel de
 * méthode dans le template.
 */
@Pipe({ name: 'imageProxy' })
export class ImageProxyPipe implements PipeTransform {
  transform(url: string | undefined | null, size = 140): string {
    if (!url) {
      return '';
    }
    if (Capacitor.isNativePlatform()) {
      return url;
    }
    const stripped = url.replace(/^https?:\/\//, '');
    return `https://images.weserv.nl/?url=${encodeURIComponent(stripped)}&w=${size}&h=${size}&fit=cover&output=webp`;
  }
}
