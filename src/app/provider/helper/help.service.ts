import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import helpMessages from '../../../assets/data/help-messages.json';
import { Help } from '../../models/help/help';
import { StorageService } from './storage.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  private static LOCAL_HELP_KEY = 'HELP_CODES';

  constructor(private alertService: AlertService, private storageService: StorageService) { }


  async displayHelp(code: string) {
    if (await this.isAlreadyHelped(code).toPromise()) {
      return;
    }

    const helpMessage = this.findHelpFromCode(code);
    const alert = await this.alertService.classicAlert(helpMessage.title, null, helpMessage.text);

    await this.storageService.addToArray(HelpService.LOCAL_HELP_KEY, code).toPromise();

    return alert;
  }



  findHelpFromCode(code: string): Help {
    const messages = helpMessages.map(h => new Help(h));
    const message = messages.find(m => m.code === code);

    if (!message) {
      throw new Error(`Le code ${code} n'a pas été trouvé dans helpMessage.json`);
    }

    return message;
  }

  isAlreadyHelped(code: string) {
    return this.storageService.get<string[]>(HelpService.LOCAL_HELP_KEY)
      .pipe(map(helpCodes => {
        if (!helpCodes) {
          return false;
        }
        return helpCodes.includes(code);
      }));
  }


}
