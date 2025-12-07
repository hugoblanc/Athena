import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpService } from '../helper/http.service';
import {
  LawProposal,
  LawProposalsListResponse,
  LawProposalsQueryParams,
  POLITICAL_GROUPS,
} from '../../models/law-proposal.model';

@Injectable({
  providedIn: 'root',
})
export class LawProposalsService {
  private readonly apiUrl = `${environment.apiUrl}law-proposal`;

  constructor(private http: HttpService) {}

  /**
   * Get paginated list of law proposals with optional filters
   * @param params Query parameters for filtering and pagination
   * @returns Observable of LawProposalsListResponse
   */
  getLawProposals(params?: LawProposalsQueryParams): Observable<LawProposalsListResponse> {
    let url = this.apiUrl;
    const queryParams: string[] = [];

    if (params) {
      if (params.page !== undefined) {
        queryParams.push(`page=${params.page}`);
      }
      if (params.limit !== undefined) {
        queryParams.push(`limit=${params.limit}`);
      }
      if (params.sort) {
        queryParams.push(`sort=${params.sort}`);
      }
      if (params.groupePolitique) {
        queryParams.push(`groupePolitique=${params.groupePolitique}`);
      }
      if (params.typeProposition) {
        queryParams.push(`typeProposition=${params.typeProposition}`);
      }
      if (params.dateDebut) {
        queryParams.push(`dateDebut=${params.dateDebut}`);
      }
      if (params.dateFin) {
        queryParams.push(`dateFin=${params.dateFin}`);
      }
      if (params.simplificationStatus) {
        queryParams.push(`simplificationStatus=${params.simplificationStatus}`);
      }
    }

    if (queryParams.length > 0) {
      url += '?' + queryParams.join('&');
    }

    return this.http.get<LawProposalsListResponse>(url);
  }

  /**
   * Get detailed information about a specific law proposal
   * @param numero Law proposal number (e.g., "2111")
   * @returns Observable of LawProposal
   */
  getLawProposal(numero: string): Observable<LawProposal> {
    return this.http.get<LawProposal>(`${this.apiUrl}/${numero}`);
  }

  /**
   * Get URL for the official PDF document
   * @param urlDocument Document URL from the law proposal
   * @returns Full URL to the PDF
   */
  getDocumentUrl(urlDocument: string): string {
    if (urlDocument.startsWith('http://') || urlDocument.startsWith('https://')) {
      return urlDocument;
    }
    return `https://www.assemblee-nationale.fr${urlDocument}`;
  }

  /**
   * Get URL for the legislative dossier
   * @param urlDossierLegislatif Dossier URL from the law proposal
   * @returns Full URL to the dossier
   */
  getDossierUrl(urlDossierLegislatif: string): string {
    if (urlDossierLegislatif.startsWith('http://') || urlDossierLegislatif.startsWith('https://')) {
      return urlDossierLegislatif;
    }
    return `https://www.assemblee-nationale.fr${urlDossierLegislatif}`;
  }

  /**
   * Get political group info by code
   */
  getPoliticalGroup(code: string): { name: string; color: string } {
    return POLITICAL_GROUPS[code] || POLITICAL_GROUPS['UNKNOWN'];
  }

  /**
   * Get status label in French
   */
  getStatusLabel(status: 'completed' | 'pending' | 'failed'): string {
    switch (status) {
      case 'completed':
        return 'Simplifiée';
      case 'pending':
        return 'En cours';
      case 'failed':
        return 'Non disponible';
      default:
        return 'Inconnu';
    }
  }

  /**
   * Get status color
   */
  getStatusColor(status: 'completed' | 'pending' | 'failed'): string {
    switch (status) {
      case 'completed':
        return '#4caf50';
      case 'pending':
        return '#ff9800';
      case 'failed':
        return '#f44336';
      default:
        return '#999999';
    }
  }
}
