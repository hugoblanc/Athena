import { Pipe, PipeTransform } from '@angular/core';

/**
 * Route une image distante via le proxy d'image weserv.nl (fetch côté serveur,
 * CORS ok, redimensionné) pour les sources qui bloquent les requêtes <img> du
 * navigateur (hotlink/WAF) ou servent un certificat TLS invalide,
 * p.ex. les photos de assemblee-nationale.fr.
 *
 * Sur TOUTES les plateformes, web ET natif. À l'origine on gardait l'URL
 * directe sur le natif (la WebView charge le cross-origin sans blocage CORS),
 * mais assemblee-nationale.fr sert aujourd'hui un certificat auto-signé
 * (CN=cdn01) sur tous ses hosts : la WebView native rejette alors l'image au
 * contrôle TLS → photos de députés absentes sur mobile. weserv récupère la
 * source côté serveur (tolère le cert cassé) et la re-sert en HTTPS valide,
 * donc on proxifie partout : robuste quel que soit l'état du cert AN.
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
