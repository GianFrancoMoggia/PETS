import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizer'
})
export class SanitizerPipe implements PipeTransform {

  constructor(private dom: DomSanitizer) {}

  transform(value: string) {
    return this.dom.bypassSecurityTrustResourceUrl(value);
  }

}
