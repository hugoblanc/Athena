import { MixedContent } from '../../provider/content/mixed-content';

/**
 * Article enregistré (favori), persisté localement (SQLite). Miroir mobile de
 * la reading-list de la PWA. On stocke le minimum nécessaire pour réafficher la
 * carte et renaviguer vers l'article hors-ligne.
 *
 * La clé de dédup est `key = mediaKey:resourceId` : c'est le seul identifiant
 * stable disponible AUSSI BIEN depuis le feed (MixedContent) que depuis la page
 * détail (où l'id interne du feed n'est pas connu).
 */
export interface SavedArticle {
  /** Clé stable de dédup/navigation : `mediaKey:resourceId`. */
  key: string;
  /** Identifiant utilisé pour la navigation (resourceId : contentId WP ou id YT). */
  resourceId: number | string;
  mediaKey: string;
  title: string;
  publishedAt: string;
  imageUrl?: string;
  mediaTitle: string;
  mediaLogo?: string;
  mediaType: string;
  savedAt: string;
}

/** Construit la clé de favori à partir d'une clé média et d'un resourceId. */
export function buildFavoriteKey(mediaKey: string, resourceId: number | string): string {
  return `${mediaKey}:${resourceId}`;
}

/** Construit un SavedArticle à partir d'un MixedContent du feed. */
export function toSavedArticle(content: MixedContent): SavedArticle {
  return {
    key: buildFavoriteKey(content.metaMedia.key, content.resourceId),
    resourceId: content.resourceId,
    mediaKey: content.metaMedia.key,
    title: content.title,
    publishedAt: content.publishedAt,
    imageUrl: content.image?.url,
    mediaTitle: content.metaMedia.title,
    mediaLogo: content.metaMedia.logo,
    mediaType: content.metaMedia.type,
    savedAt: new Date().toISOString(),
  };
}
