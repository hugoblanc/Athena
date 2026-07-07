import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SavedArticle } from '../../models/favorite/saved-article';
import { FavoritesService } from '../../provider/favorites.service';

/**
 * Page « Enregistrés » : liste les articles mis en favori (stockage local).
 * Tap → ouvre l'article ; bouton corbeille → retire le favori.
 */
@Component({
  selector: 'ath-saved',
  templateUrl: './saved.page.html',
  styleUrls: ['./saved.page.scss'],
})
export class SavedPage {
  favorites$: Observable<SavedArticle[]>;

  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly router: Router
  ) {
    this.favorites$ = this.favoritesService.getFavorites();
  }

  open(article: SavedArticle): void {
    this.router.navigate(['/', 'media', article.mediaKey, 'details', article.resourceId]);
  }

  remove(event: Event, article: SavedArticle): void {
    event.stopPropagation();
    this.favoritesService.remove(article.key);
  }
}
