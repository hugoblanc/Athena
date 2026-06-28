import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import {
  LawProposalSummary,
  LawProposalsQueryParams,
  POLITICAL_GROUPS,
} from '../../models/law-proposal.model';
import { LawProposalsService } from '../../provider/law-proposals/law-proposals.service';

@Component({
  selector: 'app-propositions',
  templateUrl: 'propositions.page.html',
  styleUrls: ['propositions.page.scss'],
})
export class PropositionsPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;

  proposals: LawProposalSummary[] = [];
  isLoading = false;
  hasMoreData = true;

  // Filters
  selectedGroupePolitique = '';
  selectedType = '';
  selectedStatus = '';
  selectedSort = 'dateMiseEnLigne:desc';

  // Filter options
  politicalGroups = Object.entries(POLITICAL_GROUPS).map(([code, info]) => ({
    code,
    name: info.name,
  }));

  proposalTypes = [
    { value: 'ordinaire', label: 'Ordinaire' },
    { value: 'constitutionnelle', label: 'Constitutionnelle' },
  ];

  simplificationStatuses = [
    { value: 'completed', label: 'Simplifiée' },
    { value: 'pending', label: 'En cours' },
    { value: 'failed', label: 'Échec' },
  ];

  sortOptions = [
    { value: 'dateMiseEnLigne:desc', label: 'Plus récentes' },
    { value: 'dateMiseEnLigne:asc', label: 'Plus anciennes' },
  ];

  private page = 1;
  private limit = 20;

  constructor(
    private lawProposalsService: LawProposalsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProposals();
  }

  loadProposals(event?: any): void {
    if (!this.hasMoreData && event) {
      event.target.complete();
      return;
    }

    if (!event) {
      this.isLoading = true;
    }

    const params: LawProposalsQueryParams = {
      page: this.page,
      limit: this.limit,
      sort: this.selectedSort,
    };

    if (this.selectedGroupePolitique) {
      params.groupePolitique = this.selectedGroupePolitique;
    }
    if (this.selectedType) {
      params.typeProposition = this.selectedType as 'ordinaire' | 'constitutionnelle';
    }
    if (this.selectedStatus) {
      params.simplificationStatus = this.selectedStatus as 'completed' | 'pending' | 'failed';
    }

    this.lawProposalsService.getLawProposals(params).subscribe({
      next: (response) => {
        if (event) {
          this.proposals.push(...response.data);
          event.target.complete();
        } else {
          this.proposals = response.data;
        }

        this.hasMoreData = response.pagination.hasNextPage;
        this.page++;
        this.isLoading = false;

        if (!this.hasMoreData && this.infiniteScroll) {
          this.infiniteScroll.disabled = true;
        }
      },
      error: (error) => {
        console.error('Error loading proposals:', error);
        this.isLoading = false;
        if (event) {
          event.target.complete();
        }
      },
    });
  }

  onFilterChange(): void {
    this.resetAndReload();
  }

  clearFilters(): void {
    this.selectedGroupePolitique = '';
    this.selectedType = '';
    this.selectedStatus = '';
    this.selectedSort = 'dateMiseEnLigne:desc';
    this.resetAndReload();
  }

  private resetAndReload(): void {
    this.page = 1;
    this.hasMoreData = true;
    this.proposals = [];
    if (this.infiniteScroll) {
      this.infiniteScroll.disabled = false;
    }
    this.loadProposals();
  }

  viewProposal(numero: string): void {
    this.router.navigate(['/proposition', numero]);
  }

  getPoliticalGroupColor(code: string): string {
    return this.lawProposalsService.getPoliticalGroup(code).color;
  }

  getPoliticalGroupName(code: string): string {
    return this.lawProposalsService.getPoliticalGroup(code).name;
  }

  getStatusColor(status: 'completed' | 'pending' | 'failed'): string {
    return this.lawProposalsService.getStatusColor(status);
  }

  getStatusLabel(status: 'completed' | 'pending' | 'failed'): string {
    return this.lawProposalsService.getStatusLabel(status);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }
}
