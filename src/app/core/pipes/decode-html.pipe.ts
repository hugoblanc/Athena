import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeHtml'
})
export class DecodeHtmlPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }

    const textArea = document.createElement('textarea');
    textArea.innerHTML = value;
    return textArea.value;
  }
}
