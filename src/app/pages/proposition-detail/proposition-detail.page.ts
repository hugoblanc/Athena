import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import {
  LawProposal,
  POLITICAL_GROUPS,
} from '../../models/law-proposal.model';
import { LawProposalsService } from '../../provider/law-proposals/law-proposals.service';
import { LinkService } from '../../provider/helper/link.service';

@Component({
  selector: 'app-proposition-detail',
  templateUrl: 'proposition-detail.page.html',
  styleUrls: ['proposition-detail.page.scss'],
})
export class PropositionDetailPage implements OnInit {
  proposal: LawProposal | null = null;
  isLoading = true;
  selectedSegment: 'simplified' | 'official' = 'simplified';

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private lawProposalsService: LawProposalsService,
    public linkService: LinkService
  ) {}

  ngOnInit(): void {
    const numero = this.route.snapshot.paramMap.get('numero');
    if (numero) {
      this.loadProposal(numero);
    }
  }

  loadProposal(numero: string): void {
    this.isLoading = true;
    this.lawProposalsService.getLawProposal(numero).subscribe({
      next: (proposal) => {
        this.proposal = proposal;
        this.isLoading = false;
        // Auto-select official if simplified not available
        if (!proposal.simplified || proposal.simplified.status !== 'completed') {
          this.selectedSegment = 'official';
        }
      },
      error: (error) => {
        console.error('Error loading proposal:', error);
        this.isLoading = false;
        this.navCtrl.back();
      },
    });
  }

  goBack(): void {
    this.navCtrl.back();
  }

  segmentChanged(event: any): void {
    this.selectedSegment = event.detail.value;
  }

  openDocument(): void {
    if (this.proposal?.urlDocument) {
      const url = this.lawProposalsService.getDocumentUrl(this.proposal.urlDocument);
      this.linkService.launchInAppBrowser(url);
    }
  }

  openDossier(): void {
    if (this.proposal?.urlDossierLegislatif) {
      const url = this.lawProposalsService.getDossierUrl(this.proposal.urlDossierLegislatif);
      this.linkService.launchInAppBrowser(url);
    }
  }

  openDeputeProfile(url: string | null): void {
    if (url) {
      this.linkService.launchInAppBrowser(url);
    }
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

  getSectionTypeLabel(type: string): string {
    switch (type) {
      case 'expose_motifs':
        return 'Exposé des motifs';
      case 'articles':
        return 'Articles';
      case 'sommaire':
        return 'Sommaire';
      case 'autre':
        return 'Autre';
      default:
        return type;
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }
}
