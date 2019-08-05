import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { GithubService } from '../../provider/github.service';
import { Issue } from '../../models/github/github';

@Component({
  selector: 'ath-reorder',
  templateUrl: './reorder.component.html',
  styleUrls: ['./reorder.component.scss'],
})
export class ReorderComponent implements OnInit {


  constructor(private githubService: GithubService,
              private toastController: ToastController) { }

  issues: Issue[];

  showBtn = false;

  ngOnInit(): void {
    this.githubService.getAllIssue()
      .subscribe((issues: Issue[]) => {
        this.issues = issues;
      });
  }



  doReorder(ev: any) {
    // Before complete is called with the items they will remain in the
    // order before the drag
    console.log('Before complete', this.issues);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. Update the items variable to the
    // new order of items
    ev.detail.complete(true);


    // After complete is called the items will be in the new order
    console.log('After complete', this.issues);
    this.showBtn = true;
  }



  async showConfirmation() {
    const toast = await this.toastController.create({
      header: 'Confirmation',
      message: 'Ton classement a bien été enregistré ',
      position: 'bottom',
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}
