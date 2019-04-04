import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyEmail'
})

export class WebAddressToEmailPipe implements PipeTransform {

  transform(value: string): string {
    const first = value.lastIndexOf('<');
    const last = value.lastIndexOf('>');

    if (first === -1 || last === -1) {
      return value;
    }

    return value.substring(first + 1, last);
  }
}
