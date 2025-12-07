import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { concat } from 'rxjs';
import { ListMetaMedias } from '../../../models/meta-media/list-meta-medias';
import { MetaMedia } from '../../../models/meta-media/meta-media';
import { StorageService } from '../../../provider/helper/storage.service';
import { MetaMediaService } from '../../../provider/meta-media/meta-media.service';
import { NotificationService } from '../../../provider/notification.service';

export interface MediaFilterItem {
  media: MetaMedia;
  isSelected: boolean;
}

export interface MediaFilterCategory {
  title: string;
  items: MediaFilterItem[];
}

/**
 * Modale de filtrage du feed par média.
 * Permet à l'utilisateur de sélectionner les médias qu'il veut voir dans son feed.
 * La synchronisation avec les notifications est automatique :
 * - Décocher un média = désabonner des notifications
 * - Cocher un média = réabonner aux notifications
 */
@Component({
  selector: 'ath-feed-filter-modal',
  templateUrl: './feed-filter-modal.component.html',
  styleUrls: ['./feed-filter-modal.component.scss'],
})
export class FeedFilterModalComponent implements OnInit {
  private static FEED_FILTER_KEY = 'FEED_FILTER_MEDIA_KEYS';

  categories: MediaFilterCategory[] = [];
  private initialSelection: Set<string> = new Set();

  constructor(
    private modalController: ModalController,
    private metaMediaService: MetaMediaService,
    private storageService: StorageService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadMediaList();
  }

  private loadMediaList() {
    // Charger les préférences sauvegardées
    this.storageService.get<string[]>(FeedFilterModalComponent.FEED_FILTER_KEY)
      .subscribe((savedKeys) => {
        const savedSet = new Set(savedKeys || []);

        // Construire la liste des médias par catégorie
        this.categories = this.metaMediaService.listMetaMedia.map((listMetaMedia: ListMetaMedias) => {
          return {
            title: listMetaMedia.title,
            items: listMetaMedia.metaMedias.map((media: MetaMedia) => {
              // Si aucune préférence sauvegardée, tout est sélectionné par défaut
              const isSelected = savedKeys === null || savedKeys.length === 0
                ? true
                : savedSet.has(media.key);

              if (isSelected) {
                this.initialSelection.add(media.key);
              }

              return {
                media,
                isSelected
              };
            })
          };
        });
      });
  }

  toggleMedia(item: MediaFilterItem) {
    item.isSelected = !item.isSelected;
  }

  selectAll() {
    this.categories.forEach(category => {
      category.items.forEach(item => {
        item.isSelected = true;
      });
    });
  }

  deselectAll() {
    this.categories.forEach(category => {
      category.items.forEach(item => {
        item.isSelected = false;
      });
    });
  }

  get selectedCount(): number {
    return this.categories.reduce((count, category) => {
      return count + category.items.filter(item => item.isSelected).length;
    }, 0);
  }

  get totalCount(): number {
    return this.categories.reduce((count, category) => {
      return count + category.items.length;
    }, 0);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  apply() {
    const selectedKeys: string[] = [];
    const notificationChanges: { key: string; subscribe: boolean }[] = [];

    this.categories.forEach(category => {
      category.items.forEach(item => {
        if (item.isSelected) {
          selectedKeys.push(item.media.key);
        }

        // Détecter les changements pour les notifications
        const wasSelected = this.initialSelection.has(item.media.key);
        if (wasSelected !== item.isSelected) {
          notificationChanges.push({
            key: item.media.key,
            subscribe: item.isSelected
          });
        }
      });
    });

    // Sauvegarder les préférences de filtre
    this.storageService.set(FeedFilterModalComponent.FEED_FILTER_KEY, selectedKeys);

    // Synchroniser avec les notifications
    if (notificationChanges.length > 0) {
      this.syncNotifications(notificationChanges);
    }

    // Retourner les clés sélectionnées
    this.modalController.dismiss({
      selectedKeys,
      hasChanges: true
    });
  }

  private syncNotifications(changes: { key: string; subscribe: boolean }[]) {
    // Utiliser la méthode switchMetaMediaNotifSetting du NotificationService
    const notifChanges$ = changes.map(change =>
      this.notificationService.switchMetaMediaNotifSetting(change.key, change.subscribe)
    );

    if (notifChanges$.length > 0) {
      concat(...notifChanges$).subscribe({
        next: () => console.log('Notification sync done'),
        error: (err) => console.error('Notification sync error:', err)
      });
    }
  }

  private findMediaByKey(key: string): MetaMedia | undefined {
    for (const category of this.categories) {
      const found = category.items.find(item => item.media.key === key);
      if (found) {
        return found.media;
      }
    }
    return undefined;
  }

  /**
   * Obtenir la clé de stockage (pour usage externe)
   */
  static get STORAGE_KEY(): string {
    return FeedFilterModalComponent.FEED_FILTER_KEY;
  }
}
