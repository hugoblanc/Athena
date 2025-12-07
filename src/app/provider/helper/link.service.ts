import { ElementRef, Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private iab: InAppBrowser) { }


  /**
   * Enable hyperlinks that are embedded within a HTML string
   */
  public enableDynamicHyperlinks(element: ElementRef): void {
    // Provide a minor delay to allow the HTML to be rendered and 'found'
    // within the view template
    setTimeout(() => {
      // Query the DOM to find ALL occurrences of the <a> hyperlink tag
      const urls: any = element.nativeElement.querySelectorAll('a');

      // Iterate through these
      urls.forEach((url: any) => {
        // Listen for a click event on each hyperlink found
        url.addEventListener('click', (event: any) => {
          // Retrieve the href value from the <a> element itself, not event.target
          // (event.target could be a child element like <span>)
          event.preventDefault();
          const link = url.href;

          // Log values to the console and open the link within the InAppBrowser plugin
          console.log('Name is: ' + url.innerText);
          console.log('Link is: ' + link);
          if (link != null && link !== 'undefined' && link !== '') {
            this.launchInAppBrowser(link);
          }
        }, false);
      });
    }, 2000);
  }



  /**
   * Creates/launches an Ionic Native InAppBrowser window to display hyperlink locations within
   * @param string    link           The URL to visit within the InAppBrowser window
   */
  public launchInAppBrowser(link: string): void {
    const opts = 'location=yes,clearcache=yes,hidespinner=no,beforeload=yes';
    this.iab.create(link, '_system', opts);
  }



}
