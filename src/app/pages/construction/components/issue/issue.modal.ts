import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Issue } from '../../../../models/github/github';


@Component({
  selector: 'ath-issue-modal',
  templateUrl: './issue.modal.html',
  styleUrls: ['./issue.modal.scss']
})
export class IssueModalPage implements OnInit {

  title: FormControl = new FormControl('', {
    validators: Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(80)]),
    updateOn: 'change'
  });

  body = new FormControl('', {
    validators: Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(700)]),
    updateOn: 'change'
  });

  validateForm!: FormGroup;


  issueType!: 'feature' | 'bug';

  constructor(private formBuilder: FormBuilder,
    private modalController: ModalController,
    private navParams: NavParams) {
  }

  ngOnInit(): void {
    this.issueType = this.navParams.get('issueType');
    this.validateForm = this.formBuilder.group({
      title: this.title,
      body: this.body,
    });
  }


  postIssue() {
    const formValue: any = {};
    Object.assign(formValue, this.validateForm.value);
    formValue.labels = [this.issueType];
    const issue: Issue = formValue;
    this.modalController.dismiss(issue);
  }

  dismiss() {
    this.modalController.dismiss();
  }
}

