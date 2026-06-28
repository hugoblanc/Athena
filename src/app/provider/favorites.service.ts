import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MixedContent } from './content/mixed-content';
import { SavedArticle, toSavedArticle } from '../models/favorite/saved-article';
import { StorageService } from './helper/storage.service';

/**
 * Favoris d'articles, offline-first : persistance locale (SQLite via
 * StorageService) + cache mémoire exposé en BehaviorSubject pour que les boutons
 * et la page « Enregistrés » réagissent instantanément. Miroir mobile de la
 * reading-list de la PWA. Dédup par `SavedArticle.key` (mediaKey:resourceId).
 */
@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private static MAX_ENTRIES = 300;

  private readonly favorites$ = new BehaviorSubject<SavedArticle[]>([]);

  constructor(private readonly storage: StorageService) {
    this.load();
  }

  /** Liste des favoris (triés du plus récent au plus ancien). */
  public getFavorites(): Observable<SavedArticle[]> {
    return this.favorites$.asObservable();
  }

  /** Indique si un favori (par clé) est enregistré, en flux. */
  public isSaved$(key: string): Observable<boolean> {
    return this.favorites$.pipe(map((list) => list.some((a) => a.key === key)));
  }

  /** Version synchrone (cache mémoire) pour l'affichage immédiat des boutons. */
  public isSaved(key: string): boolean {
    return this.favorites$.value.some((a) => a.key === key);
  }

  /**
   * Bascule l'état favori d'un article du feed. Retourne le nouvel état
   * (true = enregistré).
   */
  public toggle(content: MixedContent): boolean {
    return this.toggleArticle(toSavedArticle(content));
  }

  /**
   * Bascule l'état favori à partir d'un SavedArticle déjà construit (page
   * détail). Retourne le nouvel état (true = enregistré).
   */
  public toggleArticle(article: SavedArticle): boolean {
    if (this.isSaved(article.key)) {
      this.remove(article.key);
      return false;
    }
    this.add(article);
    return true;
  }

  /** Ajoute (ou rafraîchit) un favori. */
  public add(article: SavedArticle): void {
    const list = this.favorites$.value.filter((a) => a.key !== article.key);
    list.unshift(article);
    this.persist(list.slice(0, FavoritesService.MAX_ENTRIES));
  }

  /** Retire un favori par clé. */
  public remove(key: string): void {
    this.persist(this.favorites$.value.filter((a) => a.key !== key));
  }

  private load(): void {
    this.storage.get<SavedArticle[]>(StorageService.SAVED_ARTICLES).subscribe((stored) => {
      const list = Array.isArray(stored) ? stored : [];
      this.favorites$.next(this.sort(list));
    });
  }

  private persist(list: SavedArticle[]): void {
    const sorted = this.sort(list);
    this.favorites$.next(sorted);
    this.storage.set(StorageService.SAVED_ARTICLES, sorted);
  }

  private sort(list: SavedArticle[]): SavedArticle[] {
    return [...list].sort(
      (a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime()
    );
  }
}
