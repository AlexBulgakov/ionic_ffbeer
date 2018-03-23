import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

/*
  with some minor changes
  https://medium.com/@AAlakkad/angular-2-display-html-without-sanitizing-filtering-17499024b079
 */

@Pipe({
  name: 'keepHtml',
})
export class KeepHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(content) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
