import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import helpMessages from '../../../assets/data/help-messages.json';
import { Help } from '../../models/help/help';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(private alertService: AlertService) { }


  async displayHelp(code: string) {
    const helpMessage = this.findHelpFromCode(code);
    const alert = await this.alertService.classicAlert(helpMessage.title, null, helpMessage.code);
  }


  private findHelpFromCode(code: string): Help {
    const messages = helpMessages.map(h => new Help(h));
    const message = messages.find(m => m.code === code);

    if (!message) {
      throw new Error(`Le code ${code} n'a pas été trouvé dans helpMessage.json`);
    }

    return message;
  }


}
