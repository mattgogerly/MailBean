import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml'
})

export class StripHtmlPipe implements PipeTransform {
  transform(value: string): any {
    const temp = document.createElement('div');
    temp.innerHTML = value;
    return temp.textContent || temp.innerText || '';
  }
}
