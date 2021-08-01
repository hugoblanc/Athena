import { StorageService } from "../../../provider/helper/storage.service";
import { isOlderThanAWeek } from "../../../utils/date.utils";

export abstract class AbstractContentCard {
  constructor(protected readonly storage: StorageService) {}

  isRead = false;

  get isNew() {
    return !isOlderThanAWeek(this.creationDate) && !this.isRead;
  }

  abstract creationDate: Date;
  abstract contentId: string | number;
  abstract metaMediaKey: string;

  ngOnInit() {
    this.storage.get(this.metaMediaKey + this.contentId).subscribe((isRead) => {
      if (isRead) {
        this.isRead = true;
      }
    });
  }
}
