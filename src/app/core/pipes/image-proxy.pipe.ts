import { Pipe, PipeTransform } from '@angular/core';

/**
 * Route une image distante via le proxy d'image weserv.nl (fetch côté serveur,
 * CORS ok, redimensionné). Utile pour les sources qui bloquent les requêtes
 * <img> du navigateur (hotlink/WAF), p.ex. les photos de assemblee-nationale.fr.
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
    const stripped = url.replace(/^https?:\/\//, '');
    return `https://images.weserv.nl/?url=${encodeURIComponent(stripped)}&w=${size}&h=${size}&fit=cover&output=webp`;
  }
}
