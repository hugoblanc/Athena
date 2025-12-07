import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { Page } from "../../models/core/page";
import { HttpService } from "../helper/http.service";
import { MixedContent } from "./mixed-content";

@Injectable({
  providedIn: "root",
})
export class MixedContentService {
  private static BASE_URL = environment.apiUrl;
  constructor(private readonly http: HttpService) { }

  getLastFeedContent(
    page: number,
    size: number,
    terms: string,
    mediaKeys?: string
  ): Observable<Page<MixedContent>> {
    let url = `${MixedContentService.BASE_URL}content/last?page=${page}&size=${size}&terms=${terms}`;
    if (mediaKeys) {
      url += `&mediaKeys=${mediaKeys}`;
    }

    return this.http
      .get<Page<MixedContent>>(url)
      .pipe(
        map((page) => {
          page.objects = page.objects.map(
            (content) => new MixedContent(content)
          );
          return page;
        })
      );
  }

  getIdFromContentIdAndMediaKey(key: string, contentId: string): Observable<AthenaId | undefined> {
    return this.http.get(`${MixedContentService.BASE_URL}content/get-id-from-content-id-and-media-key/${key}/${contentId}`)
  }
}


export interface AthenaId { id: number }
