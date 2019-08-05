import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Issue } from '../models/github/github';
import { GithubService } from '../provider/github.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'ath-issue-modal',
  templateUrl: './issue.modal.html',
  styleUrls: ['./issue.modal.scss']
})
export class IssueModalPage implements OnInit {

  validateForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private githubService: GithubService,
              private modalController: ModalController) {
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      labels: new FormControl('', Validators.required)
    });
  }

  postIssue() {
    const formValue = this.validateForm.value;
    formValue.labels = [formValue.labels];
    const issue: Issue = formValue;
    this.githubService.postIssue(issue)
      .subscribe((issueCreated: Issue) => {
        this.modalController.dismiss(issueCreated);
      });
  }

}

