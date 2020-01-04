import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Issue } from '../models/github/github';
import { GithubService } from '../provider/github.service';
import { ModalController } from '@ionic/angular';

/**
 * Ceci est une modal de création d'issue
 * c'est issue qui peuvent être des bug ou des fonctionalité
 * sont directement posté sur les repository GITHUB
 *
 */
@Component({
  selector: 'ath-issue-modal',
  templateUrl: './issue.modal.html',
  styleUrls: ['./issue.modal.scss']
})
export class IssueModalPage implements OnInit {

  title: FormControl = new FormControl('', {
    validators: Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(80)]),
    updateOn: 'change' // Mise a jour des indicateur une fois qu'on quitte l'input
  });

  body = new FormControl('', {
    validators: Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(700)]),
    updateOn: 'change'
  });

  labels = new FormControl('', {
    validators: Validators.required
  });

  validateForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private githubService: GithubService,
              private modalController: ModalController) {
  }

  ngOnInit(): void {
    // INitilisation du reactive formulaire avec les validateur basique


    this.validateForm = this.formBuilder.group({
      title: this.title,
      body: this.body,
      labels: this.labels
    });
  }

  /**
   * Cette methode permet d'envoyer une issue sur les serveur github en passant par
   * le serveur athena
   * En effet, pour poster une issue il faut un comte github
   * On ne peut pas faire créer de compte gitub a chaque utilsiateur
   * Donc pour l'instant ça utilise mon compte github (hugoblanc) pour poster les issues
   */
  postIssue() {
    const formValue: any = {};
    // Récupèration des valeur du formulaire
    Object.assign(formValue, this.validateForm.value);
    // Formattage des donées de type
    formValue.labels = [formValue.labels];
    // Création de l'objet issue basé sur les données
    const issue: Issue = formValue;
    // Post de l'élement
    this.githubService.postIssue(issue)
      .subscribe((issueCreated: Issue) => {
        // disparission de la fenetre avec la nouvelle issue créé
        // Cela permet de l'ajouter directement a la liste de la home page
        // sans avoir a re-get les données
        this.modalController.dismiss(issueCreated);
      });
  }

}

