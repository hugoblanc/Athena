import { Directive } from "@angular/core";
import { StorageService } from "../../../provider/helper/storage.service";

@Directive()
export abstract class AbstractContentCard {
  constructor(protected readonly storage: StorageService) { }

  isRead = false;


  abstract creationDate: Date;
  abstract contentId: string | number;
  abstract metaMediaKey: string;

  ngOnInit(): void {
    this.storage.get(this.metaMediaKey + this.contentId).subscribe((isRead) => {
      if (isRead) {
        this.isRead = true;
      }
    });
  }
}
